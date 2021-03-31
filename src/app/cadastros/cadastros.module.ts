import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaComponent } from './categoria/categoria.component';
import { PoUiModule } from '../poUi.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PainelComponent } from './painel/painel.component';



@NgModule({
  declarations: [
    CategoriaComponent,
    PainelComponent
  ],
  imports: [
    CommonModule,
    PoUiModule,
    ReactiveFormsModule
  ],
  exports: [
    CategoriaComponent,
    PainelComponent
  ]
})
export class CadastrosModule { }
