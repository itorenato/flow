import { CadastrosModule } from './../../cadastros/cadastros.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtratoComponent } from './extrato.component';
import { ListItemComponent } from './list-item/list-item.component';
import { CardComponent } from './card/card.component';
import { PoUiModule } from 'src/app/poUi.module';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: ExtratoComponent,
  }
];
@NgModule({
  imports: [
    CommonModule,
    PoUiModule,
    RouterModule.forChild(routes),
    FormsModule,
    CadastrosModule
  ],
  declarations: [
    ExtratoComponent,
    CardComponent,
    ListItemComponent,
    ]
})
export class ExtratoModule { }
