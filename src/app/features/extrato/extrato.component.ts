import { FirebaseService } from './../../services/firebase/firebase.service';
import { Component, OnInit } from '@angular/core';
import { Movimento } from './extrato';
import { Observable, of } from 'rxjs';
import { Data } from 'src/app/services/firebase/firebase';

@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.css']
})
export class ExtratoComponent implements OnInit {

  public Movimentos$: Observable<Array<Data>>;
  private today = new Date();
  constructor(private firebaseService: FirebaseService) {
    this.Movimentos$ = this.firebaseService.getWhenPeriod(
      this.firebaseService.collectionMovimentos,
      'data',
      new Date(this.today.getFullYear(), 0, 1).toISOString().slice(0, 10),
      new Date(this.today.getFullYear() + 1, 0, 0).toISOString().slice(0, 10),
      );
  }

  ngOnInit(): void {
  }

}
