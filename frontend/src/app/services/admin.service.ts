import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private http = inject(HttpClient);

  getDashboardStats(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/admin/dashboard`);
  }

  getRevenueReport(startDate?: string, endDate?: string): Observable<any> {
    let url = `${environment.apiUrl}/admin/revenue-report`;
    if (startDate && endDate) url += `?startDate=${startDate}&endDate=${endDate}`;
    return this.http.get(url);
  }

  getBookingReport(startDate?: string, endDate?: string): Observable<any> {
    let url = `${environment.apiUrl}/admin/booking-report`;
    if (startDate && endDate) url += `?startDate=${startDate}&endDate=${endDate}`;
    return this.http.get(url);
  }
}
