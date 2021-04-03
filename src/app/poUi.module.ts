import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PoButtonModule, PoContainerModule, PoFieldModule, PoModalModule, PoModule, PoNotificationModule, PoPageModule, PoTagModule, PoWidgetModule } from '@po-ui/ng-components';
import { PoPageLoginModule, PoTemplatesModule } from '@po-ui/ng-templates';


@NgModule({
  imports: [
    PoModule,
    PoTemplatesModule,
    PoPageLoginModule,
    PoNotificationModule,
    PoButtonModule,
    PoModalModule,
    PoContainerModule,
    PoFieldModule,
    PoWidgetModule,
    PoTagModule,
    PoPageModule,
    PoFieldModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[
    PoModule,
    PoTemplatesModule,
    PoPageLoginModule,
    PoNotificationModule,
    PoButtonModule,
    PoModalModule,
    PoContainerModule,
    PoFieldModule,
    PoWidgetModule,
    PoTagModule,
    PoPageModule,
    PoFieldModule,
    ReactiveFormsModule,
    FormsModule

  ]


})
export class PoUiModule { }
