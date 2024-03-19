import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject } from 'rxjs';
import { StorageService } from '../../shared/data-access/storage.service';
import { AddChecklistItem, ChecklistItem, ToggleChecklistItem } from "../../shared/interfaces/checklist-item";
import { Checklist } from '../../shared/interfaces/ichecklist';

export interface ChecklistItemsState {
  checklistItems: ChecklistItem[];
  loaded: boolean;
}

@Injectable({ providedIn: 'root' })
export class ChecklistItemService {
  private state = signal<ChecklistItemsState>({
    checklistItems: [],
    loaded: false,
  });

  private storageService = inject(StorageService);

  checklistItems = computed(() => this.state().checklistItems);
  loaded = computed(() => this.state().loaded);

  add$ = new Subject<AddChecklistItem>();

  toggle$ = new Subject<ToggleChecklistItem>();

  resetAll$ = new Subject<Checklist['id']>();
  private checklistItemsLoaded$ = this.storageService.loadChecklistItems();

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
    this.checklistItemsLoaded$.pipe(takeUntilDestroyed()).subscribe((checklistItems) =>
      this.state.update((state) => ({
        ...state,
        checklistItems,
        loaded: true,
      }))
    );

    effect(() => {
      if (this.loaded()) {
        this.storageService.saveChecklistItems(this.checklistItems());
      }
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