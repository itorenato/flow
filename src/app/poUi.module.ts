import { NgModule } from '@angular/core';
import { PoButtonModule, PoContainerModule, PoFieldModule, PoModalModule, PoModule, PoNotificationModule, PoTagModule, PoWidgetModule } from '@po-ui/ng-components';
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
    PoTagModule
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
    PoTagModule
  ]


})
export class PoUiModule { }
