// src/app/pages/home/cart/cart.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartRoutingModule } from './cart-routing.module';  // Import routing module

@NgModule({
  imports: [CommonModule, CartRoutingModule],  // Add CartRoutingModule here
})
export class CartModule {}
