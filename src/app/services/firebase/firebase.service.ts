import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {PoNotificationService} from '@po-ui/ng-components';
import {Data, User} from './firebase';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {

  public collectionUser = 'usuarios';
  public collectionMovimentos = 'movimentos';
  public collectionPainel = 'painel';
  public collectionCategorias = 'categorias';

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public firestore: AngularFirestore,
    private router: Router,
    private poNotification: PoNotificationService
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('userId', user.uid);
      } else {
        localStorage.setItem('user', '');
        localStorage.setItem('userId', '');
      }
    });
  }
  // login
  login(email: string, password: string): Promise<void> {
    return this.afAuth.signInWithEmailAndPassword(email, password).then(
      (ok) => {
        this.router.navigate(['']);
      },
      (error) => {
        this.poNotification.error(error.message);
      }
    );
  }
  // cadastro de usuário
  register(email: string, password: string, name: string): Promise<void> {
    return this.afAuth.createUserWithEmailAndPassword(email, password).then(
      (respUser: any) => {
        this.afs
          .collection<User>(this.collectionUser)
          .doc(respUser.user.uid)
          .set({email, name})
          .then(() => this.router.navigate(['']));
      },
      (error) => {
        this.poNotification.error(error.message);
      }
    );
  }
  // logout do sistema
  logout(): void {
    this.afAuth.signOut().then(() => this.router.navigate(['login']));
  }
  // recupera o userId
  get userId(): string{
    const id = localStorage.getItem('userId');
    return ( id ? id : '');
  }
  // dados complementares do cliente
  userInfo(): Observable<any> {
    return this.firestore.collection(this.collectionUser).doc(this.userId).get();
  }

  // adiciona itens em uma coleção
  add(collection: string, data: any): Promise<any> {
    if (this.userId) {
      return this.firestore
        .collection(this.collectionUser)
        .doc(this.userId)
        .collection(collection)
        .add(data)
        .then(
          () => {
            this.poNotification.success('Adicionado com sucesso!');
          },
        (error) => {
          this.poNotification.error(error.message);
        });
    } else {
      return Promise.reject('userid');
    }
  }
  // atualiza item de uma coleção
  update(collection: string, id: string, record: any): Promise<any>{
    return this.firestore.collection(this.collectionUser).doc(this.userId).collection(collection).doc(id).set(record)
            .then(
              () => {
                this.poNotification.success('Atualizado com sucesso!');
              },
              (error) => {
                this.poNotification.error(error.message);
              });
  }
  // apaga um item da coleção
  delete(collection: string, id: string): Promise<any> {
    return this.firestore.firestore.collection(this.collectionUser).doc(this.userId).collection(collection).doc(id).delete()
      .then(
        () => {
          this.poNotification.success('Excluído com sucesso!');
        },
        (error) => {
          this.poNotification.error(error.message);
        });
  }


  getAll(collection: string): Observable<Array<Data>> {
    return this.firestore
      .collection(this.collectionUser)
      .doc(this.userId)
      .collection(collection)
      .get()
      .pipe(map(resp => this.formatDocs(resp))
    );
  }

  getAllSnapshot(collection: string): Observable<Array<Data>> {
    return this.firestore
      .collection(this.collectionUser)
      .doc(this.userId)
      .collection(collection)
      .snapshotChanges()
      .pipe(map(resp => this.formatData(resp))
    );
  }

  get(collection: string): Observable<any> {
    return this.firestore
      .collection(this.collectionUser)
      .doc(this.userId)
      .collection(collection)
      .get()
      .pipe(map(resp => this.formatDocs(resp)));
  }
  getWhenPeriod(collection: string, campo: string, dateFrom: string, dateTo: string): Observable<Array<{id: string, data: any}>> {
    return this.firestore.collection(this.collectionUser)
      .doc(this.userId)
      .collection(collection, ref => ref
        .where(campo, '>=', dateFrom)
        .where(campo, '<=', dateTo)
        )
      .get()
        .pipe(map(resp => this.formatDocs(resp))
      );
  }

  formatData(data: any): Array<Data> {
    return data.map((item: any ) => {
      return {
        id: item.payload.doc.id,
        data: Object.assign(item.payload.doc.data(), {id: item.payload.doc.id})
      };
    });
  }
  formatDocs(data: any): Array<Data> {
    return data.docs.map((item: any ) => {
      return {
        id: item.id,
        data: Object.assign(item.data(), {id: item.id})
      };
    });
  }
}
