import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Checklist, RemoveChecklist } from '../../../shared/interfaces/ichecklist';

@Component({
  standalone: true,
  selector: 'app-checklist-list',
  imports: [RouterLink],
  templateUrl: './checklist-list.component.html',
})
export class ChecklistListComponent {
  @Input({ required: true }) checklists!: Checklist[];
  @Output() delete = new EventEmitter<RemoveChecklist>();
  @Output() edit = new EventEmitter<Checklist>();
}