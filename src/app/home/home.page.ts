import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';  // Asegúrate de importar IonicModule
import { FormsModule } from '@angular/forms';  // Importar FormsModule para usar ngModel

@Component({
  selector: 'app-home',
  standalone: true,  // Definir que el componente es standalone
  imports: [IonicModule, FormsModule],  // Importamos IonicModule y FormsModule
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  quantityMega2560: number = 0;
  quantitySimModule: number = 0;
  quantityCapacitors: number = 0;
  quantityMAX7219: number = 0;
  quantityL2930: number = 0;
  quantitySN74HCS95: number = 0;
  quantityDiodes: number = 0;
  quantityDisplays: number = 0;
  quantityESP32: number = 0;
  quantityGalga: number = 0;
  quantityHelices: number = 0;
  quantityLEDs: number = 0;
  quantityLedMatrix: number = 0;
  quantityAdapter: number = 0;
  quantityPCA9685: number = 0;
  quantityRFID: number = 0;
  quantityRelay: number = 0;
  quantitySensorLine: number = 0;
  quantityVoiceSensor: number = 0;
  quantityRTC: number = 0;
  quantityShield: number = 0;
  quantityProtoshield: number = 0;
  quantityPushButton: number = 0;
  quantityResistances: number = 0;
  quantityColorSensor: number = 0;
  quantityCapacitiveHumidity: number = 0;
  quantityTH11: number = 0;
  quantityFlexSensors: number = 0;
  quantityWaterLevel: number = 0;
  quantityPIR: number = 0;
  quantityUltrasonic: number = 0;
  quantityServo: number = 0;
  quantityThermistors: number = 0;
}
