import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  demandas = [{}];
  ofertas = [
    {
      imagen: 'assets/img/scenery/image5.jpg',
      titulo: 'Arveja de Cabrera',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
