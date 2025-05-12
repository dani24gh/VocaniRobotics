import { Component } from '@angular/core';
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
})
export class RentalFormPage {
  rentalForm: FormGroup;
  selectedMaterial: any = null;
  userEmail: string | null = null;
  userInfo: any = null; // Variable para almacenar la información del usuario

  responsiblePersons: string[] = ['Alma Reynoso Álvarez', 'Felipe de Jesús Rocha Rodríguez', 'Paola Lisset Santollo Vargas'];


  constructor(private fb: FormBuilder, private authService: AuthService, private rentalService: RentalService) {
    this.rentalForm = this.fb.group({
      gradeGroup: ['', Validators.required],  
      name: ['', Validators.required],
      matricula: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],  // Validación solo números
      material: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
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
      // Guarda los datos del formulario en Firestore
      this.rentalService.addRentalForm(formData)
        .then(() => {
          console.log('Formulario guardado exitosamente');
          this.rentalForm.reset();
        })
        .catch(error => {
          console.error('Error al guardar en Firestore:', error);
        });
    }
  }
}
