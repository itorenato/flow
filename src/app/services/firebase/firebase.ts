
import { Painel } from 'src/app/shared/interfaces/painel';
import { Movimento } from 'src/app/features/extrato/extrato';
import { Categoria } from 'src/app/shared/interfaces/categoria';

export interface User{
  name: string;
  email: string;
}
export interface Data{
   id: string;
   data: any;
}
export interface DataMovimentos{
   id: string;
   data: Movimento;
}
export interface DataCategorias{
   id: string;
   data: Categoria;
}
export interface DataPaineis{
   id: string;
   data: Painel;
}

