import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  sendPasswordResetEmail
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: Auth) {}

  // Registro con verificación de correo
  async register(email: string, password: string) {
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    await sendEmailVerification(userCredential.user);
    return userCredential;
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
