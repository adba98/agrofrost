import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  paths = [
    {
      name: 'Inicio',
      path: '/home'
    },
    {
      name: 'Nosotros',
      path: '/about'
    },
    {
      name: 'Posters',
      path: '/posts'
    },
    {
      name: 'Caracteriticas ',
      path: '/feautures'
    },
    {
      name: 'Planes ',
      path: '/pricing'
    }
  ];
  auths= [
    {
      name: 'Iniciar Sesión',
      path: '/singin',
      type: 'primary'
    },
    {
      name: 'Registrarse',
      path: '/singup',
      type: 'secondary'
    },
  ]


  constructor() { }

  ngOnInit(): void {
  }

}
