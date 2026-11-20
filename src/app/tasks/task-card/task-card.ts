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
@Input() isSelected: boolean = false;
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
  @Output()selected = new EventEmitter<Task>();

  toggle(event: Event) {
    event.stopPropagation();
    this.toggled.emit(this.task);
  }

  delete(event: Event) {
    event.stopPropagation();
    this.deleted.emit(this.task.id);
  }
  select(){
    this.selected.emit(this.task);
  }
}
