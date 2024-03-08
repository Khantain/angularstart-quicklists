import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Checklist } from '../shared/interfaces/ichecklist';
import { FormModalComponent } from '../shared/ui/modal/form-modal/form-modal.component';
import { ModalComponent } from '../shared/ui/modal/modal.component';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [ModalComponent, FormModalComponent],
  template: ` 
    <header>
      <h1>Quicklists</h1>
      <button (click)="checklistBeingEdited.set({})">Add Checklist</button>
    </header>

    <app-modal [isOpen]="!!checklistBeingEdited()">
      <ng-template>
        <app-form-modal
          [title]="checklistBeingEdited()?.title || 'Add Checklist'"
          [formGroup]="checklistForm"
          (close)="checklistBeingEdited.set(null)"
        />
      </ng-template>
    </app-modal>
  `,
})
export default class HomeComponent {
  checklistBeingEdited = signal<Partial<Checklist> | null>(null);
  formBuilder = inject(FormBuilder);
  checklistForm = this.formBuilder.nonNullable.group({
    title: [''],
  });

  constructor() {
    effect(() => {
      if (!this.checklistBeingEdited()) {
        this.checklistForm.reset();
      }
    });
  }
}
