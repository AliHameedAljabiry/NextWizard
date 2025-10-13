interface User {
  id: string;
  fullName: string;
  username: string;
  email: string;
  password: string;
  companyName: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  role: 'USER' | 'ADMIN';
  lastActivityDate: Date;
  createdAt: Date;
  image?: string;
}
interface AuthCredentials {
  fullName: string
  email: string;
  password: string;
  companyName: string;
  
}

interface Step {
  id: string;
  category: string;
  categoryDescription: string
  categorySlug: string
  part: string
  slug: string
  title: string;
  description: string;
  order: number
  code?: string;
  resources?: string; 
  createdAt: Date;
}


interface Project {
  id: string;
  title: string; 
  description: string;
  imageUrl?: string;
  videoUrl?: string;
  githubUrl?: string;
  createdAt: Date;
  isFree?: string;
  author: string;
  authorImageUrl?: string;
  publishDate: Date;
}


