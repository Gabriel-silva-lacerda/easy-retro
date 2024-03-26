export interface DashBoard {
  id?: string;
  projectName: string;
  taskName: string;
  date: Date;
}

export interface PublicBoard extends Omit<DashBoard, 'projectName'> {
  id_card: string;
}

export interface Notes {
  id?: string | undefined;
  content: string;
  id_card?: string | undefined;
  likes: number;
  isActive?: boolean;
  background: string;
}
