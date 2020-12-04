import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'pokemons',
        children: [
          {
            path: '',
            loadChildren: () => import('../pokemons/pokemons.module').then( m => m.PokemonsPageModule)
          },
          {
            path: ':pokeId',
            loadChildren: () => import('../pokemons/pokemon-detail/pokemon-detail.module').then( m => m.PokemonDetailPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/pokemons',
        pathMatch: 'full'
      },
      // {
      //   path: 'home',
      //   loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)

      // }

      
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/pokemons',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
