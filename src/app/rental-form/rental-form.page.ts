import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-rental-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule],  // Asegúrate de importar ReactiveFormsModule
  templateUrl: './rental-form.page.html',
})
export class RentalFormPage {
  rentalForm: FormGroup;
  selectedMaterial: any = null;

  constructor(private fb: FormBuilder) {
    this.rentalForm = this.fb.group({
      grade: ['', Validators.required],
      group: ['', Validators.required],
      name: ['', Validators.required],
      matricula: ['', Validators.required],
      material: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      rentalDate: ['', Validators.required],
      responsiblePerson: ['', Validators.required],
      returnDate: ['', Validators.required],
    });
  }

  ngOnInit() {}

  selectMaterial(item: any) {
    this.selectedMaterial = item;
    this.rentalForm.patchValue({
      material: item.name,
    });
  }

  onSubmit() {
    if (this.rentalForm.valid) {
      console.log(this.rentalForm.value);
      // Aquí puedes manejar el envío del formulario
    }
  }
}
