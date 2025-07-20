interface User {
  id: string;
  fullName: string;
  email: string;
  password: string;
  companyName: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  role: 'USER' | 'ADMIN';
  lastActivityDate: Date;
  createdAt: Date;
}
interface AuthCredentials {
  fullName: string
  email: string;
  password: string;
  companyName: string;
  
}