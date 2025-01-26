import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from '../../menu/menu.component'; 
import { CartService } from '../../services/cart.service';  // Import CartService

interface CartProduct {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;  // Quantity in the cart
}

@Component({
  selector: 'app-my-cart',
  standalone: true,
  imports: [MenuComponent, CommonModule, RouterOutlet], 
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css'],
})
export class MyCartComponent implements OnInit {
  cartProducts: CartProduct[] = [];  // Store cart items

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.getCart();
  }

  getCart(): void {
    this.cartService.fetchUserEmail().subscribe((email: string | null) => {
      if (email) {
        this.cartService.getCart(email).subscribe({
          next: (data: { products: CartProduct[] }) => {
            this.cartProducts = data.products;
          },
          error: (error: any) => {
            console.error('Error fetching cart:', error);
          }
        });
      } else {
        console.error('User email not found');
      }
    });
  }

  removeFromCart(productId: string): void {
    this.cartService.fetchUserEmail().subscribe((email: string | null) => {
      if (email) {
        this.cartService.removeFromCart(email, productId).subscribe({
          next: () => {
            this.cartProducts = this.cartProducts.filter(product => product._id !== productId);
          },
          error: (error: any) => {
            console.error('Error removing product:', error);
          }
        });
      } else {
        console.error('User email not found');
      }
    });
  }
  
  calculateTotal(): number {
    return this.cartProducts.reduce((total, product) => total + (product.price * product.quantity), 0);
  }
}
