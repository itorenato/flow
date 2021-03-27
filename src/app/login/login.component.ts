import { FirebaseService } from './../services/firebase/firebase.service';
import { Component, OnInit } from '@angular/core';
import { PoPageLogin } from '@po-ui/ng-templates';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit(): void {
  }

  loginSubmit(user: PoPageLogin){
    this.firebaseService.login(user.login, user.password)

  }
}
