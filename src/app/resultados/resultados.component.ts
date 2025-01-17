import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css'],
  standalone: false
})
export class ResultadosComponent implements OnInit {
  trabajadores: any[] = [
    { nombre: 'Juan', faltas: 2, propinaACobrar: 0 },
    { nombre: 'Pedro', faltas: 0, propinaACobrar: 0 },
    { nombre: 'Ana', faltas: 1, propinaACobrar: 0 }
  ];

  constructor() { }

  ngOnInit(): void {}

}
