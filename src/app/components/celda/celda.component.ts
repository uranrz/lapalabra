import { Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-celda',
  templateUrl: './celda.component.html',
  styleUrls: ['./celda.component.scss'],
})

export class CeldaComponent {

  @Input() disabled: boolean = false;

  @Output() valorEmitido = new EventEmitter<{valor: string, enterPressed: boolean}>(); // EventEmitter para emitir el valor

  valor: string = ''; // Inicializamos con un valor por defecto

  constructor() {}

  /*onValorChangeP() {
    // Si el valor no está vacío y es una letra, emitirlo
    if (this.valor.trim() && /^[a-zA-Z]$/.test(this.valor.trim())) {
      this.valorEmitido.emit(this.valor.trim().toUpperCase()); // Emitimos el valor en mayúscula
    }
  }*/

  onValorChange() {
    // Si el valor no está vacío y es una letra, emitirlo
    if (this.valor.trim() && /^[a-zA-Z]$/.test(this.valor.trim())) {
      this.valorEmitido.emit({valor: this.valor.trim().toUpperCase(), enterPressed: false}); // Emitimos el valor en mayúscula
    }
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.valorEmitido.emit({valor: this.valor.trim().toUpperCase(), enterPressed: true});
    }
  }

}
