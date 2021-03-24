import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import { settings } from './settings';

if (firebase.apps.length === 0) {
  firebase.initializeApp(settings.firebase);
}

class FirebaseAuthClient {
  private auth: firebase.auth.Auth;

  constructor(private email: string) {
    this.auth = firebase.auth();
  }

  async login(password: string) {
    await this.auth.signInWithEmailAndPassword(this.email, password);
  }

  async check(): Promise<boolean> {
    return new Promise((resolve) => {
      try {
        this.auth.onAuthStateChanged((user) => {
          const res = user?.email === this.email;
          resolve(res);
        });
      } catch {
        resolve(false);
      }
    });
  }

  async logout(): Promise<void> {
    await this.auth.signOut();
  }
}

class FirebaseStorageClient {
  private storage: firebase.storage.Storage;

  constructor() {
    this.storage = firebase.storage();
  }

  async getDownloadUrl(path: string): Promise<string> {
    return await this.storage.ref(path).getDownloadURL();
  }
}

export const firebaseAuthClient = new FirebaseAuthClient(
  settings.mizutoriEmail
);
export const firebaseStorageClient = new FirebaseStorageClient();
