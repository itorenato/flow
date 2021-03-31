import { Categoria } from 'src/app/cadastros/categoria/categoria';
import { Movimento } from 'src/app/features/extrato/extrato';

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

