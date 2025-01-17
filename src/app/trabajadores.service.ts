import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TrabajadoresService {
  trabajadores: any[] = [
    { nombre: 'Juan', faltas: 2 },
    { nombre: 'Pedro', faltas: 0 },
    { nombre: 'Ana', faltas: 1 }
  ];

  constructor() { }

  obtenerTrabajadores() {
    return this.trabajadores;
  }
}
