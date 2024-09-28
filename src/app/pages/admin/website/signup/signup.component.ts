import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { user } from '@angular/fire/auth';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm = new FormGroup({
    username: new FormControl('',),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  private router = inject(Router)
  private authSer = inject(AuthService)

  submit() {
    const username = this.signupForm.value.username
    const email: any = this.signupForm.value.email
    const password: any = this.signupForm.value.password

    if (this.signupForm.valid) {
      this.authSer.signup(username, email, password)
      console.log(this.signupForm.value)
      this.signupForm.reset()
    } else this.signupForm.markAllAsTouched()
  }
}
