import { Component, input } from '@angular/core';
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
    </header>
  `,
})

export class ChecklistHeaderComponent {
  checklist = input.required<Checklist>();
}