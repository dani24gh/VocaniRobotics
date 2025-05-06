import { Component } from '@angular/core';
<<<<<<< HEAD
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
=======
import { IonicModule } from '@ionic/angular';  
import { FormsModule } from '@angular/forms';  
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
>>>>>>> 16c97e797d77247e94d6c0007c33cbdba63b38fc

@Component({
  standalone: true,
  selector: 'app-home',
<<<<<<< HEAD
  imports: [CommonModule, IonicModule, RouterModule],
  templateUrl: './home.page.html',
=======
  standalone: true, 
  imports: [IonicModule, FormsModule],  
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
>>>>>>> 16c97e797d77247e94d6c0007c33cbdba63b38fc
})


export class HomePage {
<<<<<<< HEAD
  items = [
    { name: 'Arduino Mega2560 R3', quantity: 3, description: 'Microcontrolador potente para proyectos complejos.', image: 'assets/mega2560.jpg' },
    { name: 'Módulo SiM- mod. SINB00L', quantity: 5, description: 'Permite comunicación GSM/GPRS.', image: 'assets/sim-module.jpg' },
    { name: 'Capacitores electrolíticos 100uF y 10 uF', quantity: 10, description: 'Capacitores para uso general.', image: 'assets/capacitors.jpg' },
    { name: 'Circuito integrado: Controladores de matriz MAX7219CNG', quantity: 8, description: 'Controlador para matrices de LEDs.', image: 'assets/max7219.jpg' },
    { name: 'Circuito integrado: Puentes H L2930', quantity: 6, description: 'Control de motores DC.', image: 'assets/l2930.jpg' },
    { name: 'Circuito Integrado: Registro de desplazamiento de serial a paralelo SN74HCS95', quantity: 4, description: 'Registro de desplazamiento.', image: 'assets/sn74hcs95.jpg' },
    { name: 'Diodos rectificadores', quantity: 15, description: 'Diodos para rectificación de corriente.', image: 'assets/diodes.jpg' },
    { name: 'Displays cuádruples', quantity: 7, description: 'Displays de 7 segmentos cuádruples.', image: 'assets/displays.jpg' },
    { name: 'ESP32', quantity: 4, description: 'Módulo Wi-Fi y Bluetooth para IoT.', image: 'assets/esp32.jpg' },
    { name: 'Galga Extensiométrica', quantity: 12, description: 'Sensor para medición de deformaciones.', image: 'assets/strain-gauge.jpg' },
    { name: 'Hélices plásticas flexibles para servomotores', quantity: 10, description: 'Hélices para servomotores.', image: 'assets/propellers.jpg' },
    { name: 'Led\'s (varios colores)', quantity: 50, description: 'Diodos emisores de luz (varios colores).', image: 'assets/leds.jpg' },
    { name: 'Matriz de led Sx3/modulo MAX7219', quantity: 5, description: 'Módulo para controlar matrices de LEDs.', image: 'assets/led-matrix.jpg' },
    { name: 'Módulo adaptador/fuente de voltaje para protoboard', quantity: 20, description: 'Fuente de alimentación para protoboard.', image: 'assets/power-supply.jpg' },
    { name: 'Módulo controlador para servos PCA9685', quantity: 6, description: 'Controlador para hasta 16 servos.', image: 'assets/pca9685.jpg' },
    { name: 'Módulo Lector RFID RG522 con tarjeta', quantity: 10, description: 'Módulo lector RFID.', image: 'assets/rfid.jpg' },
    { name: 'Módulo relevador 1QC 3FF-S-2 SV (Arduino)', quantity: 8, description: 'Relé para controlar dispositivos de alto voltaje.', image: 'assets/relay.jpg' },
    { name: 'Módulo Sensor TCRTS000 TRACKER SENSOR Seguidor de línea infrarrojo', quantity: 6, description: 'Sensor para seguimiento de línea.', image: 'assets/line-tracker.jpg' },
    { name: 'Módulo sensor de voz', quantity: 4, description: 'Sensor para detección de sonidos.', image: 'assets/voice-sensor.jpg' },
    { name: 'Módulo ZS-042 Reloj en tiempo real', quantity: 5, description: 'Módulo RTC para seguimiento de tiempo.', image: 'assets/rtc.jpg' },
    { name: 'Módulo Shield 1293 Puente H Para Motores DC Servos Arduino', quantity: 8, description: 'Control de motores DC y servos.', image: 'assets/h-bridge.jpg' },
    { name: 'Protoshield Arduino Mega', quantity: 5, description: 'Placa base para montar proyectos con Arduino Mega.', image: 'assets/protoshield.jpg' },
    { name: 'Push button Switch pulsador de 2 pines normalmente abierto', quantity: 10, description: 'Botón pulsador para proyectos.', image: 'assets/push-button.jpg' },
    { name: 'Resistencias variadas', quantity: 100, description: 'Resistencias de diferentes valores.', image: 'assets/resistors.jpg' },
    { name: 'Sensor de color TCS230', quantity: 3, description: 'Sensor de color.', image: 'assets/color-sensor.jpg' },
    { name: 'Sensor de humedad capacitivo', quantity: 7, description: 'Sensor de humedad para suelos.', image: 'assets/humidity-sensor.jpg' },
    { name: 'Sensor de humedad y temperatura TH11', quantity: 5, description: 'Sensor de humedad y temperatura.', image: 'assets/dht11.jpg' },
    { name: 'Sensores Flex 26k (Arduino)', quantity: 6, description: 'Sensor de flexión para proyectos Arduino.', image: 'assets/flex-sensor.jpg' },
    { name: 'Sensor Nivel de agua resistivo', quantity: 5, description: 'Sensor para medir el nivel de agua.', image: 'assets/water-level.jpg' },
    { name: 'Sensor PIR (HC.SR501)', quantity: 10, description: 'Sensor de movimiento PIR.', image: 'assets/pir-sensor.jpg' },
    { name: 'Sensor Ultrasónico', quantity: 8, description: 'Sensor ultrasónico para medición de distancia.', image: 'assets/ultrasonic-sensor.jpg' },
    { name: 'Servo - Mod. TowerProMG995', quantity: 6, description: 'Servomotor de alta torque.', image: 'assets/servo-motor.jpg' },
    { name: 'Termistores', quantity: 20, description: 'Sensor de temperatura basado en resistencia.', image: 'assets/thermistor.jpg' },
    { name: 'Teclado matricial de membrana', quantity: 4, description: 'Teclado para proyectos interactivos.', image: 'assets/matrix-keyboard.jpg' },
    { name: 'Transistor BC547', quantity: 30, description: 'Transistor NPN.', image: 'assets/bc547.jpg' },
    { name: 'Transistor BC557', quantity: 30, description: 'Transistor PNP.', image: 'assets/bc557.jpg' },
    { name: 'Transistores PN2222', quantity: 25, description: 'Transistor NPN para conmutación.', image: 'assets/pn2222.jpg' },
    { name: 'Tarjeta extensora de puertos y motores goos', quantity: 3, description: 'Tarjeta expansora para puertos.', image: 'assets/expansion-board.jpg' },
    { name: 'Servomotor ESOBA', quantity: 4, description: 'Servomotor de alto rendimiento.', image: 'assets/esoba-servo.jpg' },
    { name: 'Soil humidity sensor', quantity: 5, description: 'Sensor de humedad para suelos.', image: 'assets/soil-humidity.jpg' },
    { name: 'Conectores', quantity: 50, description: 'Conectores varios para proyectos.', image: 'assets/connectors.jpg' },
    { name: 'Rain sensor', quantity: 6, description: 'Sensor para medir lluvia.', image: 'assets/rain-sensor.jpg' },
    { name: 'Temperature sensor', quantity: 10, description: 'Sensor de temperatura.', image: 'assets/temperature-sensor.jpg' },
    { name: 'Wafer Terminal block', quantity: 5, description: 'Bloques de terminales para conexiones.', image: 'assets/terminal-block.jpg' },
    { name: 'Botón', quantity: 30, description: 'Botones de uso general.', image: 'assets/button.jpg' },
    { name: 'Motorreductores', quantity: 8, description: 'Motores con reductor para proyectos.', image: 'assets/gearmotor.jpg' },
    { name: 'Control Paroto', quantity: 2, description: 'Controlador para servomotores.', image: 'assets/servo-controller.jpg' },
    { name: 'Leds', quantity: 100, description: 'Leds varios para proyectos.', image: 'assets/leds-various.jpg' },
    { name: 'Ruedas', quantity: 10, description: 'Ruedas para proyectos móviles.', image: 'assets/wheels.jpg' },
    { name: 'Cautines c/base', quantity: 3, description: 'Cautines con base para soldar.', image: 'assets/soldering-iron.jpg' },
    { name: 'Cutter Trupper', quantity: 5, description: 'Cutter para cortes de precisión.', image: 'assets/cutter.jpg' },
    { name: 'Desoldador de succión', quantity: 5, description: 'Herramienta para desoldar componentes.', image: 'assets/desoldering.jpg' },
    { name: 'Flexómetro Ultra', quantity: 3, description: 'Flexómetro para medición.', image: 'assets/measurement-tape.jpg' },
    { name: 'Kit desarmadores de precisión 27', quantity: 3, description: 'Kit de desarmadores de precisión.', image: 'assets/screwdrivers.jpg' },
    { name: 'Kit desarmadores Trupper', quantity: 5, description: 'Kit de desarmadores para electrónica.', image: 'assets/trupper-screwdrivers.jpg' },
    { name: 'Kit limas joyero', quantity: 3, description: 'Kit de limas de joyero.', image: 'assets/jeweler-file-kit.jpg' },
    { name: 'Mini-martillo Pretul', quantity: 4, description: 'Mini martillo para trabajos de precisión.', image: 'assets/mini-hammer.jpg' },
    { name: 'Mini-Mototool', quantity: 2, description: 'Herramienta multifuncional mini.', image: 'assets/mototool.jpg' },
    { name: 'Multímetro', quantity: 6, description: 'Multímetro digital para mediciones.', image: 'assets/multimeter.jpg' },
    { name: 'Pie de rey (calibrador)', quantity: 5, description: 'Calibrador para mediciones precisas.', image: 'assets/caliper.jpg' },
    { name: 'Pinzas de corte', quantity: 10, description: 'Pinzas para cortar cables.', image: 'assets/cutting-pliers.jpg' },
    { name: 'Pinzas planas', quantity: 8, description: 'Pinzas planas para electrónica.', image: 'assets/flat-pliers.jpg' },
    { name: 'Pistolas silicón', quantity: 4, description: 'Pistolas para aplicar silicón.', image: 'assets/glue-gun.jpg' },
    { name: 'Segueta con sierra', quantity: 5, description: 'Segueta para corte de precisión.', image: 'assets/saw.jpg' },
    { name: 'Soportes escuadra de metal', quantity: 6, description: 'Soportes metálicos para estructuras.', image: 'assets/metal-bracket.jpg' },
    { name: 'Pelacables', quantity: 12, description: 'Herramienta para pelar cables.', image: 'assets/wire-strippers.jpg' },
    { name: 'Brocha p/pintura acrílica', quantity: 5, description: 'Brochas para pintura acrílica.', image: 'assets/paint-brush.jpg' },
    { name: 'Cables varios (trozos)', quantity: 50, description: 'Cables de diferentes tipos y longitudes.', image: 'assets/cables.jpg' },
    { name: 'Cincho mini', quantity: 20, description: 'Cinchos pequeños para atar cables.', image: 'assets/zip-tie.jpg' },
    { name: 'Lentes de seguridad', quantity: 10, description: 'Lentes para protección ocular.', image: 'assets/safety-glasses.jpg' },
    { name: 'Limpiador WD40 (Afloja-todo)', quantity: 5, description: 'Lubricante y limpiador WD40.', image: 'assets/wd40.jpg' },
    { name: 'Papel lija para madera', quantity: 10, description: 'Papel lija para acabado de madera.', image: 'assets/sandpaper.jpg' },
    { name: 'Cincho chico', quantity: 20, description: 'Cinchos pequeños para atar cables.', image: 'assets/zip-tie-small.jpg' },
    { name: 'Cincho mediano', quantity: 20, description: 'Cinchos medianos para atar cables.', image: 'assets/zip-tie-medium.jpg' },
    { name: 'Pato de madera largos cortos', quantity: 4, description: 'Pato de madera para fijar piezas.', image: 'assets/wooden-clamps.jpg' },
    { name: 'Cincho grande', quantity: 10, description: 'Cinchos grandes para atar cables.', image: 'assets/zip-tie-large.jpg' },
    { name: 'Pegamento blanco Resistol 850', quantity: 5, description: 'Pegamento blanco para madera.', image: 'assets/resistol-glue.jpg' },
    { name: 'Cinta adhesiva Diurex', quantity: 15, description: 'Cinta adhesiva para uso general.', image: 'assets/adhesive-tape.jpg' },
    { name: 'Pegamento Kola-Loka industrial', quantity: 3, description: 'Pegamento industrial Kola-Loka.', image: 'assets/kola-loka-glue.jpg' },
    { name: 'Cinta aislante (negro, azul, blanco)', quantity: 10, description: 'Cinta aislante en varios colores.', image: 'assets/electrical-tape.jpg' },
    { name: 'Pegamento Pritt stick: adhesivo', quantity: 10, description: 'Pegamento en barra Pritt.', image: 'assets/pritt-glue-stick.jpg' },
    { name: 'Cinta canela', quantity: 8, description: 'Cinta adhesiva de color canela.', image: 'assets/cinnamon-tape.jpg' },
    { name: 'Pilas alcalinas AA', quantity: 50, description: 'Pilas alcalinas tipo AA.', image: 'assets/aa-batteries.jpg' },
    { name: 'Cinta de doble cara', quantity: 15, description: 'Cinta adhesiva de doble cara.', image: 'assets/double-sided-tape.jpg' },
    { name: 'Pilas recargables 9V', quantity: 5, description: 'Pilas recargables 9V.', image: 'assets/rechargeable-9v.jpg' },
    { name: 'Cinta masking tape', quantity: 12, description: 'Cinta masking para enmascarar.', image: 'assets/masking-tape.jpg' },
    { name: 'Pilas recargables AA', quantity: 20, description: 'Pilas recargables tipo AA.', image: 'assets/rechargeable-aa.jpg' },
    { name: 'Cinta para ductos (gris)', quantity: 10, description: 'Cinta gris para ductos.', image: 'assets/duct-tape.jpg' },
    { name: 'Pintura acrílica', quantity: 6, description: 'Pintura acrílica para proyectos.', image: 'assets/acrylic-paint.jpg' },
    { name: 'Colas de pato', quantity: 10, description: 'Colas de pato para proyectos.', image: 'assets/duck-tape.jpg' },
    { name: 'Silicón en barras', quantity: 8, description: 'Silicón en barra para uso general.', image: 'assets/silicone-bar.jpg' },
    { name: 'Silicón frío', quantity: 5, description: 'Silicón frío para pegar.', image: 'assets/cold-silicone.jpg' },
    { name: 'Ligas No. 10 (chica)', quantity: 30, description: 'Ligas pequeñas para proyectos.', image: 'assets/rubber-bands.jpg' },
    { name: 'Tijeras', quantity: 5, description: 'Tijeras para cortar materiales.', image: 'assets/scissors.jpg' },
    { name: 'Ligas No. 18 (grande)', quantity: 20, description: 'Ligas grandes para proyectos.', image: 'assets/rubber-bands-large.jpg' },
    { name: 'Varios', quantity: 100, description: 'Varios elementos para proyectos.', image: 'assets/various.jpg' },
    { name: 'Láminas de Acrílico, MDF, Cascado de huevo para corte', quantity: 5, description: 'Materiales para corte.', image: 'assets/acrylic-mdf.jpg' },
    { name: 'Velcro en cuadros', quantity: 30, description: 'Velcro para sujeción.', image: 'assets/velcro.jpg' },
    { name: 'Filamento para impresión 3D', quantity: 3, description: 'Filamento para impresora 3D.', image: 'assets/3d-filament.jpg' }
  ];

