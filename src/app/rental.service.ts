import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, doc, updateDoc } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root',
})
export class RentalService {
  constructor(private firestore: Firestore) {}


  // Método para guardar el formulario en Firestore
  addRentalForm(formData: any) {
    const rentalsCollection = collection(this.firestore, 'rentals'); // Cambia 'rentals' por el nombre de tu colección
    return addDoc(rentalsCollection, formData);
  }


  // Método para actualizar la cantidad disponible de un material
  updateMaterialQuantity(materialName: string, quantityToSubtract: number) {
    const materialRef = doc(this.firestore, `materials/${materialName}`); // Cambia 'materials' por el nombre de tu colección
    return updateDoc(materialRef, {
      quantity: (prevQuantity: number) => prevQuantity - quantityToSubtract,
    });
  }
}


