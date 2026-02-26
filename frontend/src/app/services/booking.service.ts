import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Booking } from '../models/models';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private http = inject(HttpClient);

  createBooking(booking: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/bookings`, booking);
  }

  getMyBookings(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/bookings/my-bookings`);
  }

  getAllBookings(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/bookings/all`);
  }

  getAvailableSlots(date: string, turfType: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/bookings/available-slots?date=${date}&turfType=${turfType}`);
  }

  updateBookingStatus(id: string, status: string): Observable<any> {
    return this.http.put(`${environment.apiUrl}/bookings/${id}/status`, { status });
  }
}
