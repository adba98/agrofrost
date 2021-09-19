import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-option',
  templateUrl: './dashboard-option.component.html',
  styleUrls: ['./dashboard-option.component.scss']
})
export class DashboardOptionComponent implements OnInit {

  @Input() imgUrl!: string;
  @Input() titulo!: string;
  @Input() descripcion!: string;
  @Input() mensajeBtn!: string;
  @Input() urlDestino!: string;

  constructor() { }

  ngOnInit() {
  }

}
