import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Checklist } from '../../../shared/interfaces/ichecklist';

@Component({
  standalone: true,
  selector: 'app-checklist-list',
  imports: [RouterLink],
  templateUrl: './checklist-list.component.html',
})
export class ChecklistListComponent {
  @Input({ required: true }) checklists!: Checklist[];
}