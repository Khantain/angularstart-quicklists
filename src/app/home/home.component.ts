import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ChecklistService } from '../shared/data-access/checklist.service';
import { Checklist } from '../shared/interfaces/ichecklist';
import { FormModalComponent } from '../shared/ui/modal/form-modal/form-modal.component';
import { ModalComponent } from '../shared/ui/modal/modal.component';
import { ChecklistListComponent } from './ui/checklist-list/checklist-list.component';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [ModalComponent, FormModalComponent, ChecklistListComponent],
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
          (save)="checklistBeingEdited()?.id ? checklistService.edit$.next({
              id: checklistBeingEdited()!.id!,
              data: checklistForm.getRawValue()
            })
          : checklistService.add$.next(checklistForm.getRawValue())"
        />
      </ng-template>
    </app-modal>

    <section>
      <h2>Your checklists</h2>
      <app-checklist-list 
        [checklists]="checklistService.checklists()"         
        (delete)="checklistService.remove$.next($event)"
        (edit)="checklistBeingEdited.set($event)"
      />
    </section>
  `,
})
export default class HomeComponent {
  checklistBeingEdited = signal<Partial<Checklist> | null>(null);
  formBuilder = inject(FormBuilder);
  checklistService = inject(ChecklistService);
  checklistForm = this.formBuilder.nonNullable.group({
    title: [''],
  });

  constructor() {
    effect(() => {
      const checklist = this.checklistBeingEdited();

      if (!checklist) {
        this.checklistForm.reset();
      } else {
        this.checklistForm.patchValue({
          title: checklist.title,
        });
      }
    });
  }
}
