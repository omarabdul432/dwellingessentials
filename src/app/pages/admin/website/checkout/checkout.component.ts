import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../../services/product.service';
import { Product } from '../../../../models/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  productId!: any
  product?: Product

  constructor(private route: ActivatedRoute, private productSer: ProductService) {
    this.productId = this.route.snapshot.paramMap.get('id')
    this.getProduct(this.productId)

    console.log(this.productId)
  }

  ngOnInit(): void {
  }

  getProduct(productId: any) {
    this.productSer.getProductById(productId).then((res) => {
      this.product = res
      console.log("product", this.product)
    })
  }
}
