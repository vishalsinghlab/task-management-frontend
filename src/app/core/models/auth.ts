export interface AuthResponse {
  success: boolean;
  message: string;
  token: string;
  user: User;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  role: 'MANAGER' | 'TEAM_LEAD' | 'EMPLOYEE';
}
