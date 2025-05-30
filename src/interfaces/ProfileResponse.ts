export interface ProfileResponse {
  userData: UserData;
  studentData?: StudentData;
}

export interface UserData {
  id: string;
  documentId: string;
  firstname: string;
  lastname: string;
  age: number;
  gender: string;
  email: string;
  phoneNumber: string;
  imageUrl: string;
  role: string;
}

export interface StudentData {
  id: string;
  level: string;
  grade: number;
  section: string;
}