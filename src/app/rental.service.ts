import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, CollectionReference, DocumentData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  private rentalCollection: CollectionReference<DocumentData>;

  constructor(private firestore: Firestore) {
    this.rentalCollection = collection(this.firestore, 'rentalForms');
  }

  addRentalForm(data: any) {
    return addDoc(this.rentalCollection, data);
  }
}
