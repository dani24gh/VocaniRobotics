import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';  
import { RentalService } from '../rental.service'; // Asegúrate de que la ruta sea correcta
import { Firestore, doc, getDoc, updateDoc } from '@angular/fire/firestore';

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




  constructor(private fb: FormBuilder, private authService: AuthService, private rentalService: RentalService, private firestore: Firestore) {
    this.rentalForm = this.fb.group({
      gradeGroup: ['', Validators.required],  
      name: ['', Validators.required],
      matricula: ['', [Validators.required, Validators.pattern('^[0-9]+$')]], // Solo números
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
          matricula: this.userInfo.matricula || '', // Asegúrate de que el campo exista en la base de datos
          gradeGroup: this.userInfo.gradoGrupo || '', // Asegúrate de que el campo exista en la base de datos
          name: this.userInfo.name || '', // Asegúrate de que el campo exista en la base de datos
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
  }




  selectMaterial(item: any) {
    this.selectedMaterial = item;
    this.rentalForm.patchValue({
      material: item.name,
    });
  }




  async onSubmit() {
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

        // Resetea el formulario después de enviarlo
        this.rentalForm.reset();
        this.requestedItems = [];
      } catch (error) {
        console.error('Error al actualizar las cantidades en Firebase:', error);
      }
    } else {
      console.error('El formulario no es válido.');
    }
  }
}
