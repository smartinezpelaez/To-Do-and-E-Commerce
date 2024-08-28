import { Component, computed, effect, inject, Injector, signal } from '@angular/core';
import {Task} from './../../models/task.models';
import { JsonPipe } from '@angular/common';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone : true,
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  tasks = signal<Task[]>([]);

  filter = signal<'all' | 'pending' | 'completed'>('all');

  taskByFilter = computed(()=>{
    const filter = this.filter();
    const tasks = this.tasks();
    if(filter === 'pending'){
      return tasks.filter(task => !task.completed);
    }
    if(filter === 'completed'){
      return tasks.filter(task => task.completed);
    }
    return tasks;

  })

  newTaskCtrl = new FormControl('', {
    nonNullable : true,
    validators: [
      Validators.required,
    ]
  });

//Cuando no utilizamos el effect en el constructor toca inyectarlo
injector = inject(Injector);

  constructor(){
  }

  //Ciclo de vida de angular
  ngOnInit(){
    const storage = localStorage.getItem('tasks');
    if (storage) {
      const tasks = JSON.parse(storage);
      this.tasks.set(tasks);
    }
    this.trackTask();
  }

  //aca ulilizamos el injector por qu usamos el effect
  trackTask(){
    effect(()=>{
      const tasks = this.tasks();
      console.log(tasks);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }, { injector: this.injector});
  }

  changeHandler(){
    if (this.newTaskCtrl.valid && this.newTaskCtrl.value.trim().length > 3){
      const value = this.newTaskCtrl.value.trim();
      if(value !== ''){
        this.addTask(value);
      this.newTaskCtrl.setValue('');
      }

    }

  }

  addTask(title: string){
    const newTask = {
      id: Date.now(),
      title,
      completed: false
    };
    this.tasks.update((tasks)=> [...tasks, newTask]);
  }

  deleteTask(index: number){
    this.tasks.update((tasks) => tasks.filter((task, position) => position !== index));
  }

  updateTask(index: number){
    this.tasks.update((tasks)=>{
      return tasks.map((task, position)=>{
        if (position === index){
          return{
            ...task,
            completed: !task.completed
          }
        }
        return task;
      })
    })
  }

  public updateTaskEditingMode(index: number) {
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        task.editing = false;
        if (position === index) {
          return {
            ...task,
            editing: true
          };
        }
        return {
          ...task,
          editing: false
        };
      });
    });
  }

  public updateTaskTest(index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        task.editing = false;
        if (position === index) {
          return {
            ...task,
            title: input.value,
            editing: false
          }
        }
        return task;
      });
    });
  }

  changeFilter(filter: 'all' | 'pending' | 'completed'){
    this.filter.set(filter);
  }

}
