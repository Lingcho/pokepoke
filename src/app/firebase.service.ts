// import { Injectable } from "@angular/core";
// import {Observable} from 'rxjs';
// import {AngularFirestore, AngularFirestoreCollection, DocumentReference} from '@angular/fire/firestore';
// import {map, take} from 'rxjs/operators';
// import { AngularFireDatabase } from '@angular/fire/database';

// export class FirebaseService {
//     collectionName = 'Pokemons'
//     pokemonCollection: AngularFirestoreCollection
//     pokemons: any

//     constructor(private afs: AngularFirestore){
//         this.pokemonCollection = this.afs.collection<any>('Pokemon')
//         this.pokemons = this.pokemonCollection.snapshotChanges().pipe(
//             map(actions => {
//                 return actions.map(a => {
//                     const data = a.payload.doc.data()
//                     const id = a.payload.doc.id
//                     return {id, ...data}
//                 })
//             } )
//         )
//     }

//     getPokemons()  {
//         return this.pokemons
//     }

   

   
// }