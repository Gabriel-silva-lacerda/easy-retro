export interface DashBoard {
  id?: string;
  projectName: string;
  date: Date;
}

export interface PublicBoard extends Omit<DashBoard, 'projectName'> {
  taskName?: string;
  boardId: string | undefined;
}

export interface Notes {
  id?: string | undefined;
  content: string;
  cardId?: string | undefined;
  likes: number;
  isActive?: boolean;
  background: string;
}
