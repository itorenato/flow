import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PoModalComponent, PoSelectOption } from '@po-ui/ng-components';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Movimento } from 'src/app/features/extrato/extrato';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';


@Component({
  selector: 'app-movimento-add',
  templateUrl: './movimento-add.component.html',
  styleUrls: ['./movimento-add.component.css']
})
export class MovimentoAddComponent implements OnInit {
  public categorias$: Observable<any>;
  public tipos: Array<PoSelectOption>;
  public movimentoForm: FormGroup;

  @ViewChild('md') md!: PoModalComponent;

  constructor(
    private firebaseService: FirebaseService,
    private formBuilder: FormBuilder
    ) {
    this.categorias$ = this.firebaseService.getAll(this.firebaseService.collectionCategorias)
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
    const id = this.firebaseService.getUserId();
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
