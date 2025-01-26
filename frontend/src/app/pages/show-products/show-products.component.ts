import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../../services/cart.service';  // Import the CartService
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuComponent } from '../../menu/menu.component';
import { FormsModule } from '@angular/forms';  // Import FormsModule here

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

@Component({
  selector: 'app-show-products',
  standalone: true,
  imports: [MenuComponent, CommonModule, RouterModule, FormsModule],
  templateUrl: './show-products.component.html',
  styleUrls: ['./show-products.component.css'],
})
export class ShowProductsComponent implements OnInit {
  products: Product[] = [];
  selectedQuantity: number = 1;
  quantities: number[] = [1, 2, 3, 4, 5];

  constructor(private http: HttpClient, private cartService: CartService) {}

  ngOnInit(): void {
    this.getProducts();
    this.products = this.products.map(product => ({
      ...product,
      quantity: 1
    }));
  }

  getProducts(): void {
    this.http.get<Product[]>('http://localhost:5000/api/products/getProducts')
      .subscribe((data) => {
        this.products = data;
      });
  }

  addToCart(productId: string, quantity: number): void {
    this.cartService.fetchUserEmail().subscribe((email: string | null) => {
      if (email) {
        this.cartService.addToCart(email, productId, quantity).subscribe(response => {
          console.log('Product added to cart:', response);
          this.showModal('success', 'Product successfully added to cart!');
        }, error => {
          console.error('Error adding product to cart:', error);
  
          // Check if the error has a message field from backend response
          const errorMessage = error?.error?.message || 'Failed to add product to cart. Please try again.';
          
          // Show modal with the error message from backend
          this.showModal('error', errorMessage);
        });
      } else {
        console.error('User email not found');
        this.showModal('error', 'User email not found. Please log in.');
      }
    });
  }
  
  showModal(status: string, message: string): void {
    const modalElement = document.getElementById('statusModal');
    const modalMessage = document.getElementById('modalMessage');
    
    if (modalElement && modalMessage) {
      if (status === 'success') {
        modalElement.classList.add('modal-success');
        modalElement.classList.remove('modal-error');
      } else {
        modalElement.classList.add('modal-error');
        modalElement.classList.remove('modal-success');
      }
  
      modalMessage.textContent = message;
      // Trigger the modal display
      const modal = new bootstrap.Modal(modalElement);
      modal.show();  // Bootstrap 5 modal trigger (no jQuery needed)
    }
  }
}  