import { FirebaseService } from './../services/firebase/firebase.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PoMenuItem, PoMenuPanelItem, PoToolbarProfile } from '@po-ui/ng-components';
import { User } from '../services/firebase/firebase';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent implements OnInit {

  public profile!: PoToolbarProfile;

  public menuItems: Array<PoMenuItem>;

  public toollbarTitle!: string;

  constructor(
    private firebaseService: FirebaseService,
    ) {
    this.toollbarTitle = 'Extrato';
    this.menuItems = [
      { label: 'Extrato', shortLabel: 'Mov', action: this.changeTitle.bind(this), link: '/extrato', icon: 'po-icon-list' },
      { label: 'Configurações', shortLabel: 'Conf.', icon: 'po-icon-settings', subItems: [
        { label: 'Categorias', action: this.changeTitle.bind(this), link: '/categorias' },
        { label: 'Painéis', action: this.changeTitle.bind(this), link: '/paineis' },
      ]},
      { label: 'Sair', shortLabel: 'Sair', action: () => this.firebaseService.logout(), icon: 'po-icon-exit' }
    ];
   }

  ngOnInit(): void {
    this.firebaseService.userInfo().subscribe((userInfo: any) => {
      const user: User = userInfo.data();
      this.profile = {
        title: user.name,
        subtitle: user.email
      };
    });
  }

  changeTitle(menu: PoMenuPanelItem): void {
    this.toollbarTitle = menu.label;
  }

}
