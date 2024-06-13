import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CapacitorHttp, HttpResponse } from '@capacitor/core';

import { FilaComponent } from 'src/app/components/fila/fila.component';

import { AlertController } from '@ionic/angular';

import { RecordService } from 'src/app/record.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-jugar',
  templateUrl: './jugar.page.html',
  styleUrls: ['./jugar.page.scss'],
})
export class JugarPage implements OnInit {

  @ViewChildren(FilaComponent) filaComponents!: QueryList<FilaComponent>;

  public filas: any[] = [];

  public id: string = '';
  public player: string = '';
  public dificultad: string = '';
  public intentoActual = 0;

  public filasActivas: number = 0;

  public palabras: string[] = [];
  public palabraSeleccionada: string[] = [];

  public broWon = false;

  public resultado = [];

  public tiempoInicio: number = 0;
  public tiempoActual: number = 0;
  public intervalId: any;

  constructor(
    public activedRoute: ActivatedRoute, 
    private alertController: AlertController,
    private router: Router,
    private recordService: RecordService
  ) { }

  async ngOnInit() {

    this.id = this.activedRoute.snapshot.params['id'];
    this.player = this.activedRoute.snapshot.params['player'];
    
    const doGet = async () => {
      const options = {
        url: 'http://127.0.0.1:8000/api/palabras', //Aquí obtengo las palabras
        headers: { 'X-Fake-Header': 'Fake-Value' },
        params: { size: 'XL' },
      };

      try {
        const response: HttpResponse = await CapacitorHttp.get(options);
        response.data.forEach((item: any) => {
          this.palabras.push(item.palabra); //Lleno el arreglo de palabras
        });
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    
    await doGet();

    if (this.palabras.length > 0) {
      const palabra = this.palabras[Math.floor(Math.random() * this.palabras.length)];
      this.palabraSeleccionada = palabra.split('');
      console.log(palabra);
    } else {
      console.error('No words available D:');
    }

    switch (this.id) {
      case 'easy':
        this.generarFilas(7);
        this.dificultad = 'Fácil';
        this.filasActivas += 7;
        break;
      case 'normal':
        this.generarFilas(5);
        this.dificultad = 'Normal';
        this.filasActivas += 5;
        break;
      case 'hard':
        this.generarFilas(3);
        this.dificultad = 'Difícil';
        this.filasActivas += 3;
        break;
      default:
        console.log('how did this happen')

    }

    this.iniciarCronometro();

  }

  iniciarCronometro(){
    this.tiempoInicio = Date.now();
    this.intervalId = setInterval(() => {
    this.tiempoActual = Date.now() - this.tiempoInicio;
    }, 10);
  }

  detenerCronometro() {
    clearInterval(this.intervalId);
  }

  guardarRecord(){
    
    const record = {
      player_name: this.player,
      difficulty: this.dificultad,
      time: this.tiempoActual
    };

    this.recordService.createRecord(record).subscribe(
      response => {
        this.router.navigate(['/']); // Navegar a la página de inicio después de guardar el récord
      },
      error => {
        console.error('Error al guardar el récord:', error);
      }
    );

  }

  generarFilas(numeroFilas: number){
    for (let i = 0; i < numeroFilas; i++) {
      this.filas.push({ activa: i === 0 }); // La primera fila estará activa, las demás inactivas
    }
  }

  cambiarFilaActiva(index: number) {
    // Cambiar la fila activa según el índice recibido
    this.filas.forEach((fila, i) => {
      fila.activa = i === index;
    });
  }

  async enviar() {

    this.filasActivas--;

    if(this.filasActivas == 0){
        const alert = await this.alertController.create({
        header: '¡Ups!',
        message: 'Ya has agotado todos tus intentos.',
        buttons: [
          {
            text: 'Entiendo :(',
            handler: () => {
              this.router.navigate(['/']); // Navegar a la página de inicio
            }
          }
        ]
      });
  
      await alert.present();
    }
    
    const filasCompletas = this.filas.every(fila => fila.completa);
  
    if (filasCompletas) {
      } else {
      this.filaComponents.forEach(fila => {
        fila.verificarFilaCompleta();
      });
    }
  }

  async onFilaCompleta(letras: string[]) {

    const resultado = this.generarResultado(letras, this.palabraSeleccionada);

    if (this.arraysAreEqual(resultado, ['verde', 'verde', 'verde', 'verde', 'verde'])) { //En caso de que el jugador gane
      this.broWon = true;
      this.detenerCronometro();
      this.guardarRecord();
      await this.mostrarMensajeFelicitacion();
    }

    return this.broWon; 

  }

  arraysAreEqual(arr1: string[], arr2: string[]): boolean {
    if (arr1.length !== arr2.length) {
      return false;
    }

    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }

    return true;

  }

  async mostrarMensajeFelicitacion() {
    const alert = await this.alertController.create({
      header: '¡Felicidades!',
      message: '¡Has ganado!',
      buttons: [
        {
          text: '¡Excelente!',
          handler: () => {
            this.router.navigate(['/']); // Navegar a la página de inicio
          }
        }
      ]
    });

    await alert.present();

  }

  generarResultado(intentos: string[], palabraSeleccionada: string[]): string[] {

    const resultado: string[] = [];

    // Crear una copia de la palabra objetivo para marcar letras ya usadas
    const objetivoUsado = palabraSeleccionada.slice();

    // Primero, marcar todos los aciertos exactos
    intentos.forEach((letra, index) => {
      if (letra === palabraSeleccionada[index]) {
        resultado[index] = 'verde';
        objetivoUsado[index] = ''; // Marcar esta letra como usada
      } else {
        resultado[index] = '';
      }
    });

    // Luego, marcar aciertos parciales (letras en la palabra pero en la posición incorrecta)
    intentos.forEach((letra, index) => {
      if (resultado[index] !== 'verde') {
        const pos = objetivoUsado.indexOf(letra);
        if (pos !== -1) {
          resultado[index] = 'amarillo';
          objetivoUsado[pos] = ''; // Marcar esta letra como usada
        } else {
          resultado[index] = 'rojo';
        }
      }
    });

    console.log(resultado);

    return resultado;

  }

}
