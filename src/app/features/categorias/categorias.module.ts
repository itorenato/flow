import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriasComponent } from './categorias.component';
import { PoUiModule } from 'src/app/poUi.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: CategoriasComponent,
  }
];

@NgModule({
  declarations: [CategoriasComponent],
  imports: [
    CommonModule,
    PoUiModule,
    RouterModule.forChild(routes),
  ]
})
export class CategoriasModule { }
