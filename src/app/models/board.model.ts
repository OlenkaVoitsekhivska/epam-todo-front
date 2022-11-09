import { Task } from './task.model';

export interface Board {
  id: string;
  createdAt: Date | null;
  name: string | null;
  userId: string;
  description: string;
  tasks: Partial<Task[]>;
  uiPreferences: {
    col1: string;
    col2: string;
    col3: string;
  };
}

export interface UpdateColor {
  col1: string;
  col2: string;
  col3: string;
}
