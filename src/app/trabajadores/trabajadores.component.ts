import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trabajadores',
  templateUrl: './trabajadores.component.html',
  styleUrls: ['./trabajadores.component.css']
})
export class TrabajadoresComponent implements OnInit {
  trabajadores = [
    { nombre: 'Juan', diasTrabajados: 5, propina: 0, faltas: 0 },
    { nombre: 'Maria', diasTrabajados: 4, propina: 0, faltas: 0 }
  ];

  nuevoNombre: string = '';
  diasTrabajados: number = 0;
  faltas: number = 0;

  constructor() { }

  ngOnInit(): void {}

  agregarTrabajador(nombre: string, dias: number) {
    this.trabajadores.push({ nombre, diasTrabajados: dias, propina: 0, faltas: 0 });
  }

  registrarFaltas(nombre: string, faltas: number) {
    const trabajador = this.trabajadores.find(t => t.nombre === nombre);
    if (trabajador) {
      trabajador.faltas = faltas;
    }
  }

  calcularPropina(totalPropinas: number, diasTotales: number) {
    const promedioPorDia = totalPropinas / diasTotales;

    // Para cada trabajador, calcular su propina según los días trabajados y las faltas
    this.trabajadores.forEach(trabajador => {
      const diasTrabajados = trabajador.diasTrabajados - trabajador.faltas;
      trabajador.propina = diasTrabajados * promedioPorDia;
    });
  }

  getResultados() {
    return this.trabajadores.map(trabajador => ({
      nombre: trabajador.nombre,
      diasTotales: trabajador.diasTrabajados,
      faltas: trabajador.faltas,
      propina: trabajador.propina
    }));
  }
}