  constructor() {}

  goToDetail(item: any) {
    history.pushState(null, '', '/item-detail');
    sessionStorage.setItem('selectedItem', JSON.stringify(item));
    location.href = '/item-detail';
  }
=======

  constructor(private authService: AuthService, private router:Router){}

  quantityMega2560: number = 10;
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
  quantityTecladoMatricial = 0;
  quantityTransistorBC547 = 0;
  quantityTransistorBC557 = 0;
  quantityTransistorPN2222 = 0;
  quantityTarjetaExtensora = 0;
  quantityServomotorESOBA = 0;
  quantitySoilHumiditySensor = 0;
  quantityConectores = 0;
  quantityRainSensor = 0;
  quantityTemperatureSensor = 0;
  quantityWaferTerminalBlock = 0;
  quantityBoton = 0;
  quantityMotorreductores = 0;
  quantityControlParoto = 0;
  quantityLeds = 0;
  quantityRuedas = 0;
  quantityCautinesBase = 0;
  quantityCutterTrupper = 0;
  quantityDesoldadorSuccion = 0;
  quantityFlexometroUltra = 0;
  quantityKitDesarmadores27 = 0;
  quantityKitDesarmadoresTrupper = 0;
  quantityKitLimasJoyero = 0;
  quantityMiniMartilloPretul = 0;
  quantityMiniMototool = 0;
  quantityMultimetro = 0;
  quantityPieRey = 0;
  quantityPinzasCorte = 0;
  quantityPinzasPlanas = 0;
  quantityPistolasSilicon = 0;
  quantitySeguetaSierra = 0;
  quantitySoportesEscuadra = 0;
  quantityPelacables = 0;
  quantityBrochaPintura = 0;
  quantityCablesVarios = 0;
  quantityCinchoMini = 0;
  quantityLentesSeguridad = 0;
  quantityLimpiadorWD40 = 0;
  quantityPapelLijaMadera = 0;
  quantityCinchoChico = 0;
  quantityCinchoMediano = 0;
  quantityPatoMadera = 0;
  quantityCinchoGrande = 0;
  quantityPegamentoBlanco = 0;
  quantityCintaAdhesivaDiurex = 0;
  quantityPegamentoKolaLoka = 0;
  quantityCintaAislante = 0;
  quantityPegamentoPrittStick = 0;
  quantityCintaCanela = 0;
  quantityPilasAlcalinasAA = 0;
  quantityCintaDobleCara = 0;
  quantityPilasRecargables9V = 0;
  quantityCintaMaskingTape = 0;
  quantityPilasRecargablesAA = 0;
  quantityCintaParaDuctos = 0;
  quantityPinturaAcrilica = 0;
  quantityColasDePato = 0;
  quantitySiliconBarras = 0;
  quantitySiliconFrio = 0;
  quantityLigas10Chica = 0;
  quantityTijeras = 0;
  quantityLigas18Grande = 0;
  quantityVarios = 0;
  quantityLaminasAcrylico = 0;
  quantityVelcroCuadros = 0;
  quantityFilamento3D = 0;

  logout() {
    this.authService.logout(); 
    this.router.navigate(['/login']);
    console.log('Sesión cerrada desde AuthService');
  }

>>>>>>> 16c97e797d77247e94d6c0007c33cbdba63b38fc
}
