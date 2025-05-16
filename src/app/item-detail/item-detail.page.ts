import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router'; // Importa Router
import { FormsModule } from '@angular/forms';


@Component({
  standalone: true,
  selector: 'app-item-detail',
  imports: [CommonModule, IonicModule, RouterModule, FormsModule],
  templateUrl: './item-detail.page.html',
})
export class ItemDetailPage implements OnInit {
  item: any = {};
  requestedQuantity: number | null = 1;


  constructor(private router: Router) {} // Inyecta el servicio Router


  ngOnInit() {
    const data = sessionStorage.getItem('selectedItem');
    if (data) {
      this.item = JSON.parse(data);
    }
  }


  validateQuantity(event: any) {
    let value = parseInt(event.target.value, 10);


    if (isNaN(value)) {
      // Si el valor no es un número, permite que el campo esté vacío temporalmente
      this.requestedQuantity = null;
    } else if (value > this.item.quantity) {
      // Si el valor excede la cantidad máxima, ajusta al máximo permitido
      this.requestedQuantity = this.item.quantity;
      event.target.value = this.item.quantity; // Actualiza el valor en el campo de entrada
    } else if (value < 1) {
      // Si el valor es menor que 1, ajusta al mínimo permitido
      this.requestedQuantity = 1;
      event.target.value = 1; // Actualiza el valor en el campo de entrada
    } else {
      // Si el valor es válido, actualiza la cantidad solicitada
      this.requestedQuantity = value;
    }
  }


  isValidQuantity(): boolean {
    return this.requestedQuantity !== null && this.item.quantity !== null && this.requestedQuantity > 0 && this.requestedQuantity <= this.item.quantity;
  }


  goToForm() {
    if (this.isValidQuantity()) {
      console.log(`Cantidad solicitada: ${this.requestedQuantity}`);
      location.href = '/rental-form';
    } else {
      console.error('Cantidad no válida');
    }
  }


  goToHome() {
    if (this.isValidQuantity()) {
      console.log(`Cantidad solicitada: ${this.requestedQuantity}`);
     
      // Recupera el arreglo actual de materiales solicitados desde sessionStorage
      const existingItems = JSON.parse(sessionStorage.getItem('requestedItems') || '[]');
     
      // Verifica si el material ya existe en la lista
      const existingItemIndex = existingItems.findIndex((item: { name: any; }) => item.name === this.item.name);
      if (existingItemIndex !== -1) {
        // Si ya existe, calcula la nueva cantidad total
        const newQuantity = existingItems[existingItemIndex].quantity + this.requestedQuantity;
       
        // Ajusta la cantidad al máximo permitido si se excede
        if (newQuantity > this.item.quantity) {
          existingItems[existingItemIndex].quantity = this.item.quantity;
        } else {
          existingItems[existingItemIndex].quantity = newQuantity;
        }
      } else {
        // Si no existe, agrégalo como un nuevo material
        existingItems.push({
          name: this.item.name,
          quantity: this.requestedQuantity
        });
      }
     
      // Guarda el arreglo actualizado en sessionStorage
      sessionStorage.setItem('requestedItems', JSON.stringify(existingItems));
     
      // Redirige al Home
      this.router.navigate(['/home']);
    } else {
      console.error('Cantidad no válida');
    }
  }
}


