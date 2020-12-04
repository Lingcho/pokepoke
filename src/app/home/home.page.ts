import { core } from '@angular/compiler';
import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
// import {FirebaseService} from '../firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  data:any;
  test :any;
  pokemons:any
  constructor(public afDB: AngularFireDatabase, public afs: AngularFirestore) {
    this.test = afDB.list('/userProfile', ref => ref.orderByChild('name'))

  }

  ngOnInit() {
  
  
   
    
    
  }

    


  add() {
    
    for (var poke of this.data) {
      
      console.log(poke.name);
      if (poke.special_id) {

          this.afDB.list('Pokemon/').push(    
            {
   
          national_id: poke.national_id,
          cover: poke.cover,
          special_id: poke.special_id,
          name: poke.name,
          form: poke.forms,
          resume: poke.resume,
          stats: poke.stats,
          morpho: poke.morpho,
          abilities: poke.abilities,
          type: poke.type,
          weaknesses: poke.weaknesses,
          evolutions: poke.evolution,
          count: 0 
            }
        );

      }

      else {
        this.afDB.list('Pokemon').push(    
          {
        national_id: poke.national_id,
        cover: poke.cover,
        name: poke.name,
        resume: poke.resume,
        stats: poke.stats,
        morpho: poke.morpho,
        abilities: poke.abilities,
        type: poke.type,
        weaknesses: poke.weaknesses,
        evolutions: poke.evolution 
          }
      );
      }

    }
   
  }


  

}
