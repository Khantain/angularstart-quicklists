import { Component, EventEmitter, Output, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Checklist } from '../../shared/interfaces/ichecklist';

@Component({
  standalone: true,
  imports: [RouterLink],
  selector: 'app-checklist-header',
  template: `
    <header>
      <a routerLink="/home">Back</a>
      <h1> {{ checklist().title }} </h1>
      <div>
        <button (click)="addItem.emit()">Add item</button>
        <button (click)="reset.emit(checklist().id)">Reset</button>
      </div>
    </header>
  `,
})

export class ChecklistHeaderComponent {
  checklist = input.required<Checklist>();
  @Output() addItem = new EventEmitter<void>();
  @Output() reset = new EventEmitter<Checklist['id']>();
}