import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

declare var Razorpay: any;

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private http = inject(HttpClient);

  createOrder(bookingData: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/payments/create-order`, { bookingData });
  }

  verifyPayment(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/payments/verify`, data);
  }

  getPaymentHistory(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/payments/history`);
  }

  initiatePayment(orderData: any, bookingData: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const options = {
        key: environment.razorpayKeyId,
        amount: orderData.amount,
        currency: orderData.currency,
        order_id: orderData.orderId,
        name: 'Shourya Turf & Sports Academy',
        description: 'Turf Booking Payment',
        handler: (response: any) => {
          this.verifyPayment({
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            bookingData: orderData.bookingData
          }).subscribe(
            res => resolve(res),
            err => reject(err)
          );
        },
        modal: { 
          ondismiss: () => {
            this.http.post(`${environment.apiUrl}/webhook/payment-failed`, { bookingData }).subscribe();
            reject('Payment cancelled');
          }
        }
      };
      const rzp = new Razorpay(options);
      rzp.on('payment.failed', () => {
        this.http.post(`${environment.apiUrl}/webhook/payment-failed`, { bookingData }).subscribe();
      });
      rzp.open();
    });
  }
}
