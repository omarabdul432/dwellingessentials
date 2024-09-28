import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../models/product';
import { ProductService } from '../../../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-products.component.html',
  styleUrl: './category-products.component.scss'
})
export class CategoryProductsComponent {
  products: Product[] = []
  filteredArray: Product[] = []
  category = ['vegetables', 'Baby Gallery']
  selectedCategory: string = ''
  constructor(private product: ProductService) {
    this.getProducts()
  }

  getProducts() {
    this.product.getProduct().subscribe((res: any) => this.products = res)
    this.getProductByCategory(this.selectedCategory)
  }

  getProductByCategory(category: any) {
    this.selectedCategory = category
    console.log(this.selectedCategory)
    if (this.selectedCategory) {
      this.filteredArray = this.products.filter(product => product.category === this.selectedCategory)
      console.log('filterdProducts', this.products)
    }
  }
}
