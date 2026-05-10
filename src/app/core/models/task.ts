export interface Task {
  _id: string;

  title: string;

  description: string;

  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

  createdBy: {
    _id: string;
    username: string;
    email: string;
    role: string;
  };

  assignedTo: {
    _id: string;
    username: string;
    email: string;
    role: string;
  };

  createdAt: string;

  updatedAt: string;
}
