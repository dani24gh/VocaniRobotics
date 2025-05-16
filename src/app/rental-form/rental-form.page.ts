import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';  
import { RentalService } from '../rental.service'; // Asegúrate de que la ruta sea correcta


@Component({
  standalone: true,
  selector: 'app-rental-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule],
  templateUrl: './rental-form.page.html',
  styleUrls: ['./rental-form.page.scss'],
})
export class RentalFormPage implements OnInit {
  rentalForm: FormGroup;
  selectedMaterial: any = null;
  userEmail: string | null = null;
  userInfo: any = null; // Variable para almacenar la información del usuario
  requestedItems: any[] = []; // Arreglo para almacenar los materiales solicitados


  constructor(private fb: FormBuilder, private authService: AuthService, private rentalService: RentalService) {
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


  onSubmit() {
    if (this.rentalForm.valid) {
      const formData = this.rentalForm.value;
      formData.requestedItems = this.requestedItems; // Agrega los materiales solicitados al formulario


      console.log('Formulario enviado:', formData);


      // Guarda los datos en Firestore
      this.rentalService.addRentalForm(formData)
        .then(() => {
          console.log('Formulario guardado exitosamente en Firestore.');


          // Actualiza las cantidades disponibles de los materiales
          this.requestedItems.forEach(item => {
            this.rentalService.updateMaterialQuantity(item.name, item.quantity)
              .then(() => {
                console.log(`Cantidad actualizada para el material: ${item.name}`);
              })
              .catch(error => {
                console.error(`Error al actualizar la cantidad para el material ${item.name}:`, error);
              });
          });


          // Resetea el formulario después de enviarlo
          this.rentalForm.reset();
          this.requestedItems = [];
        })
        .catch(error => {
          console.error('Error al guardar en Firestore:', error);
        });
    } else {
      console.error('El formulario no es válido.');
    }
  }
}


