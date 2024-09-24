import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, Firestore, getDocs } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private firestore: Firestore) { }

  async addProduct(product: any) {
    return await addDoc(collection(this.firestore, "Products"), {
      productId: product.id,
      productName: product.productName,
      productPrice: product.productPrice,
      imageUrl: product.imageUrl,
      productDescription: product.productDescription
    })
  }


  getProduct(): Observable<any[]> {
    const productRef = collection(this.firestore, "Products")
    return collectionData(productRef)
  }
}
