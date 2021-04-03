import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PoModalAction, PoModalComponent, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Painel } from 'src/app/shared/interfaces/painel';
import { DataPaineis } from 'src/app/services/firebase/firebase';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { Categoria } from 'src/app/shared/interfaces/categoria';

@Component({
  selector: 'app-paineis',
  templateUrl: './paineis.component.html',
  styleUrls: ['./paineis.component.css']
})
export class PaineisComponent implements OnInit {

  public categorias$: Observable<Array<any>>;
  public paineis$: Observable<Array<Painel>>;
  public tableColumns: Array<PoTableColumn>;
  public tableActions: Array<PoTableAction>;
  public rowItem: Painel | undefined;

  // modal
  public painelForm: FormGroup;
  public botaoLabel!: string;
  public title!: string;

  // modal delete
  public painelId!: string;

  @ViewChild('mdAdd') mdAdd!: PoModalComponent;
  @ViewChild('mdDelete') mdDelete!: PoModalComponent;

  constructor(
    private firebaseService: FirebaseService,
    private formBuilder: FormBuilder
    ) {
      // categlorias para o form
      this.categorias$ = this.firebaseService.getAll(this.firebaseService.collectionCategorias)
      .pipe(
        map(data =>
          data.map((item: any) => ({label: item.data.nome, value: item.data.nome}))
        )
      );
      // validaçõe do form
      this.painelForm = this.formBuilder.group({
        nome: new FormControl('', Validators.required),
        categorias: new FormControl([], Validators.required),
        ordem: new FormControl(1, Validators.required),
        id: new FormControl(undefined)
      });
      // carregas os painéis configurados para listagem
      this.paineis$ = this.firebaseService.getAllSnapshot(this.firebaseService.collectionPainel)
      .pipe(
        map( (painel: Array<DataPaineis>) => {
          return painel.map((item: DataPaineis) => item.data);
        })
      );
      // prepara as colunas da table
      this.tableColumns = [
        { property: 'nome', label: 'Nome' },
        { property: 'categorias', label: 'Categorias' },
        { property: 'ordem', label: 'Ordem' },
      ];
      // ações dos items
      this.tableActions = [
        {
          action: this.openModalAdd.bind(this),
          icon: 'po-icon-edit',
          label: 'Editar',
        },
        {
          action: this.openModalDelete.bind(this),
          icon: 'po-icon-delete',
          label: 'Excluir',
        },
      ];
    }

  ngOnInit(): void {
  }

  // modal open
  openModalAdd(row: any | undefined): void{
    this.painelForm.reset();
    // ajusta a label do botão
    this.botaoLabel = (row ? 'Salvar' : 'Cadastrar');
    // ajusta titulo do modal
    this.title = (row ? 'Editar painel' : 'Nova painel');
    if (row){
      this.painelForm.setValue({
        nome: row.nome,
        categorias: row.categorias,
        ordem: row.ordem,
        id: row.id
      });
    }
    this.mdAdd.open();
  }

  // modal botão
  confirmAdd(form: any): void{
    const data: Painel = {
      nome: form.nome,
      categorias: form.categorias,
      ordem: form.ordem
    };
    if (form.id){ // alteração
      const id = (form.id ? form.id : '')
      this.firebaseService.update(this.firebaseService.collectionPainel, id, data).then( () => {
        this.mdAdd.close();
        this.painelForm.reset();
      });
    } else {  // inclusão
      this.firebaseService.add(this.firebaseService.collectionPainel, data).then( () => {
        this.mdAdd.close();
        this.painelForm.reset();
      });
    }
  }
  // abre o modal de delete
  openModalDelete(row: any): void {
    this.painelId = row.id;
    this.mdDelete.open();
  }
  // delete item
  deleteItem(): any{
    this.firebaseService.delete(this.firebaseService.collectionPainel, this.painelId ).then( () => {
      this.mdDelete.close();
      this.painelForm.reset();
    });
  }

}
