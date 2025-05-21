import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Firestore, collection, query, where, getDocs } from '@angular/fire/firestore';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class SignUpPage implements OnInit {

  email: string = '';
  password: string = '';
  name: string = '';
  matricula: string = '';
  gradoGrupo: string = '';

  constructor(
    private authService: AuthService,
    private alertController: AlertController,
    private router: Router,
    private firestore: Firestore
  ) {}

  ngOnInit() {}

  async onSubmit() {
    try {
      console.log('Datos del formulario:');
      console.log('Nombre:', this.name);
      console.log('Matrícula:', this.matricula);
      console.log('Grado y Grupo:', this.gradoGrupo);
      console.log('Email:', this.email);

      // Verificar si la matrícula ya existe
      const matriculaExists = await this.checkMatriculaExists(this.matricula);
      if (matriculaExists) {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'La matrícula ya está registrada. Por favor, usa una diferente.',
          buttons: ['OK']
        });
        await alert.present();
        return; // Detiene el registro si la matrícula ya existe
      }

      // Registrar al usuario en Firebase Authentication
      const userCredential = await this.authService.register(this.email, this.password);
      const uid = userCredential.user.uid;

      // Guardar datos adicionales en Firestore
      await this.authService.saveUserData(uid, {
        name: this.name,
        matricula: this.matricula,
        gradoGrupo: this.gradoGrupo,
        email: this.email
      });

      const alert = await this.alertController.create({
        header: 'Éxito',
        message: '¡Te has registrado exitosamente!',
        buttons: ['OK']
      });
      await alert.present();
      this.router.navigate(['/login']); // Redirige al login después del registro
    } catch (error: any) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Ocurrió un error: ' + error.message,
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  // Método para verificar si la matrícula ya existe en Firestore
  async checkMatriculaExists(matricula: string): Promise<boolean> {
    const usersCollection = collection(this.firestore, 'users'); // Cambia 'users' por el nombre de tu colección
    const q = query(usersCollection, where('matricula', '==', matricula));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty; // Devuelve true si la matrícula ya existe
  }

  onSignUp() {
    this.router.navigateByUrl("login");
  }
}
