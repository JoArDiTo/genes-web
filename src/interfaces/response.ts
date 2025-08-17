export interface Response<T> {
  message: string;
  result?: T;
  results?: T[];
  status?: number;
}

export interface LoginResponse {
  token: string;
}

export interface ProfileResponse {
  user: UserDataResponse;
  person: PersonDataResponse;
  academic: AcademicDataResponse;
}

export interface UserDataResponse {
  id: number;
  uuid: string;
  email: string;
  role: string;
  imageUrl: string | null;
  available: boolean;
}

export interface PersonDataResponse {
  id: number;
  firstName: string;
  paternalSurname: string;
  maternalSurname: string;
  documentType: string;
  documentNumber: string;
  gender: string;
  birthDate: string;
  address: string;
  phoneNumber: string | null;
}

export interface AcademicDataResponse {
  id: number;
  level: string;
  grade: number;
  section: string;
}
