import { Observable } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataCategorias } from 'src/app/services/firebase/firebase';
import { PoRadioGroupOption, PoTableAction, PoTableColumn, PoModalComponent } from '@po-ui/ng-components';
import { map } from 'rxjs/operators';
import { Categoria } from 'src/app/shared/interfaces/categoria';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  public Categorias$: Observable<Array<Categoria>>;
  public tableColumns: Array<PoTableColumn>;
  public tableActions: Array<PoTableAction>;
  public rowItem: Categoria | undefined;

  // modal
  public operacoes: Array<PoRadioGroupOption>;
  public categoriaForm: FormGroup;
  public botaoLabel!: string;
  public title!: string;
  // modal delete
  public categoriaId!: string;
  @ViewChild('mdAdd') mdAdd!: PoModalComponent;
  @ViewChild('mdDelete') mdDelete!: PoModalComponent;

  constructor(
    private firebaseService: FirebaseService,
    private formBuilder: FormBuilder
  ) {
    this.Categorias$ = this.firebaseService.getAllSnapshot(this.firebaseService.collectionCategorias)
      .pipe(
        map( (categ: Array<DataCategorias>) => {
          return categ.map((item: DataCategorias) => item.data);
        })
      );
    // prepara as colunas
    this.tableColumns = [
        { property: 'nome', label: 'Nome' },
        { property: 'operacao', label: 'Operação' },
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

    // modal opcoes
    this.operacoes = [
      {label: 'Soma', value: '+'},
      {label: 'Subtrai', value: '-'},
      {label: 'Nada', value: '='},
    ];
    // modal form
    this.categoriaForm = this.formBuilder.group({
      nome: new FormControl('', Validators.required),
      operacao: new FormControl('+', Validators.required),
      id: new FormControl(undefined),
    });
   }

  ngOnInit(): void {
  }

  // modal open
  openModalAdd(row: any | undefined): void{
    this.categoriaForm.reset();
    // ajusta a label do botão
    this.botaoLabel = (row ? 'Salvar' : 'Cadastrar');
    // ajusta titulo do modal
    this.title = (row ? 'Editar categoria' : 'Nova categoria');
    if (row){
      this.categoriaForm.setValue({
        nome: row.nome,
        operacao: row.operacao,
        id: row.id
      });
    }
    this.mdAdd.open();
  }
  // modal botão
  confirmAdd(form: any): void{
    const data: Categoria = {
      nome: form.nome,
      operacao: form.operacao
    };
    if (form.id){ // alteração
      const id = (form.id ? form.id : '')
      this.firebaseService.update(this.firebaseService.collectionCategorias, id, data).then( () => {
        this.mdAdd.close();
        this.categoriaForm.reset();
      });
    } else {  // inclusão
      this.firebaseService.add(this.firebaseService.collectionCategorias, data).then( () => {
        this.mdAdd.close();
        this.categoriaForm.reset();
      });
    }
  }
  // abre o modal de delete
  openModalDelete(row: any): void {
    this.categoriaId = row.id;
    this.mdDelete.open();
  }
  // delete item
  deleteItem(): any{
    this.firebaseService.delete(this.firebaseService.collectionCategorias, this.categoriaId ).then( () => {
      this.mdDelete.close();
      this.categoriaForm.reset();
    });
  }
}
