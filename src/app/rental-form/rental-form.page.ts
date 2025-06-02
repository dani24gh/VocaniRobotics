import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';  
import { RentalService } from '../rental.service'; // Asegúrate de que la ruta sea correcta
import { Firestore, doc, getDoc, updateDoc, addDoc, collection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { P } from '@angular/common/platform_location.d-BWJDgVlg';
@Component({
  standalone: true,
  selector: 'app-rental-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule],
  templateUrl: './rental-form.page.html',
  styleUrls: ['./rental-form.page.scss'],
})
export class RentalFormPage implements OnInit {
  rentalForm!: FormGroup;
  selectedMaterial: any = null;
  userEmail: string | null = null;
  userInfo: any = null; // Variable para almacenar la información del usuario
  requestedItems: any[] = []; // Arreglo para almacenar los materiales solicitados
  minReturnDate: string = '';
  today: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private rentalService: RentalService,
    private firestore: Firestore,
    private router: Router, 
    private alertController: AlertController 
  ) {
    this.rentalForm = this.fb.group({
      gradeGroup: ['', Validators.required],  
      name: ['', Validators.required],
      matricula: ['', [Validators.required, Validators.pattern('^[0-9]+$')]], 
      rentalDate: ['', Validators.required],
      responsiblePerson: ['', Validators.required],
      returnDate: ['', Validators.required],
    });
  }

  async ngOnInit() {
    this.userEmail = sessionStorage.getItem('userEmail');
    if (this.userEmail) {
      console.log('Email del usuario:', this.userEmail);
      try {
        // Llamar a getUserByEmail para obtener la información del usuario
        this.userInfo = await this.authService.getUserByEmail(this.userEmail);
        console.log('Información del usuario:', this.userInfo);

        this.rentalForm.patchValue({
          matricula: this.userInfo.matricula || '', 
          gradeGroup: this.userInfo.gradoGrupo || '', 
          name: this.userInfo.name || '', 
        });  

      } catch (error) {
        console.error('Error al obtener la información del usuario:', error);
      }

    } else {
      console.log('No hay un email almacenado en sessionStorage.');
    }

    // Recupera los materiales solicitados desde sessionStorage
    const data = sessionStorage.getItem('rentalFormItems');
    if (data) {
      this.requestedItems = JSON.parse(data);
    }

    this.rentalForm.get('rentalDate')?.valueChanges.subscribe(date => {
      this.minReturnDate = date;
      const returnDate = this.rentalForm.get('returnDate')?.value;
      if (returnDate && returnDate < date) {
        this.rentalForm.get('returnDate')?.setValue('');
      }
    });

    const now = new Date();
    this.today = now.toISOString().split('T')[0];
  }

  onRentalDateChange() {
    const date = this.rentalForm.get('rentalDate')?.value;
    this.minReturnDate = date;
    const returnDate = this.rentalForm.get('returnDate')?.value;
    if (returnDate && returnDate < date) {
      this.rentalForm.get('returnDate')?.setValue('');
    }
  }

  selectMaterial(item: any) {
    this.selectedMaterial = item;
    this.rentalForm.patchValue({
      material: item.name,
    });
  }

  // Función auxiliar para obtener solo la parte de fecha (YYYY-MM-DD)
  toDateString(date: string): string {
    return new Date(date).toISOString().split('T')[0];
  }

  async onSubmit() {
    const rentalDate = this.rentalForm.value.rentalDate;
    const returnDate = this.rentalForm.value.returnDate;
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    // Validar que la fecha de inicio no sea antes de hoy
    if (!rentalDate || this.toDateString(rentalDate) < todayStr) {
      const alert = await this.alertController.create({
        header: 'Fecha inválida',
        message: 'La fecha de inicio no puede ser anterior a hoy.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    // Validar que la fecha de entrega no sea antes de la de inicio
    if (!returnDate || this.toDateString(returnDate) < this.toDateString(rentalDate)) {
      const alert = await this.alertController.create({
        header: 'Fecha inválida',
        message: 'La fecha de entrega no puede ser anterior a la fecha de inicio.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    if (this.rentalForm.valid) {
      try {
        console.log('Formulario enviado:', this.rentalForm.value);

        // Recorre los materiales solicitados y actualiza las cantidades en Firebase
        for (const requestedItem of this.requestedItems) {
          const materialRef = doc(this.firestore, `materials/${requestedItem.id}`);
          const materialSnapshot = await getDoc(materialRef);
          await this.rentalService.updateMaterialQuantity(requestedItem.name, requestedItem.quantity);
          console.log(`Cantidad actualizada para el material: ${requestedItem.name}`);
       
          if (materialSnapshot.exists()) {
            const materialData = materialSnapshot.data();
            const currentQuantity = materialData['quantity'];

            // Verifica que el campo 'quantity' exista y sea un número
            if (typeof currentQuantity !== 'number') {
              console.error(`Error: El campo "quantity" no es un número para el material ${requestedItem.name}.`);
              throw new Error(`El campo "quantity" no es un número para el material ${requestedItem.name}.`);
            }

            // Calcula la nueva cantidad
            const newQuantity = currentQuantity - requestedItem.quantity;

            // Verifica que la cantidad no sea negativa
            if (newQuantity < 0) {
              console.error(`Error: La cantidad solicitada de ${requestedItem.name} excede la cantidad disponible.`);
              throw new Error(`La cantidad solicitada de ${requestedItem.name} excede la cantidad disponible.`);
            }

            // Actualiza la cantidad en Firebase
            await this.rentalService.updateMaterialQuantity(requestedItem.name, requestedItem.quantity);
            console.log(`Cantidad actualizada para el material: ${requestedItem.name}`);
          } else {
            console.error(`El material ${requestedItem.name} no existe en Firebase.`);
          }
        }

        console.log('Todos los materiales han sido actualizados correctamente.');

        // Guarda el formulario en la colección 'rentals'
        const formData = {
          ...this.rentalForm.value,
          requestedItems: this.requestedItems,
          fechaRegistro: new Date().toISOString()
        };
        await this.rentalService.addRentalForm(formData);

        console.log('Formulario guardado en la colección rentals.');

        // Resetea el formulario después de enviarlo
        this.rentalForm.reset();
        this.requestedItems = [];
        sessionStorage.removeItem('requestedItems');
        sessionStorage.removeItem('rentalFormItems');
        sessionStorage.setItem('rentalSuccess', 'true');
        // Navega a Home y recarga la página
        this.router.navigate(['/home']).then(() => {
          window.location.reload();
        });
      } catch (error) {
        console.error('Error al actualizar las cantidades en Firebase o guardar el formulario:', error);
      }
    } else {
      console.error('El formulario no es válido.');
    }
  }

  async addRentalForm(formData: any) {
    const rentalsCollection = collection(this.firestore, 'rentals');
    return await addDoc(rentalsCollection, formData);
  }

}
