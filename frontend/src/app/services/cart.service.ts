import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:5000/api/users'; // Base API URL

  constructor(private http: HttpClient) {}

  // Method to get the userId from the JWT token
  getUserIdFromToken(): string | null {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('No token found in localStorage');
      return null;
    }

    try {
      const decodedToken: { userId?: string } = jwtDecode(token);
      console.log('Decoded Token:', decodedToken);
      return decodedToken.userId || null;
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  }

  // Method to fetch user email from the backend using userId
  fetchUserEmail(): Observable<string | null> {
    const userId = this.getUserIdFromToken();
    if (!userId) {
      console.error('User ID not found in token');
      return of(null);
    }

    return this.http.get<{ email?: string }>(`${this.apiUrl}/${userId}`).pipe(
      map(response => {
        if (response && response.email) {
          return response.email;
        } else {
          console.warn('Email not found in response');
          return null;
        }
      }),
      catchError(error => {
        console.error('Error fetching user email:', error);
        return of(null);
      })
    );
  }

  // Method to add a product to the cart
  addToCart(email: string, productId: string, quantity: number): Observable<any> {
    const body = {
      email,
      id: productId,
      quantity,
    };
    console.log(body)
    return this.http.post('http://localhost:5000/api/cart/addToCart', body); // Send POST request
  }

  getCart(email: string): Observable<any> {
    return this.http.get(`http://localhost:5000/api/cart/myCart/${email}`);
  }

  removeFromCart(email: string, productId: string): Observable<any> {
    return this.http.post(`http://localhost:5000/api/cart/removeFromCart`, {
      email,
      productId
    });
  }
  
}
