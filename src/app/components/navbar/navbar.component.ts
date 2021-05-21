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
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
