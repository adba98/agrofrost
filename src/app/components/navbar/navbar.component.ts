import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public isLogin: boolean;
  paths = [
    {
      name: 'Inicio',
      path: '/home',
    },
    {
      name: 'Vende',
      path: '/posts',
    },
    {
      name: 'Compra',
      path: '/posts',
    },
    {
      name: 'Nosotros',
      path: '/about',
    },
    {
      name: 'Caracteriticas ',
      path: '/feautures',
    },
    // {
    //   name: 'Planes ',
    //   path: '/pricing',
    // },
  ];

  constructor(private auth: AuthService, private router: Router) {
    this.isLogin = this.auth.isLogginIn('');
    this.auth.changinLoginStatus$.subscribe((status: boolean) => {
      this.isLogin = status;
    });
  }

  ngOnInit(): void {}
  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  
  navbarOpen = false;
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
}
