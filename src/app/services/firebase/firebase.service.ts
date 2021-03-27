import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/firestore";
import {AngularFireAuth} from "@angular/fire/auth";
import {Router} from "@angular/router";
import {PoNotificationService} from "@po-ui/ng-components";
import {User} from "./firebase";


@Injectable({
	providedIn: "root",
})
export class FirebaseService {
	public userId = localStorage.getItem("userId");

	constructor(
		public afs: AngularFirestore, // Inject Firestore service
		public afAuth: AngularFireAuth, // Inject Firebase auth service
		public firestore: AngularFirestore,
		private router: Router,
		private poNotification: PoNotificationService
	) {
		this.afAuth.authState.subscribe((user) => {
			if (user) {
				localStorage.setItem("user", JSON.stringify(user));
				localStorage.setItem("userId", user.uid);
				this.userId = user.uid;
			} else {
				localStorage.setItem("user", "");
				localStorage.setItem("userId", "");
				this.userId = "";
			}
		});
	}

	login(email: string, password: string) {
		return this.afAuth.signInWithEmailAndPassword(email, password).then(
			(ok) => {
				this.router.navigate([""]);
			},
			(error) => {
				this.poNotification.error(error.message);
			}
		);
	}

	register(email: string, password: string, name: string) {
		return this.afAuth.createUserWithEmailAndPassword(email, password).then(
			(respUser: any) => {
				this.afs
					.collection<User>("usuarios")
					.doc(respUser.user.uid)
					.set({email, name})
					.then(() => this.router.navigate([""]));
			},
			(error) => {
				this.poNotification.error(error.message);
			}
		);
	}

	logout() {
		this.afAuth.signOut().then(() => this.router.navigate(["login"]));
	}

	user() {
		return this.afAuth.authState;
	}
 // como garantir que this.userId esteja carregada em memoria
	userInfo() {
		if (this.userId) {
			return this.firestore.collection("usuarios").doc(this.userId).get();
		} else {
			return this.firestore.collection("usuarios").doc("132").get();
		}
	}
}
