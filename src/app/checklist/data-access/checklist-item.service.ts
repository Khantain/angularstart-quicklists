import { Injectable, computed, signal } from '@angular/core';
import { AddChecklistItem, ChecklistItem, ToggleChecklistItem } from "../../shared/interfaces/checklist-item";
import { Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Checklist } from '../../shared/interfaces/ichecklist';

export interface ChecklistItemsState {
  checklistItems: ChecklistItem[];
}

@Injectable({ providedIn: 'root' })
export class ChecklistItemService {
  private state = signal<ChecklistItemsState>({
    checklistItems: [],
  });

  checklistItems = computed(() => this.state().checklistItems);

  add$ = new Subject<AddChecklistItem>();

  toggle$ = new Subject<ToggleChecklistItem>();

  resetAll$ = new Subject<Checklist['id']>();

  constructor() {
    this.add$.pipe(takeUntilDestroyed()).subscribe((checklistItem) => {
      this.state.update((state) => ({
        ...state,
        checklistItems: [...state.checklistItems, this.getNewChecklistItem(checklistItem)],
      }));
    });

    this.toggle$.pipe(takeUntilDestroyed()).subscribe((id) => {
      this.state.update((state) => ({
        ...state,
        checklistItems: state.checklistItems.map((item) => item.id === id ? { ...item, checked: !item.checked } : item),
      }));
    });

    this.resetAll$.pipe(takeUntilDestroyed()).subscribe((checklistId) => {
      this.state.update((state) => ({
        ...state,
        checklistItems: state.checklistItems.map((item) => item.checklistId === checklistId ? { ...item, checked: false } : item),
      }));
    });
  }

  private getNewChecklistItem(checklistItem: AddChecklistItem): ChecklistItem {
    return {
      ...checklistItem.item,
      id: Date.now().toString(),
      checklistId: checklistItem.checklistId,
      checked: false,
    }
  }
}