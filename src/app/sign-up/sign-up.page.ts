
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

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
  rol: string = 'alumno'; 


  constructor(
    private authService: AuthService,
    private alertController: AlertController,
    private router: Router
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
    const matriculaExists = await this.authService.checkMatriculaExists(this.matricula);
    if (matriculaExists) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'La matrícula ya está registrada. Por favor, usa una diferente.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }
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
        header: 'Success',
        message: 'You have registered successfully!',
        buttons: ['OK']
      });
      await alert.present();
      this.router.navigate(['/login']);
    } catch (error: any) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'An error occurred: ' + error.message,
        buttons: ['OK']
      });
      await alert.present();
    }
  }
  

  onSignUp() {
    this.router.navigateByUrl("login");
  }
}
