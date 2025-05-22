import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, IonicModule, RouterModule, FormsModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  items: any[] = []; // Lista de materiales cargados desde Firebase
  filteredItems: any[] = []; // Lista filtrada para la barra de búsqueda
  requestedItems: any[] = []; // Lista de materiales solicitados

  constructor(
    private authService: AuthService,
    private router: Router,
    private firestore: Firestore,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    try {
      // Carga los materiales desde Firebase
      await this.loadMaterials();

      // Recupera los materiales solicitados desde sessionStorage
      const requestedItemsData = sessionStorage.getItem('requestedItems');
      if (requestedItemsData) {
        this.requestedItems = JSON.parse(requestedItemsData);
      }
    } catch (error) {
      console.error('Error al inicializar la página:', error);
    }
  }

  async loadMaterials() {
    try {
      const materialsCollection = collection(this.firestore, 'materials'); // Cambia 'materials' por el nombre de tu colección
      const materialsSnapshot = await getDocs(materialsCollection);
      this.items = materialsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      this.filteredItems = [...this.items]; // Inicializa la lista filtrada con todos los materiales
      console.log('Materiales cargados desde Firebase:', this.items);
    } catch (error) {
      console.error('Error al cargar los materiales desde Firebase:', error);
    }
  }

  filterItems(event: any) {
    const searchTerm = event.target.value ? event.target.value.toLowerCase() : '';
    if (searchTerm && searchTerm.trim() !== '') {
      this.filteredItems = this.items.filter(item =>
        item.name.toLowerCase().includes(searchTerm)
      );
    } else {
      this.filteredItems = [...this.items]; // Restaura la lista completa si no hay término de búsqueda
    }
    console.log('Filtrar ítems:', event.target.value);
  }

  goToDetail(item: any) {
    history.pushState(null, '', '/item-detail');
    sessionStorage.setItem('selectedItem', JSON.stringify(item));
    location.href = '/item-detail';
    console.log('Ir al detalle del ítem:', item);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    console.log('Sesión cerrada desde AuthService');
  }



  editQuantity(index: number) {
    const maxQuantity = this.items.find(item => item.name === this.requestedItems[index].name)?.quantity || 0;
    const newQuantity = prompt(`Ingresa la nueva cantidad (máximo ${maxQuantity}):`, this.requestedItems[index].quantity);

    if (newQuantity !== null && !isNaN(Number(newQuantity)) && Number(newQuantity) > 0 && Number(newQuantity) <= maxQuantity) {
      this.requestedItems[index].quantity = Number(newQuantity); // Actualiza la cantidad
      sessionStorage.setItem('requestedItems', JSON.stringify(this.requestedItems)); // Actualiza sessionStorage
    } else if (newQuantity !== null) {
      alert(`Cantidad no válida. Debe ser un número entre 1 y ${maxQuantity}.`);
    }
  }

  goToRentalForm() {
    sessionStorage.setItem('rentalFormItems', JSON.stringify(this.requestedItems));
    this.router.navigate(['/rental-form']);
  }

  removeItem(index: number) {
    // Elimina el material del arreglo requestedItems
    this.requestedItems.splice(index, 1);
  
    // Actualiza sessionStorage con la lista actualizada
    sessionStorage.setItem('requestedItems', JSON.stringify(this.requestedItems));
  
    console.log('Artículo eliminado. Lista actualizada:', this.requestedItems);
  }

  async addToRequestedItems(item: any) {
    if (item.quantity === 0) {
      const alert = await this.alertController.create({
        header: 'No disponible',
        message: `El material "${item.name}" no está disponible por el momento.`,
        buttons: ['OK']
      });
      await alert.present();
      return;
    }
    // Verifica si ya está en la lista
    const exists = this.requestedItems.some(req => req.id === item.id);
    if (!exists) {
      this.requestedItems.push({ ...item, quantity: 1 });
      sessionStorage.setItem('requestedItems', JSON.stringify(this.requestedItems));
    } else {
      const alert = await this.alertController.create({
        header: 'Ya agregado',
        message: `Ya has agregado "${item.name}" a tu lista de solicitud.`,
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  async handleItemClick(item: any) {
  if (item.quantity === 0) {
    const alert = await this.alertController.create({
      header: 'No disponible',
      message: `El material "${item.name}" no está disponible por el momento.`,
      buttons: ['OK']
    });
    await alert.present();
  } else {
    this.goToDetail(item);
  }
}
}
