import { Component, OnInit } from '@angular/core';
import { PropinasService } from '../propinas.service';

@Component({
  selector: 'app-propinas',
  standalone: false,
  templateUrl: './propinas.component.html',
  styleUrls: ['./propinas.component.css']
})
export class PropinasComponent implements OnInit {
  totalPropinas: number = 0;  // Total de propinas ingresadas, inicia en 0
  diasTotales: number = 0;  // Días totales, inicia en 0
  trabajadores: any[] = [];  // Lista de trabajadores

  constructor(private propinasService: PropinasService) { }

  ngOnInit(): void {
    // Lista inicial de trabajadores con 0 faltas y propina a cobrar en 0
    this.trabajadores = [
      { nombre: 'Agustina Rocchetti', faltas: 0, propinaACobrar: 0 },
      { nombre: 'Katherine Vidal', faltas: 0, propinaACobrar: 0 },
      { nombre: 'Ignacio Rodriguez', faltas: 0, propinaACobrar: 0 },
      { nombre: 'Ana Guzman', faltas: 0, propinaACobrar: 0 },
      { nombre: 'Alan Bermudez', faltas: 0, propinaACobrar: 0 },
      { nombre: 'Alejandro Collazo', faltas: 0, propinaACobrar: 0 },
      { nombre: 'Ivan Pastorino', faltas: 0, propinaACobrar: 0 },
      { nombre: 'Matias Ojeda', faltas: 0, propinaACobrar: 0 },
      { nombre: 'Melani Silva', faltas: 0, propinaACobrar: 0 },
      { nombre: 'Lorena Romero', faltas: 0, propinaACobrar: 0 },
      { nombre: 'Santiago Vaquett', faltas: 0, propinaACobrar: 0 },
      { nombre: 'Gonzalo Cortazzo', faltas: 0, propinaACobrar: 0 },
      { nombre: 'Emiliano Roldan', faltas: 0, propinaACobrar: 0 },
      { nombre: 'Santiago Olivera', faltas: 0, propinaACobrar: 0 },
      { nombre: 'Abril Rodriguez', faltas: 0, propinaACobrar: 0 }
    ];
  }

  calcular(): void {
    // Llamamos al servicio para calcular las propinas solo cuando los valores estén definidos
    if (this.totalPropinas > 0 && this.diasTotales > 0) {
      this.trabajadores = this.propinasService.calcularPropinas(this.totalPropinas, this.diasTotales, this.trabajadores);
    } else {
      alert('Por favor, ingrese valores válidos para el total de propinas y los días totales.');
    }
  }
}
