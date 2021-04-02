import { MovimentoAddComponent } from './movimento-add/movimento-add.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaComponent } from './categoria/categoria.component';
import { PoUiModule } from '../poUi.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PainelComponent } from './painel/painel.component';



@NgModule({
  declarations: [
    CategoriaComponent,
    PainelComponent,
    MovimentoAddComponent
  ],
  imports: [
    CommonModule,
    PoUiModule,
    ReactiveFormsModule
  ],
  exports: [
    CategoriaComponent,
    PainelComponent,
    MovimentoAddComponent
  ]
})
export class CadastrosModule { }
