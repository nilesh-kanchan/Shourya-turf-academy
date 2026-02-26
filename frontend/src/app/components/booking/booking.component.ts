import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../../services/booking.service';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  turfTypes = ['cricket', 'football', 'badminton', 'multi-purpose'];
  pricing: Record<string, number> = { cricket: 1500, football: 1200, badminton: 500, 'multi-purpose': 1000 };
  
  turfType = '';
  date = '';
  timeSlot = '';
  duration = 1;
  availableSlots: string[] = [];
  loading = false;
  error = '';

  constructor(
    private bookingService: BookingService,
    private paymentService: PaymentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const today = new Date().toISOString().split('T')[0];
    this.date = today;
  }

  loadSlots(): void {
    if (!this.date || !this.turfType) return;
    this.bookingService.getAvailableSlots(this.date, this.turfType).subscribe({
      next: (res) => this.availableSlots = res.availableSlots,
      error: (err) => this.error = 'Failed to load slots'
    });
  }

  createBooking(): void {
    this.loading = true;
    this.error = '';
    
    const bookingData: any = {
      turfType: this.turfType,
      date: new Date(this.date),
      timeSlot: this.timeSlot,
      duration: this.duration,
      amount: this.pricing[this.turfType] * this.duration
    };

    this.bookingService.createBooking(bookingData).subscribe({
      next: (res) => {
        this.initiatePayment(res.bookingData);
      },
      error: (err) => {
        this.error = err.error?.message || 'Booking failed';
        this.loading = false;
      }
    });
  }

  initiatePayment(bookingData: any): void {
    this.paymentService.createOrder(bookingData).subscribe({
      next: (orderData) => {
        this.paymentService.initiatePayment(orderData, bookingData).then(
          () => {
            alert('Booking confirmed!');
            this.router.navigate(['/dashboard']);
          },
          () => {
            this.error = 'Payment failed';
            this.loading = false;
          }
        );
      },
      error: () => {
        this.error = 'Payment initialization failed';
        this.loading = false;
      }
    });
  }
}
