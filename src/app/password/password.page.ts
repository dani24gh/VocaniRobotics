import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonItem, IonLabel } from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PasswordPage implements OnInit {

  constructor(private alertController: AlertController, private router: Router, private authService:AuthService) { }

  ngOnInit() { }

  
// Función que se ejecuta al hacer submit del formulario
async onSubmit() {
  const email = (document.getElementById('email') as HTMLInputElement).value;
  const password = (document.getElementById('password') as HTMLInputElement).value;

    // Si el email y password son válidos, muestra un mensaje de éxito
    if (this.validateEmail(email) && password) {
      const alert = await this.alertController.create({
        header: 'Login Success',
        message: 'You have logged in successfully!',
        buttons: ['OK']
      });
      await alert.present();
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Please check your credentials.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  // Función para validar el formato del correo
  validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  // Función para navegación
  onSignUp() {
    this.router.navigateByUrl("login");
  }

  // Función para enviar el correo de reseteo de contraseña y mostrar alerta
async onReset() {
  const email = (document.getElementById('email') as HTMLInputElement).value;
  
  if (this.validateEmail(email)) {
    try {
      await this.authService.resetPassword(email);
      console.log(email);
      
      const alert = await this.alertController.create({
        header: 'Correo enviado',
        message: 'Se ha mandado un correo para restablecer la contraseña.',
        buttons: ['OK']
      });
            await alert.present();
      await alert.onDidDismiss(); // Espera a que el usuario cierre la alerta
      this.router.navigate(['/login']); // Redirige al login

    } catch (error) {
      console.error('Error al enviar correo de recuperación:', error);
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'No se pudo enviar el correo. Verifica la dirección e inténtalo de nuevo.',
        buttons: ['OK']
      });
      await alert.present();
    }
  } else {
    const alert = await this.alertController.create({
      header: 'Correo inválido',
      message: 'Por favor ingresa una dirección de correo válida.',
      buttons: ['OK']
    });
    await alert.present();
  }
}


}

