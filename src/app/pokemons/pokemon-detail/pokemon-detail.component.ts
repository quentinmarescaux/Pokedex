import { Component, OnInit, Input } from '@angular/core';
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

  @Input() id: number;
  pokemon: Pokemon;

  constructor(private pokemonService: PokemonService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    // this.getPokemon();
  }

  ngOnChanges() {
    if (this.id)
      this.pokemonService.getPokemon(this.id).subscribe(pokemon => this.pokemon = pokemon);
  }

  /* Autre moyen de récupérer l'id du pokemon */
  // @Input()
  // set selectedPokemon(pokemonID: number) {
  //   console.log("selectedPokemon - get pokemon");
  //   if (pokemonID)
  //     this.pokemonService.getPokemon(pokemonID).subscribe(pokemon => this.pokemon = pokemon);
  // }

  // Utilisé avant lorsqu'on avait l'id dans le get
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
