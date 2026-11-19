import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../task';
import { required } from '@angular/forms/signals';

@Component({
  imports: [],
  selector: 'app-task-card',
  styleUrl: './task-card.scss',
  templateUrl: './task-card.html',
})
export class TaskCard {
  @Input({required:true}) task!: Task;

  /*private _task!: Task;
  @Input({required: true})
  get task() {
    return this._task;
  }
  set task(param: Task) {
    param.title=param.title.toUpperCase();
    this._task = param;
  }*/

  @Output()toggled = new EventEmitter<Task>();
  @Output()deleted = new EventEmitter<number>();

  toggle() {
    this.toggled.emit(this.task);
  }

  delete() {
    this.deleted.emit(this.task.id);
  }
}
