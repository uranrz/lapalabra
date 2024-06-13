import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  public nivel: number = 0
  public jugador: string = ''

  selectDiff(event: any) {

    const selectedButtonId = event.target.id;
    const playerName = this.jugador;
    
    switch (selectedButtonId) {
      case 'easy':
        this.router.navigate(['/jugar', selectedButtonId, playerName])
        break;
      case 'normal':
        this.router.navigate(['/jugar', selectedButtonId, playerName])
        break;
      case 'hard':
        this.router.navigate(['/jugar', selectedButtonId, playerName])
        break;
      default:
        console.log('how did this happen');

    }
  }

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
  }

}
