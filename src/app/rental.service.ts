import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, CollectionReference, DocumentData, doc, updateDoc } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root',
})
export class RentalService {
  private rentalCollection: CollectionReference<DocumentData>;


  constructor(private firestore: Firestore) {
    this.rentalCollection = collection(this.firestore, 'rentalForms');
  }


  addRentalForm(formData: any) {
    const rentalsCollection = collection(this.firestore, 'rentals'); // Cambia 'rentals' por el nombre de tu colección
    return addDoc(rentalsCollection, formData);
  }


  updateMaterialQuantity(materialName: string, quantityToSubtract: number) {
    const materialRef = doc(this.firestore, `materials/${materialName}`); // Cambia 'materials' por el nombre de tu colección
    return updateDoc(materialRef, {
      quantity: (prevQuantity: number) => prevQuantity - quantityToSubtract,
    });
  }
}
