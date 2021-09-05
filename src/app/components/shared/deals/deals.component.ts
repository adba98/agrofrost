import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.scss']
})
export class DealsComponent implements OnInit {

  demandas = [{}];
  ofertas = [
    {
      imagen: 'assets/img/scenery/image5.jpg',
      titulo: 'Arveja de Cabrera',
    },
  ];
  constructor() { }

  ngOnInit(): void {
  }


}
