import { Component, OnInit, Output, EventEmitter } from '@angular/core';

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
  limit: number = 15;
  searchValue: string = "";

  @Output() selectedPokemonIDEE: EventEmitter<number> = new EventEmitter();

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.getPokemons();
  }

  getPokemons(offset: number = this.offset, limit: number = this.limit, search: string = this.searchValue) {
    this.pokemonService.getPaginatedPokemons(offset, limit, search).subscribe(pokemons => this.pokemons.push(...pokemons.data));
    this.offset += limit;
  }

  searchPokemons(searchValue: string) {
    this.searchValue = searchValue;
    this.pokemons = [];
    this.offset = 0;

    this.getPokemons();
  }

  onScroll() {
    this.getPokemons();
  }

  onSelect(pokemonID: number) {
    this.selectedPokemonIDEE.emit(pokemonID);
  }
}
