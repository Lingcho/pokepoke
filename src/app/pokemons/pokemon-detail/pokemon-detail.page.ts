import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Pokemon } from '../pokemon.model';
import { PokemonsService } from '../pokemons.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.page.html',
  styleUrls: ['./pokemon-detail.page.scss'],
})
export class PokemonDetailPage implements OnInit, OnDestroy {
  loadedPokemon: Pokemon
  private pokemonSub: Subscription
  isLoading = false
  colorType = []
  colorWeakness = []
  isTalent = false
  isTalent2 = false
  isStory = false

  constructor(private pokesService: PokemonsService, private route: ActivatedRoute, private navCtrl: NavController ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('pokeId')) {
        this.navCtrl.navigateBack('/tabs/pokemons')
        return
      }
     
      this.isLoading = true
      this.pokemonSub = this.pokesService.getPokemon(paramMap.get('pokeId')).subscribe(poke => {
          this.loadedPokemon = poke 
          console.log(this.loadedPokemon);
          
          this.isLoading = false
          
          this.setColor(poke.type, this.colorType)
        
          this.setColor(poke.weaknesses, this.colorWeakness)
         
          
      })
    })
   
  }

  setColor(poke, colorsArray) {
    for (let colorType of poke) {
      let x = colorType.color
      
      switch (x) {
        case "background-color-electric": {
          colorsArray.push("#eed535")
          break 
        }
        case "background-color-steel": {
          colorsArray.push("#9eb7b8")
          break
        }
        case "background-color-water": {
          colorsArray.push("#4592c4")
          break
        }
        case "background-color-psychic": {
          colorsArray.push("#f366b9")
          break
        }
        case "background-color-fairy": {
          colorsArray.push("#fdb9e9")
          break
        }
        case "background-color-fire": {
          colorsArray.push("#fd7d24")
          break
        }
        case "background-color-poison": {
          colorsArray.push("#b97fc9")
          break
        }
        case "background-color-ice": {
          colorsArray.push("#51c4e7")
          break
        }
        case "background-color-grass": {
          colorsArray.push("#9bcc50")
          break
        } 
        case "background-color-flying": {
          colorsArray.push("#00dfe7")
          break
        }
        case "background-color-bug": {
          colorsArray.push("#729f3f")
          break
        }
        case "background-color-normal": {
          colorsArray.push("#bdb9b8")
          break
        }
        case "background-color-ground": {
          colorsArray.push("#e78b00")
          break
        }
        case "background-color-fighting": {
          colorsArray.push("#e73600")
          break
        }
        case "background-color-rock": {
          colorsArray.push("#868686")
          break
        }
        case "background-color-dragon": {
          colorsArray.push("#b02abd")
          break
        }
        case "background-color-dark": {
          colorsArray.push("#707070")
          break
        }
        default: {
          break
        }
      }

    }
    
  }

  onTalent() {
    this.isTalent = !this.isTalent
  }
  onTalent2() {
    this.isTalent2 = !this.isTalent2
  }
  onStory() {
    this.isStory = !this.isStory
  }
 
  ngOnDestroy() {
    if (this.pokemonSub) {
      this.pokemonSub.unsubscribe()
    }
  }
  

}
