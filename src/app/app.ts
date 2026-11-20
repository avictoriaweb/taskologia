import { Component, ElementRef, ViewChild } from '@angular/core';
import { Task } from './tasks/task';
import { FormsModule } from '@angular/forms';
import { TaskCard } from './tasks/task-card/task-card';
import { TaskDetails } from './tasks/task-details/task-details';

@Component({
  imports: [FormsModule, TaskCard, TaskDetails],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  @ViewChild('taskInput') taskInput!: ElementRef<HTMLInputElement>;
  taskTitle: string = '';
  selectedTask: Task | null = null;

  tasks: Task[] = [
    {
      id: 1,
      title: 'Изучить компоненты Angular',
      completed: true,
      description:
        'Разобраться с декораторами @Component, жизненным циклом, Input/Output и встроенным control flow (@if, @for).',
    },
    { id: 2, title: 'Разобраться с binding', completed: false, description: '' },
    {
      id: 3,
      title: 'Сделать первый мини-проект на Angular с тремя компонентами и двумя пайпами',
      completed: false,
      description:
        'Собрать небольшое приложение: несколько компонентов, общий state на уровне родителя, кастомные пайпы для форматирования данных',
    },
  ];

  toggleTask(task: Task) {
    task.completed = !task.completed;
  }

  addTask() {
    const title = this.taskTitle.trim();

    if (!title) {
      this.taskInput.nativeElement.focus();
      return;
    }

    this.tasks.push({
      id: this.tasks.length ? this.tasks.length + 1 : 1,
      title: title,
      completed: false,
      description: '',
    });

    this.taskTitle = '';
  }
  deleteTask(id: number) {
    if (this.selectedTask && this.selectedTask.id === id) {
      this.selectedTask = null;
    }
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  getActiveTasksCount(): number {
    return this.tasks.filter((task) => !task.completed).length;
  }

  /*clearTaskInput(inputElement: HTMLInputElement){
    this.taskTitle = '';
    inputElement.focus();
  }*/
  clearTaskInput() {
    this.taskTitle = '';
    this.taskInput.nativeElement.focus();
  }

  closeDetails() {
    this.selectedTask = null;
  }
  selectTask(task: Task) {
    this.selectedTask = task;
  }
}
