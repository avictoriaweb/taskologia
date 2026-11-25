import { Component, computed, effect, ElementRef, signal, ViewChild } from '@angular/core';
import { Task } from './tasks/task';
import { FormsModule } from '@angular/forms';
import { TaskCard } from './tasks/task-card/task-card';
import { TaskDetails } from './tasks/task-details/task-details';
import { TooltipDirective } from './shared/ui/tooltip';
import { ShowIfValueDirective } from './shared/ui/show-if-value';

type TaskDraft = {
  title: string;
  description: string;
};

@Component({
  imports: [FormsModule, TaskCard, TaskDetails, TooltipDirective, ShowIfValueDirective],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  @ViewChild('taskInput') taskInput!: ElementRef<HTMLInputElement>;
  @ViewChild(TaskDetails) taskDetails?: TaskDetails;

  private readonly taskDraftStorageKey = 'taskologia-task-draft';

  taskTitle = signal('');
  selectedTask = signal<Task | null>(null);

  tasks = signal<Task[]>([
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
  ]);

  taskDescription = signal('');

  activeTasksCount = computed(() => this.tasks().filter((task) => !task.completed).length);

  constructor() {
    const savedDraft = localStorage.getItem(this.taskDraftStorageKey);
    if (savedDraft) {
      const draft: TaskDraft = JSON.parse(savedDraft);
      this.taskTitle.set(draft.title || '');
      this.taskDescription.set(draft.description || '');
    }

    effect(() => {
      const draft: TaskDraft = {
        title: this.taskTitle(),
        description: this.taskDescription(),
      };
      localStorage.setItem(this.taskDraftStorageKey, JSON.stringify(draft));
    });
  }

  toggleTask(taskToToggle: Task) {
    this.tasks.update((tasks) =>
      tasks.map((task) =>
        task.id === taskToToggle.id ? { ...task, completed: !task.completed } : task,
      ),
    );
    if (this.selectedTask()?.id === taskToToggle.id) {
      this.selectedTask.set(this.tasks().find((task) => task.id === taskToToggle.id) || null);
    }
  }

  addTask() {
    const title = this.taskTitle().trim();
    const description = this.taskDescription().trim();

    if (!title) {
      this.taskInput.nativeElement.focus();
      return;
    }

    const tasks = this.tasks();
    const lastTask = tasks[tasks.length - 1];

    const newTask: Task = {
      id: lastTask ? lastTask.id + 1 : 1,
      title: title,
      completed: false,
      description: description,
    };

    this.tasks.update((currentTasks) => [...currentTasks, newTask]);

    this.taskTitle.set('');
    this.taskDescription.set('');
  }

  deleteTask(id: number) {
    if (this.selectedTask()?.id === id) {
      this.selectedTask.set(null);
    }
    this.tasks.update((tasks) => tasks.filter((task) => task.id !== id));
  }

  /*
    getActiveTasksCount(): number {
      return this.tasks().filter((task) => !task.completed).length;
    }*/

  /*clearTaskInput(inputElement: HTMLInputElement){
    this.taskTitle = '';
    inputElement.focus();
  }*/
  clearTaskInput() {
    this.taskTitle.set('');
    this.taskInput.nativeElement.focus();
  }

  closeDetails() {
    this.selectedTask.set(null);
  }

  selectTask(task: Task) {
    if (this.selectedTask()?.id === task.id) {
      this.taskDetails?.highlightPanel();
    } else {
      this.selectedTask.set(task);
    }
  }
}
