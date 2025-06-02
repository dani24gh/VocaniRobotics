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

    // Para rentalDate
    this.rentalForm.get('rentalDate')?.valueChanges.subscribe(date => {
      if (date && date.length >= 4) {
        const [year, month = '01', day = '01'] = date.split('-');
        if (year !== '2025' || year.length > 4) {
          // Corrige el año a 2025 y mantiene mes/día si existen
          const fixedDate = `2025-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
          this.rentalForm.get('rentalDate')?.setValue(fixedDate, { emitEvent: false });
        }
      }
      this.minReturnDate = this.rentalForm.get('rentalDate')?.value;
      const returnDate = this.rentalForm.get('returnDate')?.value;
      if (returnDate && returnDate < this.minReturnDate) {
        this.rentalForm.get('returnDate')?.setValue('');
      }
    });

    // Para returnDate
    this.rentalForm.get('returnDate')?.valueChanges.subscribe(date => {
      if (date && date.length >= 4) {
        const [year, month = '01', day = '01'] = date.split('-');
        if (year !== '2025' || year.length > 4) {
          const fixedDate = `2025-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
          this.rentalForm.get('returnDate')?.setValue(fixedDate, { emitEvent: false });
        }
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

  private isYearValid(dateStr: string): boolean {
    if (!dateStr) return false;
    const year = Number(dateStr.split('-')[0]);
    // Solo permite 2025 y que el año tenga 4 dígitos
    return year === 2025 && dateStr.split('-')[0].length === 4;
  }

  async onSubmit() {
    const rentalDate = this.rentalForm.value.rentalDate;
    const returnDate = this.rentalForm.value.returnDate;
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    // Validar que la fecha de inicio no sea antes de hoy
    if (
      !rentalDate ||
      this.toDateString(rentalDate) < todayStr ||
      !this.isYearValid(rentalDate)
    ) {
      const alert = await this.alertController.create({
        header: 'Fecha inválida',
        message: 'La fecha de inicio no puede ser anterior a hoy.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    // Validar que la fecha de entrega no sea antes de la de inicio
    if (
      !returnDate ||
      this.toDateString(returnDate) < this.toDateString(rentalDate) ||
      !this.isYearValid(returnDate)
    ) {
      const alert = await this.alertController.create({
        header: 'Fecha inválida',
        message: 'La fecha de entrega no puede ser anterior a la fecha de inicio y el año debe ser 2025 (4 dígitos).',
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
          // Solo actualiza la cantidad usando tu servicio
          await this.rentalService.updateMaterialQuantity(requestedItem.name, requestedItem.quantity);
          console.log(`Cantidad actualizada para el material: ${requestedItem.name}`);
          // Elimina cualquier otra lógica que reste o actualice la cantidad aquí
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
