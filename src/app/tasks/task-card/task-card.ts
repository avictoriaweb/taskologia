import { Component, input, output } from '@angular/core';
import { Task } from '../task';
import { required } from '@angular/forms/signals';
import { TooltipDirective } from '../../shared/ui/tooltip';
import { DatePipe } from '@angular/common';
import { TaskDeadlinePipe } from '../task-deadline-pipe';

@Component({
  imports: [TooltipDirective, DatePipe, TaskDeadlinePipe],
  selector: 'app-task-card',
  styleUrl: './task-card.scss',
  templateUrl: './task-card.html',
})
export class TaskCard {
  task = input.required<Task>();
  isSelected = input(false);
  toggled = output<Task>({ alias: 'toggle' });
  selected = output<Task>({ alias: 'select' });

  toggle(event: Event) {
    event.stopPropagation();
    this.toggled.emit(this.task());
  }

  select() {
    this.selected.emit(this.task());
  }
}
