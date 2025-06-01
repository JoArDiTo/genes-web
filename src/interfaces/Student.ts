export interface StudentResponse {
  user: User
  student: Student
}

interface User {
  id: string;
  documentId: string;
  firstname: string;
  lastname: string;
  age: number;
  gender: string;
  email: string;
  phoneNumber: string;
  imageUrl: string;
}

interface Student {
  id: string;
  level: string;
  grade: number;
  section: string;
}