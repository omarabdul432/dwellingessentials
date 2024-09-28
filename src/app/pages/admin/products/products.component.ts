import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../../models/product';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {


  issidePanel: boolean = false
  products: Product = {
    productName: '',
    productPrice: '',
    productDescription: '',
    imageUrl: '',
    createdAt: new Date(),
    category: ''
  }

  productsList: any[] = []

  private productSer = inject(ProductService)


  ngOnInit(): void {
    this.getProducts()
  }
  addNew() {
    this.issidePanel = true
  }

  close() {
    this.issidePanel = false
  }

  submit() {
    this.productSer.addProduct(this.products).then(() => {
      console.log(this.products)
      console.log("product added successfully")
      this.products = {
        productName: '',
        productPrice: '',
        productDescription: '',
        imageUrl: '',
        createdAt: new Date(),
        category: ''
      }
    }).catch((error) => {
      console.log(error)
    })
  }
  getProducts() {
    this.productSer.getProduct().subscribe((data) => {
      this.productsList = data
      console.log(this.productsList)
    })
  }

  onEdit(item: any) {
    this.products = item
    this.issidePanel = true
  }

  onDelete(item: any) {
    // if (this.products) {
    this.productSer.deleteProduct(item).then(() => {
      console.log("Product Deleted");
      console.log(item)
    })
    // }
  }

  update() {
    if (this.products) {
      this.productSer.updateProduct(this.products).then(() => {

      })
    }
  }
}

