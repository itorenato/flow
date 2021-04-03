import { MovimentoAddComponent } from './movimento-add/movimento-add.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PoUiModule } from '../poUi.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [

    MovimentoAddComponent
  ],
  imports: [
    CommonModule,
    PoUiModule,
    ReactiveFormsModule
  ],
  exports: [

    MovimentoAddComponent
  ]
})
export class CadastrosModule { }
