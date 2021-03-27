import { ExtratoComponent } from './extrato/extrato.component';
import { PoUiModule } from './../poUi.module';
import { FeaturesComponent } from './features.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CardComponent } from './extrato/card/card.component';

const routes: Routes = [
  {
    path: '',
    component: FeaturesComponent,
    // children: [
    //   {
    //     path: 'extrato',
    //     component: ExtratoComponent
    //   }
    // ]
  },

]

@NgModule({
  declarations: [
    FeaturesComponent,
    ExtratoComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    PoUiModule,
    RouterModule.forChild(routes)
  ]
})
export class FeaturesModule { }
