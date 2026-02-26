import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User, AuthResponse } from '../models/models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    const token = localStorage.getItem('token');
    if (token) this.loadUser();
  }

  sendOTP(data: { email?: string; mobile?: string; name: string }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/send-otp`, data);
  }

  verifyOTP(data: { email?: string; mobile?: string; otp: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/verify-otp`, data).pipe(
      tap(res => {
        if (res.success && res.token) {
          localStorage.setItem('token', res.token);
          this.currentUserSubject.next(res.user!);
        }
      })
    );
  }

  loadUser(): void {
    this.http.get<AuthResponse>(`${environment.apiUrl}/auth/me`).subscribe(
      res => res.success && this.currentUserSubject.next(res.user!)
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    return this.currentUserSubject.value?.role === 'admin';
  }
}
