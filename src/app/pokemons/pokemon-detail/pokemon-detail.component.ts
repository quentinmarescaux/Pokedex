import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Pokemon } from '../models/pokemon.model';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {

  pokemon: Pokemon;

  constructor(private pokemonService: PokemonService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.getPokemon();
  }

  getPokemon() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.pokemonService.getPokemon(id).subscribe(pokemon => this.pokemon = pokemon);
  }

  // save() {
  //   this.pokemonService.updatePokemon(this.pokemon).subscribe(pokemon => this.pokemon = pokemon);
  //   this.goBack();
  // }

  goBack() {
    this.location.back();
  }

}
