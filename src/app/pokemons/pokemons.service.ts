import { HttpClient } from "@angular/common/http";
import { ThrowStmt } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { tap, map, take } from "rxjs/operators"
import { Pokemon } from "./pokemon.model";


interface PokemonDataFire {
    abilities: [],
    count: number,
    cover: string,
    evolutions: [],
    form: string,
    morpho: any,
    name: string,
    national_id: string,
    resume: [],
    special_id: string,
    stats: any,
    type: [],
    weaknesses: []
}

@Injectable({
    providedIn: 'root'
})

export class PokemonsService {

    private _pokemons = new BehaviorSubject<Pokemon[]>([])

    constructor(private http: HttpClient) {}

    fetchPokemons() {
        return this.http.get('https://pokegopoke-f6379.firebaseio.com/Pokemon.json')
        .pipe(map(pokeData => {
            const pokemons = []
            for (const key in pokeData) {
                if (pokeData.hasOwnProperty(key)) {
                    pokemons.push(
                        new Pokemon(
                            key,
                            pokeData[key].abilities,
                            pokeData[key].count,
                            pokeData[key].cover,
                            pokeData[key].evolutions,
                            pokeData[key].form,
                            pokeData[key].morpho,
                            pokeData[key].name,
                            pokeData[key].national_id,
                            pokeData[key].resume,
                            pokeData[key].special_id,
                            pokeData[key].stats,
                            pokeData[key].type,
                            pokeData[key].weaknesses,
                        )
                    )
                }
            }
            return pokemons
        }),
        tap(pokemons => {
            this._pokemons.next(pokemons)
        })
        )
        
    }

    get pokemons() {
        return this._pokemons.asObservable()
    }

    getPokemon(id: string) {
       return this.http.get<PokemonDataFire>(`https://pokegopoke-f6379.firebaseio.com/Pokemon/${id}.json`)
       .pipe(map(pokeData => {
          return new Pokemon(
            id,
            pokeData.abilities,
            pokeData.count,
            pokeData.cover,
            pokeData.evolutions,
            pokeData.form,
            pokeData.morpho,
            pokeData.name,
            pokeData.national_id,
            pokeData.resume,
            pokeData.special_id,
            pokeData.stats,
            pokeData.type,
            pokeData.weaknesses,
          )
           
       }))
       
    }

}