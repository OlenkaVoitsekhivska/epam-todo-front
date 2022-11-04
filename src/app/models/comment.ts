export interface Comment {
  id: string;
  createdAt: Date | null;
  name: string | null;
  taskId: string;
}
