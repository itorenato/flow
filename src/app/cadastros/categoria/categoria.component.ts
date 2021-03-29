import { FirebaseService } from './../../services/firebase/firebase.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PoModalComponent, PoRadioGroupOption } from '@po-ui/ng-components';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Categoria } from './categoria';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  @ViewChild('modalCategoria') modalCategoria!: PoModalComponent;

  public operacoes: Array<PoRadioGroupOption>;
  public categoriaForm: FormGroup;
  constructor(
    private firebaseService: FirebaseService,
    private formBuilder: FormBuilder,
    ) {
    this.operacoes = [
      {label: 'Soma', value: '+'},
      {label: 'Subtrai', value: '-'},
      {label: 'Nada', value: '='},
    ];

    this.categoriaForm = this.formBuilder.group({
      nome: new FormControl('', Validators.required),
      operacao: new FormControl('+', Validators.required)
    });

  }

  ngOnInit(): void {

  }

  formOk(): boolean{
    return !this.categoriaForm.valid;
  }
  openAdd(): void {
    this.modalCategoria.open();
  }
  confirmAdd(form: any): void{
    const data: Categoria = {
      nome: form.nome,
      operacao: form.operacao
    };
    this.firebaseService.add('categorias', data);
  }
}
