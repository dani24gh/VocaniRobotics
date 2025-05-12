import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, IonicModule, RouterModule, FormsModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  items = [
    { name: 'Arduino Mega2560 R3', quantity: 3, description: 'Microcontrolador potente para proyectos complejos.', image: 'assets/arduino.jpeg' },
    { name: 'Módulo SiM- mod. SINB00L', quantity: 5, description: 'Permite comunicación GSM/GPRS.', image: 'assets/2.jpeg' },
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
  filteredItems = [...this.items]; // Inicialmente, mostrar todos los elementos
  requestedItem: any = null;
  requestedItems: any[] = []; // Arreglo para almacenar los materiales solicitados

  constructor(private authService: AuthService, private router: Router, ) {console.log('Items iniciales:', this.items); // Depuración
  }
  
  ngOnInit() {
    // Recupera el material solicitado desde sessionStorage
    const data = sessionStorage.getItem('requestedItem');
    if (data) {
      this.requestedItem = JSON.parse(data);
    }
    // Recupera el arreglo de materiales solicitados desde sessionStorage
    const requestedItemsData = sessionStorage.getItem('requestedItems');
    if (requestedItemsData) {
      this.requestedItems = JSON.parse(requestedItemsData);
    }
  }

  filterItems(event: any) {
    const searchTerm = event.target.value ? event.target.value.toLowerCase() : '';
    console.log('Término de búsqueda:', searchTerm); // Depuración
    if (searchTerm && searchTerm.trim() !== '') {
      this.filteredItems = this.items.filter(item =>
        item.name.toLowerCase().includes(searchTerm)
      );
    } else {
      this.filteredItems = [...this.items]; // Restaurar la lista completa si no hay término de búsqueda
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
    console.log('Cerrar sesión');
  }

  // Método para eliminar un material de la lista
  removeItem(index: number) {
    this.requestedItems.splice(index, 1); // Elimina el material del arreglo
    sessionStorage.setItem('requestedItems', JSON.stringify(this.requestedItems)); // Actualiza sessionStorage
  }

  // Método para editar la cantidad de un material
  editQuantity(index: number) {
    const maxQuantity = this.items.find(item => item.name === this.requestedItems[index].name)?.quantity || 0; // Obtiene la cantidad máxima disponible
    const newQuantity = prompt(`Ingresa la nueva cantidad (máximo ${maxQuantity}):`, this.requestedItems[index].quantity);

    if (newQuantity !== null && !isNaN(Number(newQuantity)) && Number(newQuantity) > 0 && Number(newQuantity) <= maxQuantity) {
      this.requestedItems[index].quantity = Number(newQuantity); // Actualiza la cantidad
      sessionStorage.setItem('requestedItems', JSON.stringify(this.requestedItems)); // Actualiza sessionStorage
    } else if (newQuantity !== null) {
      alert(`Cantidad no válida. Debe ser un número entre 1 y ${maxQuantity}.`);
    }
  }

  // Método para ir a rental-form y guardar los datos
  goToRentalForm() {
    // Guarda los datos en sessionStorage
    sessionStorage.setItem('rentalFormItems', JSON.stringify(this.requestedItems));
    // Redirige a la página rental-form
    this.router.navigate(['/rental-form']);
  }
}
