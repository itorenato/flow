
import { FirebaseService } from './../../services/firebase/firebase.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PoSelectOption } from '@po-ui/ng-components';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Movimento } from '../extrato/extrato';

@Component({
  selector: 'app-movimento',
  templateUrl: './movimento.component.html',
  styleUrls: ['./movimento.component.css'],
})
export class MovimentoComponent implements OnInit {
  public categorias$: Observable<any>;
  public tipos: Array<PoSelectOption>;
  public movimentoForm: FormGroup;
  constructor(
    private firebaseService: FirebaseService,
    private formBuilder: FormBuilder
    ) {
    this.categorias$ = this.firebaseService.getAll('categorias')
      .pipe(
        map(data =>
          data.map((item: any) => ({label: item.data.nome, value: item.data.nome}))
        )
      );
    this.tipos = [
      {label: 'Mensal', value: 'Mensal'},
      {label: 'Anual', value: 'Anual'},
      {label: 'Avulso', value: 'Avulso'},
    ];
    this.movimentoForm = this.formBuilder.group({
      nome: new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required),
      categoria: new FormControl('', Validators.required),
      tipo: new FormControl('', Validators.required),
      data: new FormControl(new Date(), Validators.required),
      valor: new FormControl(0, Validators.required),
    });

  }

  ngOnInit(): void {

  }

  movimentoAdd(form: any): void{
    const id = this.firebaseService.userId;
    if (id) {
      const data: Movimento = {
        userId: id,
        data: form.data,
        nome: form.nome,
        descricao: form.descricao,
        categoria: form.categoria,
        tipo: form.tipo,
        valor: form.valor,
      };
      this.firebaseService.add(this.firebaseService.collectionMovimentos, data);
    }
  }
}
