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
    RouterModule.forChild(routes)
  ]
})
export class FeaturesModule { }
