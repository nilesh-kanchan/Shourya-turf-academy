import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  step = 1;
  loginType: 'email' | 'mobile' = 'email';
  name = '';
  email = '';
  mobile = '';
  otp = '';
  error = '';
  loading = false;

  constructor(private authService: AuthService, private router: Router) {}

  sendOTP(): void {
    this.loading = true;
    this.error = '';
    const data: any = { name: this.name };
    if (this.loginType === 'email') data.email = this.email;
    else data.mobile = this.mobile;

    this.authService.sendOTP(data).subscribe({
      next: () => {
        this.step = 2;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.message || 'Failed to send OTP';
        this.loading = false;
      }
    });
  }

  verifyOTP(): void {
    this.loading = true;
    this.error = '';
    const data: any = { otp: this.otp };
    if (this.loginType === 'email') data.email = this.email;
    else data.mobile = this.mobile;

    this.authService.verifyOTP(data).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.user?.role === 'admin') this.router.navigate(['/admin']);
        else this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.error = err.error?.message || 'Invalid OTP';
        this.loading = false;
      }
    });
  }
}
