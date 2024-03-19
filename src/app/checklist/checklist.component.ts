import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ChecklistService } from '../shared/data-access/checklist.service';
import { ChecklistHeaderComponent } from './ui/checklist-header.component';

@Component({
  standalone: true,
  selector: 'app-checklist',
  imports: [ChecklistHeaderComponent],
  templateUrl: './checklist.component.html',
})
export default class ChecklistComponent {
  checklistService = inject(ChecklistService);
  route = inject(ActivatedRoute);

  params = toSignal(this.route.paramMap);

  checklist = computed(() => this.checklistService.checklists().find(c => c.id === this.params()?.get('id')));
}