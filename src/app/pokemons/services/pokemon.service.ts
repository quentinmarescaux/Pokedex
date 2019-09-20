import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

import { Pokemon } from "../models/pokemon.model";
import { PagedData } from '../models/paged-data.model';
import { MessageService } from '../../services/message.service';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private pokemonsUrl: string = `${environment.apiUrl}/pokemons`;

  constructor(private messageService: MessageService, private http: HttpClient) { }

  private log(message: string) {
    this.messageService.add(`PokemonService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getPokemons(): Observable<PagedData<Pokemon>> {
    return this.http.get<PagedData<Pokemon>>(this.pokemonsUrl).pipe(
      tap(_ => this.log('fetched pokemons')),
      catchError(error => this.handleError<any>('getPokemons', error))
    );
  }

  getPaginatedPokemons(offset: number, limit: number): Observable<PagedData<Pokemon>> {
    const url: string = `${this.pokemonsUrl}?offset=${offset}&limit=${limit}`;
    return this.http.get<PagedData<Pokemon>>(url).pipe(
      tap(pokemons => pokemons.data.length > 0 && this.log(`fetched pokemons from ${offset} to ${offset + limit}`)),
      catchError(error => this.handleError<any>('getPaginatedPokemons', error))
    );
  }

  getPokemon(id: number): Observable<Pokemon> {
    const url: string = `${this.pokemonsUrl}/${id}`;
    return this.http.get<Pokemon>(url).pipe(
      tap(_ => this.log(`fetched pokemon id=${id}`)),
      catchError(this.handleError<Pokemon>(`getPokemon id=${id}`))
    );
  }
}
