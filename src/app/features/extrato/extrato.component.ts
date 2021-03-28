import { FirebaseService } from './../../services/firebase/firebase.service';
import { Component, OnInit } from '@angular/core';
import { Movimento } from './extrato';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.css']
})
export class ExtratoComponent implements OnInit {

  Movimentos: Observable<Array<Movimento>>;
  constructor(private firebaseService: FirebaseService) {
    this.Movimentos = of([
      {
        userId:'sdfskdjfgjh',
        data:'2001-01-01',
        nome:'Enel',
        descricao:'Conta de energia',
        carteira:'Despesa',
        tipo:'fixo',
        valor:900,
      },
      {
        userId:'sdfskdjfgjh',
        data:'2001-01-01',
        nome:'Enel',
        descricao:'Conta de energia',
        carteira:'Despesa',
        tipo:'fixo',
        valor:900,
      },
      {
        userId:'sdfskdjfgjh',
        data:'2001-01-01',
        nome:'Enel',
        descricao:'Conta de energia',
        carteira:'Despesa',
        tipo:'fixo',
        valor:900,
      },
      {
        userId:'sdfskdjfgjh',
        data:'2001-01-01',
        nome:'Enel',
        descricao:'Conta de energia',
        carteira:'Despesa',
        tipo:'fixo',
        valor:900,
      },
      {
        userId:'sdfskdjfgjh',
        data:'2001-01-01',
        nome:'Enel',
        descricao:'Conta de energia',
        carteira:'Despesa',
        tipo:'fixo',
        valor:900,
      },
      {
        userId:'sdfskdjfgjh',
        data:'2001-01-01',
        nome:'Enel',
        descricao:'Conta de energia',
        carteira:'Despesa',
        tipo:'fixo',
        valor:900,
      },
      {
        userId:'sdfskdjfgjh',
        data:'2001-01-01',
        nome:'Enel',
        descricao:'Conta de energia',
        carteira:'Despesa',
        tipo:'fixo',
        valor:900,
      },
      {
        userId:'sdfskdjfgjh',
        data:'2001-01-01',
        nome:'Enel',
        descricao:'Conta de energia',
        carteira:'Despesa',
        tipo:'fixo',
        valor:900,
      },
      {
        userId:'sdfskdjfgjh',
        data:'2001-01-01',
        nome:'Enel',
        descricao:'Conta de energia',
        carteira:'Despesa',
        tipo:'fixo',
        valor:900,
      },
    ])
  }

  ngOnInit(): void {
  }

}
