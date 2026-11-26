import { Component, input, output } from '@angular/core';
import { Task } from '../task';
import { required } from '@angular/forms/signals';
import { TooltipDirective } from '../../shared/ui/tooltip';
import { DatePipe, NgClass } from '@angular/common';
import { TaskDeadlinePipe } from '../task-deadline-pipe';
import { isDeadlineExpired } from '../task-deadline';

@Component({
  imports: [TooltipDirective, DatePipe, TaskDeadlinePipe, NgClass],
  selector: 'app-task-card',
  styleUrl: './task-card.scss',
  templateUrl: './task-card.html',
})
export class TaskCard {
  task = input.required<Task>();
  isSelected = input(false);
  toggled = output<Task>({ alias: 'toggle' });
  selected = output<Task>({ alias: 'select' });
  protected readonly isDeadlineExpired = isDeadlineExpired;

  toggle(event: Event) {
    event.stopPropagation();
    this.toggled.emit(this.task());
  }

  select() {
    this.selected.emit(this.task());
  }
}
