import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Pokemon
{
  id: number,
  name: string,
  type:string,
  isStylish: boolean
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  pokemons: Pokemon[] = [
    {
      id: 1,
      name: 'Bisharp',
      type: 'Dark / Steel',
      isStylish: false,
    },
    {
      id: 2,
      name: 'Krookodile',
      type: 'Dark / Ground',
      isStylish: true,
    },
    {
      id: 3,
      name: 'Infernape',
      type: 'Fire / Fighting',
      isStylish: false,
    }
  ]
  constructor()
  {

  }
}
