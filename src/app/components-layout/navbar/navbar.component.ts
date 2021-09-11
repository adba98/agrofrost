import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';



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
  ];

  constructor(private auth: AuthService, private router: Router) {
    this.isLogin = this.auth.isLogginIn();
    this.auth.changingLoginStatus$.subscribe((status:boolean) => {
      console.log(`Observable ${status}`  );
      this.isLogin = status;
    },(err) =>{console.log("Error subsctibcion")});
  }

  ngOnInit(): void {
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  
  navbarOpen = false;
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
}
