import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaComponent } from './categoria/categoria.component';
import { PoUiModule } from '../poUi.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [CategoriaComponent],
  imports: [
    CommonModule,
    PoUiModule,
    ReactiveFormsModule
  ],
  exports: [
    CategoriaComponent
  ]
})
export class CadastrosModule { }
