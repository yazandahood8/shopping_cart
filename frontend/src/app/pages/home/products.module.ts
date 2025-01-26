// src/app/pages/home/products/products.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';  // Import routing module

@NgModule({
  imports: [CommonModule, ProductsRoutingModule],  // Add ProductsRoutingModule here
})
export class ProductsModule {}
