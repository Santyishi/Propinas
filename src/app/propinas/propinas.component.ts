import { Component, OnInit } from '@angular/core';
import { PropinasService } from '../propinas.service';

@Component({
  selector: 'app-propinas',
  standalone: false,
  templateUrl: './propinas.component.html',
  styleUrls: ['./propinas.component.css']
})
export class PropinasComponent implements OnInit {
  totalPropinas: number = 0;  // Total de propinas ingresadas
  diasTotales: number = 0;  // Días totales trabajados
  trabajadores: any[] = [];  // Lista de trabajadores

  constructor(private propinasService: PropinasService) {}

  ngOnInit(): void {
    // Cargar datos guardados en localStorage si existen
    const savedData = localStorage.getItem('propinasData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      this.totalPropinas = parsedData.totalPropinas;
      this.diasTotales = parsedData.diasTotales;
      this.trabajadores = parsedData.trabajadores;
    } else {
      // Inicializar con trabajadores por defecto si no hay datos guardados
      this.resetData();
    }
  }

  calcular(): void {
    if (this.totalPropinas > 0 && this.diasTotales > 0) {
      this.trabajadores = this.propinasService.calcularPropinas(
        this.totalPropinas,
        this.diasTotales,
        this.trabajadores
      );
      // Guardar los datos en localStorage después de calcular
      this.saveData();
    }
  }

  resetData(): void {
    // Inicializar los valores por defecto
    this.totalPropinas = 0;
    this.diasTotales = 0;
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
    this.saveData(); // Guardar el estado inicial en localStorage
  }

  resetAll(): void {
    // Limpiar los datos de localStorage y resetear todo
    localStorage.removeItem('propinasData');
    this.resetData();
  }

  private saveData(): void {
    // Guardar los datos actuales en localStorage
    const data = {
      totalPropinas: this.totalPropinas,
      diasTotales: this.diasTotales,
      trabajadores: this.trabajadores
    };
    localStorage.setItem('propinasData', JSON.stringify(data));
  }
}
