import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { IonInfiniteScroll } from '@ionic/angular';

import { Subscription } from 'rxjs';
import { Pokemon } from './pokemon.model';
import { PokemonsService } from './pokemons.service';



@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.page.html',
  styleUrls: ['./pokemons.page.scss'],
})
export class PokemonsPage implements OnInit, OnDestroy {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  loadedPokemons: any
  loadedWithoutForm: Pokemon[] =[]
  private pokemonSub: Subscription
  
  resultSearch: any
  topLimit: number = 10

  fewPokemons = []
  constructor(private http: HttpClient, private pokesService: PokemonsService, private firebase: FirebaseApp){ }
  
  ngOnInit() {
    this.loadPoke(this.topLimit)
    
    
  }
 
  
  
  loadPoke(limit) {
    this.pokemonSub = this.pokesService.fetchPokemons().subscribe(pokemons => {
      let noFormPoke = []
      for (let poke of pokemons) {      
        if (!poke.form) {
            noFormPoke.push(poke)           
          }
      }
      this.loadedWithoutForm =noFormPoke .slice(0, limit)
     
      
      
    })
    
  }
  loadMore(event) {
 
    setTimeout(() => {
      this.topLimit += 10
      this.loadPoke(this.topLimit)
      event.target.complete()
      
    }, 1500)
    
    if (this.loadedWithoutForm.length > 897) {
      event.target.disabled = true
    }
    
    console.log(this.loadedWithoutForm.length);
    
  }
  
  searchPokemon(event) {
    const searchTerm = event.srcElement.value
    console.log(searchTerm);
    if (!searchTerm) {
      this.pokemonSub = this.pokesService.fetchPokemons().subscribe(pokemons => {
        let noFormPoke = []
        for (let poke of pokemons) {
          if (!poke.form) {
            noFormPoke.push(poke)
            this.loadedWithoutForm = noFormPoke
          }
        }
        
      })
    }
    this.loadedWithoutForm = this.loadedWithoutForm.filter(poke => {
      
      
      if (searchTerm != Number(searchTerm)) {
        return (poke.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)
        
      } else {
        
        return (poke.national_id.indexOf(searchTerm)>-1)
      }       
    })
    
  }

  shuffle(list) {
    return list.reduce((p, n) => {
      const size = p.length;
      const index = Math.trunc(Math.random() * (size - 1));
      p.splice(index, 0, n);
      return p;
    }, []);
  };

  // loadFirePoke() {
  //   let noFormPoke =[]
    
  //   this.firebase.database().ref("Pokemon").limitToFirst(10).once('value', (snapshot) => {
  //     snapshot.forEach(pokeSnap => {
  //       this.lastKey = pokeSnap.key;
  //       var poke = pokeSnap.val();
  //       if (!poke.form) {
  //         poke.id = pokeSnap.key
  //         noFormPoke.push(poke)
  //       }
        
  //     });
  //     this.loadedWithoutForm = noFormPoke
  //     console.log(this.loadedWithoutForm); 
  //   });
    
  // }
  
  
  ngOnDestroy() {
    if (this.pokemonSub) {
      this.pokemonSub.unsubscribe()
    }
  }
  
}
