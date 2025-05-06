import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-item-detail',
  imports: [CommonModule, IonicModule, RouterModule],
  templateUrl: './item-detail.page.html',
})
export class ItemDetailPage implements OnInit {
  item: any = {};

  ngOnInit() {
    const data = sessionStorage.getItem('selectedItem');
    if (data) {
      this.item = JSON.parse(data);
    }
  }

  goToForm() {
    location.href = '/rental-form';
  }
}
