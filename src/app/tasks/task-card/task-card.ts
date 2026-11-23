import { Component, input, output } from '@angular/core';
import { Task } from '../task';
import { required } from '@angular/forms/signals';

@Component({
  imports: [],
  selector: 'app-task-card',
  styleUrl: './task-card.scss',
  templateUrl: './task-card.html',
})
export class TaskCard {
  task = input.required<Task>();
  isSelected = input(false);
  toggled = output<Task>({alias: "toggle" });
  deleted = output<number>({alias: "delete"});
  selected = output<Task>({alias: "select" });

  toggle(event: Event) {
    event.stopPropagation();
    this.toggled.emit(this.task());
  }

  delete(event: Event) {
    event.stopPropagation();
    this.deleted.emit(this.task().id);
  }

  select() {
    this.selected.emit(this.task());
  }
}
