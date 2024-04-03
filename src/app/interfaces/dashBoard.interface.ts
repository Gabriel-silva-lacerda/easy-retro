export interface Board {
  id?: string;
  projectName: string;
  date: Date;
}

export interface Card extends Omit<Board, 'projectName'> {
  taskName?: string;
  boardId: string | undefined;
  notes: Notes[];
}

export interface Notes {
  id?: string | undefined;
  content: string;
  cardId?: string | undefined;
  likes: number;
  background: string;
}
