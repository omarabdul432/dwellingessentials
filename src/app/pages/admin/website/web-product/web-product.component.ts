import { Component } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-web-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './web-product.component.html',
  styleUrl: './web-product.component.scss'
})
export class WebProductComponent {
  productList: any[] = []
  constructor(private productSer: ProductService, private router: Router) {
    this.getProducts()
  }
  getProducts() {
    this.productSer.getProduct().subscribe((data) => this.productList = data)
    // console.log(this.productList)

  }

  add(id: any) {
    this.router.navigateByUrl(`/checkout/${id}`)
  }
}
