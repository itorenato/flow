import { FirebaseService } from './../services/firebase/firebase.service';
import { Component, OnInit } from '@angular/core';
import { PoToolbarAction, PoToolbarProfile } from '@po-ui/ng-components';
import { User } from '../services/firebase/firebase';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent implements OnInit {

  public profileActions!: Array<PoToolbarAction>;

  public profile!: PoToolbarProfile;

  constructor( private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.profileActions = [
      { icon: 'po-icon-exit', label: 'Exit', type: 'danger', separator: true, action: () => this.firebaseService.logout()}
    ];
    this.firebaseService.userInfo().subscribe((userInfo: any) => {
      const user: User = userInfo.data();
      this.profile = {
        title: user.name,
        subtitle: user.email
      }
    });
  }

}
