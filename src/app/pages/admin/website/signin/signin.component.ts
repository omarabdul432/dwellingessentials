import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  private router = inject(Router)
  private auth = inject(AuthService)
  submit() {
    const email = this.loginForm.value.email
    const password = this.loginForm.value.password

    if (this.loginForm.valid) {
      this.auth.signin(email, password)
      // this.router.navigateByUrl('/allproducts')
      console.log(this.loginForm.value)
    } else this.loginForm.markAllAsTouched()
  }
}
