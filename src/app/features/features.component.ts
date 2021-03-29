import { CategoriaComponent } from './../cadastros/categoria/categoria.component';
import { FirebaseService } from './../services/firebase/firebase.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PoMenuItem, PoMenuPanelItem, PoModalComponent, PoToolbarAction, PoToolbarProfile } from '@po-ui/ng-components';
import { User } from '../services/firebase/firebase';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent implements OnInit {

  public profileActions: Array<PoToolbarAction>;

  public profile!: PoToolbarProfile;

  public menuItems: Array<PoMenuItem>;

  public toollbarTitle!: string;

  @ViewChild('modalCategoria') modalCategoria!: CategoriaComponent;

  constructor(
    private firebaseService: FirebaseService,
    ) {
    this.menuItems = [
      { label: 'Novo Movimento', shortLabel: 'Add ', action: this.changeTitle.bind(this), link: '/movimento', icon: 'po-icon-bar-code' },
      { label: 'Extrato', shortLabel: 'Mov', action: this.changeTitle.bind(this), link: '/extrato', icon: 'po-icon-list' },
      { label: 'Sair', shortLabel: 'Sair', action: () => this.firebaseService.logout(), icon: 'po-icon-exit' }
    ];
    this.profileActions = [
      { icon: 'po-icon-exit', label: 'Categorias', type: 'danger', separator: true, action: () => this.modalCategoria.openAdd()},
      { icon: 'po-icon-exit', label: 'Exit', type: 'danger', separator: true, action: () => this.firebaseService.logout()}
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
