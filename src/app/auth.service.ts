import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: Auth, private firestore: Firestore) {}

  // Registro de usuario y guardado de perfil en Firestore
  async register(email: string, password: string, nombre: string, matricula: number, grupo: string, grado: number) {
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    const uid = userCredential.user.uid;
    await this.saveUserProfile(uid, nombre, matricula, grupo, grado);
    return userCredential;
  }

  // Guardar datos adicionales del usuario en Firestore
  async saveUserProfile(uid: string, nombre: string, matricula: number, grupo: string, grado: number) {
    const userRef = doc(this.firestore, `users/${uid}`);
    return await setDoc(userRef, {
      nombre,
      matricula,
      grupo,
      grado
    });
  }

  // Inicio de sesión
  async login(email: string, password: string) {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  // Restablecer contraseña
  async resetPassword(email: string) {
    return await sendPasswordResetEmail(this.auth, email);
  }

  // Cierre de sesión
  async logout() {
    return await signOut(this.auth);
  }
}
