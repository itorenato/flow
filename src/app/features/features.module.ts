import { PaineisModule } from './paineis/paineis.module';
import { CadastrosModule } from './../cadastros/cadastros.module';
import { ExtratoComponent } from './extrato/extrato.component';
import { PoUiModule } from './../poUi.module';
import { FeaturesComponent } from './features.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: FeaturesComponent,
    children: [
      {
        path: 'extrato',
        loadChildren: () => import('./extrato/extrato.module').then(m => m.ExtratoModule)
      },
      {
        path: 'movimento',
        loadChildren: () => import('./movimento/movimento.module').then(m => m.MovimentoModule)
      },
      {
        path: 'categorias',
        loadChildren: () => import('./categorias/categorias.module').then(m => m.CategoriasModule)
      },
      {
        path: 'paineis',
        loadChildren: () => import('./paineis/paineis.module').then(m => m.PaineisModule)
      },
    ]
  }
]

@NgModule({
  declarations: [
    FeaturesComponent
  ],
  imports: [
    CommonModule,
    PoUiModule,
    RouterModule.forChild(routes),
    CadastrosModule,
    PaineisModule
  ]
})
export class FeaturesModule { }
