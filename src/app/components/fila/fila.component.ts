import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-fila',
  templateUrl: './fila.component.html',
  styleUrls: ['./fila.component.scss'],
})
export class FilaComponent {

  @Input() filaActiva: boolean = false;
  @Input() resultado: string[] = [];

  @Output() filaCompleta = new EventEmitter<string[]>();
  @Output() siguienteFila = new EventEmitter<void>();

  letras: string[] = Array(5).fill('');

  //letras: string[] = []; // Arreglo para almacenar los valores de las celdas
  celdasCompletas: boolean[] = [false, false, false, false, false];

  constructor() {}

  ngOnInit(): void{
    
  }

  capturarValor(event: {valor: string, enterPressed: boolean}, index: number) {
    const { valor, enterPressed } = event;

    // Verificar que el valor no esté vacío y sea una letra
    if (valor && /^[a-zA-Z]$/.test(valor)) {
      this.letras[index] = valor.toLowerCase(); // Almacenar la letra en mayúscula
      this.celdasCompletas[index] = true; // Marcar la celda como completa
    } else {
      // Si el valor es vacío o no es una letra, resetear la letra y marcar la celda como incompleta
      this.letras[index] = '';
      this.celdasCompletas[index] = false;
    }
  }

  verificarFilaCompleta() {
    // Verificar si todas las celdas están completas
    const filaCompleta = this.celdasCompletas.every(completa => completa);

    // Si todas las celdas están completas, emitir el arreglo de letras
    if (filaCompleta) {
      this.filaCompleta.emit(this.letras);
      if (this.resultado.join('') !== 'verde'.repeat(5)) { // Comprobamos si el resultado es diferente de [verde, verde, verde, verde, verde]
        this.siguienteFila.emit(); // Si no es verde, pasamos a la siguiente fila
      }
      //console.log('Fila completa:', this.letras);
    } else {
      //console.log('Faltan letras en la fila.'); //Problema de optimización aquí: se están evaluando también las filas inactivas
    }
  }

}
