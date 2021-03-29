import { NgModule } from '@angular/core';
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
    PoFieldModule
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
    PoFieldModule
  ]


})
export class PoUiModule { }
