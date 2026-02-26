import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { AdminService } from '../../services/admin.service';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  stats: any = {};
  bookings: any[] = [];
  revenueReport: any[] = [];
  bookingReport: any[] = [];
  loading = true;

  constructor(
    private authService: AuthService,
    private adminService: AdminService,
    private bookingService: BookingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.adminService.getDashboardStats().subscribe({
      next: (res) => this.stats = res.stats
    });

    this.bookingService.getAllBookings().subscribe({
      next: (res) => {
        this.bookings = res.bookings;
        this.loading = false;
      }
    });

    this.adminService.getRevenueReport().subscribe({
      next: (res) => this.revenueReport = res.report
    });

    this.adminService.getBookingReport().subscribe({
      next: (res) => this.bookingReport = res.report
    });
  }

  updateStatus(bookingId: string, status: string): void {
    this.bookingService.updateBookingStatus(bookingId, status).subscribe({
      next: () => this.loadDashboard()
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
