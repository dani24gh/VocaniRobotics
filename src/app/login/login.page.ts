import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  standalone: true
})
export class SignUpPage {
  nombre = '';
  matricula: number | null = null;
  grupo = '';
  grado: number | null = null;
  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private firestore: Firestore,
    private router: Router,
    private alertController: AlertController
  ) {}

  async onSignUp() {
    try {
      // 1. Crear usuario en Firebase Auth
      await this.authService.register(this.email, this.password);

      // 2. Guardar datos adicionales en Firestore
      const usuariosRef = collection(this.firestore, 'usuarios');
      await addDoc(usuariosRef, {
        nombre: this.nombre,
        matricula: this.matricula,
        grupo: this.grupo,
        grado: this.grado,
        email: this.email
      });

      const alert = await this.alertController.create({
        header: 'Registro exitoso',
        message: 'Tu cuenta ha sido creada correctamente',
        buttons: ['OK']
      });
      await alert.present();

      this.router.navigate(['/login']);
    } catch (error) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Ocurrió un error al registrarse: ' + error,
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}
