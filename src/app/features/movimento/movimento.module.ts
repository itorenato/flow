import { MovimentoComponent } from './movimento.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PoUiModule } from 'src/app/poUi.module';

const routes: Routes = [
  {
    path: '',
    component: MovimentoComponent,
  }
];

@NgModule({
  declarations: [
    MovimentoComponent
  ],
  imports: [
    CommonModule,
    PoUiModule,
    RouterModule.forChild(routes)
  ],
  exports: []
})
export class MovimentoModule { }
