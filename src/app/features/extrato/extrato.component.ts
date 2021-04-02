import { FirebaseService } from './../../services/firebase/firebase.service';
import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { Data, DataCategorias, DataMovimentos } from 'src/app/services/firebase/firebase';

@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.css']
})
export class ExtratoComponent implements OnInit {

  public Movimentos$!: Observable<Array<DataMovimentos>>;
  public Paineis$: Observable<Array<Data>>;
  public Categorias$: Observable<Array<DataCategorias>>;
  public ObsAll$!: Observable<any>;
  public Paineis: Array<any> = [];
  public filterDateFrom: string = new Date() as any;
  public filterDateTo: string = new Date() as any;

  private today = new Date();
  constructor(private firebaseService: FirebaseService) {
    this.Paineis$ = this.firebaseService.get(this.firebaseService.collectionPainel)
    this.Categorias$ = this.firebaseService.get(this.firebaseService.collectionCategorias)
    this.getMovimentos(
      new Date(this.today.getFullYear(), 0, 1).toISOString().slice(0, 10),
      new Date(this.today.getFullYear() + 1, 0, 0).toISOString().slice(0, 10)
    );
  }

  ngOnInit(): void {
  }

  // filtros por mês e ano
  filterMov(opc: number): void {
    if (opc === 1){ // mes
      this.getMovimentos(
        new Date(this.today.getFullYear(), this.today.getMonth() , 1).toISOString().slice(0, 10),
        new Date(this.today.getFullYear(), this.today.getMonth() + 1  , 0).toISOString().slice(0, 10)
      );
    } else {
      this.getMovimentos(
        new Date(this.today.getFullYear(), 0, 1).toISOString().slice(0, 10),
        new Date(this.today.getFullYear() + 1, 0, 0).toISOString().slice(0, 10)
      );
    }
  }

  getMovimentos(dateFrom: string, dateTo: string): void {
    this.Movimentos$ = this.firebaseService.getWhenPeriod(
      this.firebaseService.collectionMovimentos, 'data', dateFrom, dateTo,
      );
    this.setCards();
  }

  // criar os painéis
  setCards(): void {
    const paineisTmp: Array<any> = [];
    this.ObsAll$ = forkJoin({paineis: this.Paineis$, categorias: this.Categorias$, movimentos: this.Movimentos$});

    this.ObsAll$.subscribe(fork => {
      fork.paineis.map((painel: any) => {
        const painelValores: Array<number> = painel.data.categorias.map((item: string) => {
          const itemMovimentos: Array<DataMovimentos> = fork.movimentos.filter((mov: DataMovimentos) => mov.data.categoria === item);
          let itemTotal = 0;
          if (itemMovimentos.length > 0){
            const itemCategoria: Array<DataCategorias> = fork.categorias.filter((categ: DataCategorias) => categ.data.nome === item);
            const valores = itemMovimentos.map(mov =>   mov.data.valor);
            itemTotal = valores.reduce((total, vl) => total += vl);
            if (itemCategoria[0].data.operacao === '-'){
              itemTotal *= (-1);
            }else if (itemCategoria[0].data.operacao === '='){
              itemTotal = 0;
            }
          }
          return itemTotal;
        });

        // caso seja apenas uma categoria, deixo o valor positivo
        if (painelValores.length < 2){
          painelValores[0] = Math.abs(painelValores[0]);
        }
        paineisTmp.push({
          nome: painel.data.nome,
          valor: painelValores.reduce((total, item) => total + item),
          ordem: painel.data.ordem
        });
      });
      paineisTmp.sort((a, b) => {
        return (a.ordem > b.ordem) ? 1 : ((b.ordem > a.ordem) ? -1 : 0);
      });
      this.Paineis = paineisTmp;
    } );
  }

}
