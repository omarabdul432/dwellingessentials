import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  private router = inject(Router)

  submit() {
    const email = this.loginForm.value.email
    const password = this.loginForm.value.password

    if (this.loginForm.valid) {
      this.router.navigateByUrl('/products')
      console.log(this.loginForm.value)
    }
  }
}
