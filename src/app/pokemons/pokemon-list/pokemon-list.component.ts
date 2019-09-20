import { Component, OnInit } from '@angular/core';

import { PokemonService } from '../services/pokemon.service';
import { Pokemon } from '../models/pokemon.model';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  pokemons: Pokemon[] = [];

  offset: number = 0;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.getPokemons();
  }

  getPokemons(offset: number = 0, limit: number = 15) {
    this.pokemonService.getPaginatedPokemons(offset, limit).subscribe(pokemons => this.pokemons.push(...pokemons.data));
    this.offset += limit;
  }

  onScroll() {
    this.getPokemons(this.offset);
  }
}
