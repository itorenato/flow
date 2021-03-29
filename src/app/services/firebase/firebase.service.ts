import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {PoNotificationService} from '@po-ui/ng-components';
import {User} from './firebase';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  public userId = localStorage.getItem('userId');
  public collectionUser = 'usuarios';
  public collectionMovimentos = 'movimentos';

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
        this.userId = user.uid;
      } else {
        localStorage.setItem('user', '');
        localStorage.setItem('userId', '');
        this.userId = '';
      }
    });
  }

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

  logout(): void {
    this.afAuth.signOut().then(() => this.router.navigate(['login']));
  }

  user() {
    return this.afAuth.authState;
  }
  // como garantir que this.userId esteja carregada em memoria
  userInfo() {
    if (this.userId) {
      return this.firestore.collection(this.collectionUser).doc(this.userId).get();
    } else {
      return this.firestore.collection(this.collectionUser).doc('132').get();
    }
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

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

  getAll(collection: string): Observable<Array<{id: string, data: any}>> {
    if (!this.userId) {
      this.userId = '123456';
    }
    return this.firestore
      .collection(this.collectionUser)
      .doc(this.userId)
      .collection(collection)
      .snapshotChanges()
      .pipe(
        map((resp) => {
          return resp.map((item: any) => {
            const data = item.payload.doc.data();
            const id = item.payload.doc.id;
            return {id, data};
          });
        })
      );
  }

  getWhenPeriod(collection: string, campo: string, dateFrom: string, dateTo: string): Observable<Array<{id: string, data: any}>> {
    if (!this.userId) {
      this.userId = '123456';
    }
    return this.firestore.collection(this.collectionUser)
      .doc(this.userId)
      .collection(collection, ref => ref
        .where(campo, '>=', dateFrom)
        .where(campo, '<=', dateTo)
        )
      .snapshotChanges()
        .pipe(map(resp => this.formatData(resp))
      );
  }

  formatData(data: any): Array<{id: string, data: any}> {
    return data.map((item: any ) => {
      console.log(item)
      return {
        id: item.payload.doc.id,
        data: item.payload.doc.data()
      };
    });
  }
}
