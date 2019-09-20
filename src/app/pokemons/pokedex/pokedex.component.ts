import { Component, OnInit } from '@angular/core';

import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {

  selectedPokemonID: number;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
  }

  onPokemonSelected(pokemonID: number) {
    this.selectedPokemonID = pokemonID;
  }
}
