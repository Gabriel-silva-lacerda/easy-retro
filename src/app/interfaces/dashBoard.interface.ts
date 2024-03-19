export interface dashBoard {
  id?: string;
  projectName: string;
  taskName: string;
  date: Date;
  notes: Note[];
}

export interface publicBoard extends Omit<dashBoard, 'projectName'> {
  id_card: string;
  notes: Note[];
}

interface Note {
  content: string;
}
