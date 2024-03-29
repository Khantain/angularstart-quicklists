import { RemoveChecklist } from './ichecklist';

export interface ChecklistItem {
  id: string;
  checklistId: string;
  title: string;
  checked: boolean;
}

export type AddChecklistItem = {
  item: Omit<ChecklistItem, 'id' | 'checked' | 'checklistId'>;
  checklistId: RemoveChecklist;
}
export type EditChecklistItem = {
  id: ChecklistItem['id'];
  data: AddChecklistItem['item'];
}
export type ToggleChecklistItem = ChecklistItem['id'];

export type RemoveChecklistItem = ChecklistItem['id'];