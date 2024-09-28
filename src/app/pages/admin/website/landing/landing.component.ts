import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  userName: string = ''

  constructor(private auth: AuthService, private router: Router) {
    this.auth.currentUserName$.subscribe((res) => {
      console.log("Response", res)
      this.userName = res
    })
  }

  logout() {
    this.auth.signout()
    this.router.navigateByUrl('/allproducts')
  }
}
