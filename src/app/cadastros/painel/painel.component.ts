import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PoModalComponent, PoRadioGroupOption } from '@po-ui/ng-components';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { Painel } from './painel';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {

  @ViewChild('modalCategoria') modalCategoria!: PoModalComponent;

  public painelForm: FormGroup;

  public categorias$: Observable<Array<any>>;

  constructor(
    private firebaseService: FirebaseService,
    private formBuilder: FormBuilder,
    ) {
    this.categorias$ = this.firebaseService.getAll('categorias')
      .pipe(
        map(data =>
          data.map((item: any) => ({label: item.data.nome, value: item.data.nome}))
        )
      );

    this.painelForm = this.formBuilder.group({
      nome: new FormControl('', Validators.required),
      categorias: new FormControl([], Validators.required),
      ordem: new FormControl(1, Validators.required)
    });

  }

  ngOnInit(): void {

  }

  openAdd(): void {
    this.modalCategoria.open();
  }
  confirmAdd(form: any): void{
    const data: Painel = {
      nome: form.nome,
      ordem: form.ordem,
      categorias: form.categorias
    };
    this.firebaseService.add(this.firebaseService.collectionPainel, data);
  }
}
