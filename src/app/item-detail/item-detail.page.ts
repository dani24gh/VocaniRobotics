import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-item-detail',
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './item-detail.page.html',
})
export class ItemDetailPage {
  @Input() item: any;
  requestedQuantity: number | null = 1;

  constructor(private modalCtrl: ModalController) {}

  validateQuantity(event: any) {
    let value = parseInt(event.target.value, 10);

    if (isNaN(value)) {
      this.requestedQuantity = null;
    } else if (value > this.item.quantity) {
      this.requestedQuantity = this.item.quantity;
      event.target.value = this.item.quantity;
    } else if (value < 1) {
      this.requestedQuantity = 1;
      event.target.value = 1;
    } else {
      this.requestedQuantity = value;
    }
  }

  isValidQuantity(): boolean {
    return this.requestedQuantity !== null && this.requestedQuantity > 0 && this.requestedQuantity <= this.item.quantity;
  }

  confirmRequest() {
    if (this.isValidQuantity()) {
      this.modalCtrl.dismiss({ item: this.item, quantity: this.requestedQuantity });
    }
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
