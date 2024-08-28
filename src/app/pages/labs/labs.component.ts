
import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-labs',
  standalone : true,
  imports: [ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrls: ['./labs.component.css']
})
export class LabsComponent {
  welcome = 'Bienvenido  a mi app de Angular';
  tasks = signal([
    'Instalar angular CLI',
    'Crear proyecto',
    'Crear componentes',
    'Crear servicio'
  ]);

  name = signal('steven');
  age = 17;
  disabled = true;
  img = 'https://w3schools.com/howto/img_avatar.png'

  person = signal({
    name: 'valeria',
    age: 19,
    avatar:  'https://w3schools.com/howto/img_avatar.png'
  });

  colorCtrl = new FormControl();
  widthCtrl = new FormControl(50, {
    nonNullable: true,
  });

  nameCtrl = new FormControl('Steven', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.minLength(3)
    ]
  });

  constructor(){
    this.colorCtrl.valueChanges.subscribe(value => {
      console.log(value);
    });
  }

  clickHandler(){
    alert('Hola');
  };

  changeHandler(event: Event){
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.name.set(newValue);
    console.log(newValue);
  };

  keydownHandler(event: KeyboardEvent){
    const input = event.target as HTMLInputElement;
    console.log(input.value);
  }

  changeAge(event: Event){
      const input = event.target as HTMLInputElement;
      const newValue = input.value;
      this.person.update(prevState =>{
        return{
          ...prevState,
          age : parseInt(newValue, 10)
        }
      });
    }

    changeName(event: Event){
      const input = event.target as HTMLInputElement;
      const newValue = input.value;
      this.person.update(prevState =>{
        return{
          ...prevState,
          name : newValue
        }
      });
    }

}
