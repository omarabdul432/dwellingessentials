import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, user } from '@angular/fire/auth';
import { addDoc, collection, Firestore, getDocs, query, where } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserName = new BehaviorSubject<any | null>(null)
  currentUserName$ = this.currentUserName.asObservable()

  constructor(private auth: Auth, private firestore: Firestore, private router: Router) {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.currentUserName.next(user.displayName)
        console.log('OnAuthChanged', user.displayName)
      } else {
        this.currentUserName.next(null)
      }
    })
  }
  async signup(username: any, email: any, password: any) {

    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    const user = userCredential.user;
    if (user) {
      return updateProfile(user, { displayName: username }).then(() => {
        console.log(updateProfile);

        return addDoc(collection(this.firestore, "users"), {
          userid: user.uid,
          email: email,
          username: username,
          role: 'user'
        });
      });
    } else return Promise.reject();
  }

  async signin(email: any, password: any) {
    const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
    console.log(userCredential.user);
    const user = userCredential.user;
    if (user) {
      this.checkEmail(user.uid);
      if (user.displayName) {
        console.log("displaname", user.displayName);
        this.currentUserName.next(user.displayName);
      }
    }
  }

  async signout() {
    await signOut(this.auth)
  }

  private async checkEmail(uid: any) {
    const q = query(collection(this.firestore, "users"), where("userid", "==", uid))
    const querSnapShot = await getDocs(q)
    if (!querSnapShot.empty) {
      const userDoc = querSnapShot.docs[0].data()
      console.log(userDoc)
      if (userDoc) {
        this.router.navigateByUrl('/allproducts')
      } else this.router.navigateByUrl('/products')
    }
  }
}

