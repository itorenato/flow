import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaineisComponent } from './paineis.component';
import { PoUiModule } from 'src/app/poUi.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: PaineisComponent,
  }
];

@NgModule({
  declarations: [PaineisComponent],
  imports: [
    CommonModule,
    PoUiModule,
    RouterModule.forChild(routes)
  ]
})

export class PaineisModule { }
