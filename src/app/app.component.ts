import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todo-app';
  welcome = 'Hola';
  tasks = [
    'Instalar angula',
    'Crear proyecto',
    'Crear componentes',
    'Crear servicio'
  ];



}
