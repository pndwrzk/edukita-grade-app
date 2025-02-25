import { APIResponseInfo } from "@/types/global-types";

export type LoginResponse = APIResponseInfo & {
  data: DataToken | null;
};

export type RegisterResponse = APIResponseInfo & {
  data: {
    created_at: string;
    email: string;
    id: string;
    name: string;
    role: string;
    updated_at: string;
  } | null;
};

export type GradeResponse = APIResponseInfo & {
  data: Grade[] | null;
};

export type AssignmentsResponse = APIResponseInfo & {
  data: Assignments[] | null;
};

export type Grade = {
  content: string;
  created_at: string;
  subject: string;
  grade: {
    feedback: string;
    grade: number;
    teacher:{
      name: string;
      email: string
    }
  } | null;
  id: number;
  title: string;
  updated_at: string;
};

export type Assignments ={
  content: string;
  created_at: string;
  subject: string;
  grade: {
    feedback: string;
    grade: number;
  } | null;
  student:{
    name : string;
    email: string;
  }
  id: number;
  title: string;
  updated_at: string;
}

export type LoginRequestBody = {
  email: string;
  password: string;
};

export type RegisterRequestBody = {
  email: string;
  password: string;
  name: string;
  role: "student" | "teacher";
};


export type CreateAssignmentRequestBody = {
  title: string;
  content: string;
  subject: 'math' | 'english' ;
}

export type DataToken = {
  role_access: string;
  token_access: string;
  token_access_expired: number;
  token_refresh: string;
  token_refresh_expired: number;
};
