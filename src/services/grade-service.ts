import {
  LoginRequestBody,
  RegisterRequestBody,
  LoginResponse,
  RegisterResponse,
  GradeResponse,
  AssignmentsResponse,
  CreateAssignmentRequestBody,
} from "@/types/grade-types";

import { axiosConfig } from "@/utils/axiosConfig";
import axios from "axios";

const resolver = axiosConfig();

export async function login(
  bodyRequest: LoginRequestBody
): Promise<LoginResponse> {
  try {
    const response = await axios.post<LoginResponse>(
      `${process.env.NEXT_PUBLIC_GRADE_SERVICE}/auth/login`,
      bodyRequest
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    } else {
      return {
        message: "unknown error",
        data: null,
      };
    }
  }
}

export async function register(
  bodyRequest: RegisterRequestBody
): Promise<RegisterResponse> {
  try {
    const response = await axios.post<RegisterResponse>(
      `${process.env.NEXT_PUBLIC_GRADE_SERVICE}/auth/register`,
      bodyRequest
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    } else {
      return {
        message: "unknown error",
        data: null,
      };
    }
  }
}

export async function getGrades(): Promise<GradeResponse> {
  try {
    const response = await resolver.get<GradeResponse>("/grades");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    } else {
      return {
        message: "unknown error",
        data: null,
      };
    }
  }
}

export async function getAssignments(filterSubject: string): Promise<AssignmentsResponse> {
  try {
    const response = await resolver.get<AssignmentsResponse>(`/assignments?subject=${filterSubject}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    } else {
      return {
        message: "unknown error",
        data: null,
      };
    }
  }
}
export async function createAssignments(bodyRequest:CreateAssignmentRequestBody): Promise<AssignmentsResponse> {
  try {
    const response = await resolver.post<AssignmentsResponse>("/assignments",bodyRequest);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    } else {
      return {
        message: "unknown error",
        data: null,
      };
    }
  }
}
