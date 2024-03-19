import { Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChecklistService } from '../shared/data-access/checklist.service';
import { ChecklistItem } from '../shared/interfaces/checklist-item';
import { FormModalComponent } from '../shared/ui/modal/form-modal/form-modal.component';
import { ModalComponent } from '../shared/ui/modal/modal.component';
import { ChecklistItemService } from './data-access/checklist-item.service';
import { ChecklistHeaderComponent } from './ui/checklist-header.component';
import { ChecklistItemListComponent } from './ui/checklist-item-list.component';

@Component({
  standalone: true,
  selector: 'app-checklist',
  imports: [ChecklistHeaderComponent, ModalComponent, FormModalComponent, ChecklistItemListComponent],
  templateUrl: './checklist.component.html',
})
export default class ChecklistComponent {
  checklistService = inject(ChecklistService);
  checklistItemService = inject(ChecklistItemService);

  route = inject(ActivatedRoute);

  params = toSignal(this.route.paramMap);

  formBuilder = inject(FormBuilder);

  checklistItemBeingEdited = signal<Partial<ChecklistItem> | null>(null);

  checklist = computed(() => this.checklistService.checklists().find(c => c.id === this.params()?.get('id')));
  items = computed(() => this.checklistItemService.checklistItems().filter((item) => item.checklistId === this.params()?.get('id')));

  checklistItemForm = this.formBuilder.nonNullable.group({
    title: [''],
  });

  constructor() {
    effect(() => {
      const checklistItem = this.checklistItemBeingEdited();

      if (!checklistItem) {
        this.checklistItemForm.reset();
      }
    });
  }
}