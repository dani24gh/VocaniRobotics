import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, doc, updateDoc } from '@angular/fire/firestore';
import { getDocs, query, where } from 'firebase/firestore';


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
  // updateMaterialQuantity(materialName: string, quantityToSubtract: number) {
  //   console.log('Actualizando cantidad de material:', materialName, 'Cantidad a restar:', quantityToSubtract);
  //   const materialRef = doc(this.firestore, `materials/${materialName}`); // Cambia 'materials' por el nombre de tu colección
  //   return updateDoc(materialRef, {
  //     quantity: (prevQuantity: number) => prevQuantity - quantityToSubtract,
  //   });
  // }

   // Método para actualizar la cantidad disponible de un material basado en su nombre
   async updateMaterialQuantity(materialName: string, quantityToSubtract: number) {
    console.log('Actualizando cantidad de material:', materialName, 'Cantidad a restar:', quantityToSubtract);

    // Busca el documento en la colección 'materials' que coincida con el nombre
    const materialsCollection = collection(this.firestore, 'materials');
    const q = query(materialsCollection, where('name', '==', materialName));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Obtén el primer documento que coincida
      const materialDoc = querySnapshot.docs[0];
      const materialRef = doc(this.firestore, `materials/${materialDoc.id}`);
      const materialData = materialDoc.data();
  // Verifica que el campo 'quantity' exista y sea un número
      if (typeof materialData['quantity'] !== 'number') {
        throw new Error(`El campo "quantity" no es un número para el material ${materialName}.`);
      }

      // Calcula la nueva cantidad
      const newQuantity = materialData['quantity'] - quantityToSubtract;

      // Verifica que la cantidad no sea negativa
      if (newQuantity < 0) {
        throw new Error(`La cantidad solicitada de ${materialName} excede la cantidad disponible.`);
      }

      // Actualiza la cantidad en Firebase
      await updateDoc(materialRef, { quantity: newQuantity });
      console.log(`Cantidad actualizada para el material: ${materialName}, Nueva cantidad: ${newQuantity}`);
    } else {

      throw new Error(`El material con nombre "${materialName}" no existe en Firebase.`);
    }
    
  }
}

