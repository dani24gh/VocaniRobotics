import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  sendPasswordResetEmail
} from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { doc, setDoc } from 'firebase/firestore'; // Agrega esto arriba


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: Auth, private firestore: Firestore) {}

  // Registro con verificación de correo
  async register(email: string, password: string) {
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    await sendEmailVerification(userCredential.user);
    return userCredential;
  }
  async saveUserData(uid: string, data: any) {
    const userRef = doc(this.firestore, 'users', uid);
    await setDoc(userRef, data);
  }
  

  // Inicio de sesión
  async login(email: string, password: string) {
    sessionStorage.setItem('userEmail', email); // Guardar el email en sessionStorage
    
    return await signInWithEmailAndPassword(this.auth, email, password);


  }

  // Restablecer contraseña
  async resetPassword(email: string) {
    return await sendPasswordResetEmail(this.auth, email);
  }

  // Obtener información de la tabla users usando el email
  async getUserByEmail(email: string) {
    const usersCollection = collection(this.firestore, 'users');
    const q = query(usersCollection, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))[0];
    } else {
      throw new Error('Usuario no encontrado');
    }
    
  }

  // Cierre de sesión
  async logout() {
    return await signOut(this.auth);
  }
}