import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore, getDoc, getDocs, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { deleteDoc, doc } from 'firebase/firestore';
import { from, Observable } from 'rxjs';
import { Product } from '../models/product';



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private firestore: Firestore) { }
  public productId: any

  async addProduct(product: any) {

    const productRef = doc(collection(this.firestore, "Products"))
    const productId = productRef.id

    await setDoc(productRef, {
      ...product,
      productId: productId
    })
  }


  getProduct(): Observable<any[]> {
    const productRef = collection(this.firestore, "Products")
    return collectionData(productRef)
  }

  async updateProduct(product: any): Promise<void> {

    if (!product.productId) {
      return
    }
    try {
      const ref = doc(this.firestore, `Products/${product.productId}`)
      await updateDoc(ref, {
        productName: product.productName,
        productPrice: product.productPrice,
        productDescription: product.productDescription
      })
      console.log("Update", ref)
    } catch (error) {
      console.log(error)
    }
  }

  async deleteProduct(product: any) {
    const ref = doc(this.firestore, `Products/${product.productId}`)
    console.log(ref)
    return deleteDoc(ref)

  }

  async getProductById(id: any): Promise<any> {
    const ref = doc(this.firestore, `Products/${id}`)
    const productRef = await getDoc(ref)
    if (productRef.exists()) {
      console.log(productRef.data())
      return productRef.data()
    }
  }
}
