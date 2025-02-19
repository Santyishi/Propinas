import { Component, OnInit } from '@angular/core';
import { PropinasService } from '../propinas.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-propinas',
  standalone: false,
  templateUrl: './propinas.component.html',
  styleUrls: ['./propinas.component.css']
})
export class PropinasComponent implements OnInit {
  totalPropinas: number = 0;
  diasTotales: number = 0;
  trabajadores: any[] = [];

  constructor(private propinasService: PropinasService) {}

  ngOnInit(): void {
    const savedData = localStorage.getItem('propinasData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      this.totalPropinas = parsedData.totalPropinas;
      this.diasTotales = parsedData.diasTotales;
      this.trabajadores = parsedData.trabajadores;
    } else {
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
      this.saveData();
    }
  }

  resetData(): void {
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
      { nombre: 'Abril Rodriguez', faltas: 0, propinaACobrar: 0 },
      { nombre: 'Ignacio Muniz', faltas: 0, propinaACobrar: 0 },
      { nombre: 'Alexia Duarte', faltas: 0, propinaACobrar: 0 }
    ];
    this.saveData();
  }

  resetAll(): void {
    localStorage.removeItem('propinasData');
    this.resetData();
  }

  private saveData(): void {
    const data = {
      totalPropinas: this.totalPropinas,
      diasTotales: this.diasTotales,
      trabajadores: this.trabajadores
    };
    localStorage.setItem('propinasData', JSON.stringify(data));
  }

  descargarLista(): void {
    const trabajadoresOrdenados = [...this.trabajadores].sort((a, b) =>
      a.nombre.localeCompare(b.nombre)
    );
  
    const ws = XLSX.utils.aoa_to_sheet([
      ['Nombre del Partner', 'Días Trabajados', 'Faltas', 'Total a Cobrar', 'Firma:'],
      ...trabajadoresOrdenados.map((trabajador) => [
        trabajador.nombre,
        this.diasTotales - trabajador.faltas,
        trabajador.faltas,
        trabajador.propinaACobrar.toFixed(1),
        ''  // Celda vacía para la firma
      ])
    ]);
  
    const wscols = [
      {wch: 30},
      {wch: 15},
      {wch: 10},
      {wch: 15},
      {wch: 20}
    ];
  
    
    for (const cell in ws) {
      if (ws.hasOwnProperty(cell) && ws[cell].v) {
        ws[cell].s = { alignment: { horizontal: 'left' } };  
      }
    }
  
    ws['!cols'] = wscols;
  
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Propinas');
    
    XLSX.writeFile(wb, 'lista_propinas.xlsx');
  }
  
  
}
