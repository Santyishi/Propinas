export class PropinasService {
  calcularPropinas(totalPropinas: number, diasTotales: number, trabajadores: any[]): any[] {
    if (totalPropinas <= 0 || diasTotales <= 0 || trabajadores.length === 0) {
      return trabajadores; // Validación para evitar cálculos si no hay datos válidos
    }

    // Paso 1: Asignar la propina inicial a cada trabajador
    trabajadores.forEach(trabajador => {
      // La propina inicial es el total dividido entre el número de trabajadores
      trabajador.montoInicial = totalPropinas / trabajadores.length;

      // Paso 2: Calcular el descuento por faltas basado en la propina asignada al trabajador
      const propinaDiaria = trabajador.montoInicial / diasTotales; // Valor proporcional de un día para ese trabajador
      const descuentoPorFalta = propinaDiaria * trabajador.faltas; // Total a descontar por faltas

      // La propina final se calcula restando el descuento por faltas
      trabajador.propinaACobrar = trabajador.montoInicial - descuentoPorFalta;
    });

    // Paso 3: Calcular la plata sobrante de las faltas
    const plataSobrante = trabajadores.reduce((total, trabajador) => {
      const propinaDiaria = trabajador.montoInicial / diasTotales;
      return total + (propinaDiaria * trabajador.faltas);
    }, 0);

    // Paso 4: Filtrar trabajadores sin faltas
    const trabajadoresSinFaltas = trabajadores.filter(trabajador => trabajador.faltas === 0);

    // Paso 5: Redistribuir la plata sobrante entre los trabajadores sin faltas
    trabajadoresSinFaltas.forEach(trabajador => {
      const propinaProporcional = plataSobrante / trabajadoresSinFaltas.length;
      trabajador.propinaACobrar += propinaProporcional;
    });

    return trabajadores;
  }
}
