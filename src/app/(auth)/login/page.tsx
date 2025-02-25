"use client";

import { login } from "@/services/grade-service";
import { StoreCookie } from "@/utils/configCookie";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { LoginRequestBody } from "@/types/grade-types";
import { useState } from "react";
import {Loading} from "@/components/loading";
import Link from "next/link";
import { InputField } from "@/components/form/inputField";
import {FormAlert} from "@/components/formAlert";
import { showAlert } from "@/components/alert";

export default function Login() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm<LoginRequestBody>({ mode: "onSubmit" });

  const onSubmit = async (formValues: LoginRequestBody) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const result = await login(formValues);

      if (result?.data) {
         showAlert(result.message,result.data != null)
        StoreCookie(result.data);
        result?.data.role_access === "student" ? router.push("/grades") : router.push("/assignments");
        reset();
      } else {
        setErrorMessage(result?.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseError = () => setErrorMessage("");

  return (
    <div className="from-[#4F59F6] to-[#6A75F8]  flex h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-md rounded-md p-8">
          <HeaderSection />
          {errorMessage && <FormAlert message={errorMessage} onClose={handleCloseError} />}
          <LoginForm
            register={register}
            errors={errors}
            isLoading={isLoading}
            onSubmit={handleSubmit(onSubmit)}
          />
        </div>
      </div>
    </div>
  );
}

function HeaderSection() {
  return (
    <>
      <h1 className="text-center text-md font-bold text-gray-900">GRADE-APP</h1>
      <h2 className="mt-4 text-center text-3xl font-bold text-gray-900">
        Sign in to your account
      </h2>
    </>
  );
}



function LoginForm({
  register,
  errors,
  isLoading,
  onSubmit,
}: {
  readonly register: any;
  readonly errors: any;
  readonly isLoading: boolean;
  readonly onSubmit: () => void;
}) {
  return (
    <form className="space-y-6 mt-4" onSubmit={onSubmit}>
      <InputField
        id="email"
        label="Email"
        type="email"
        register={register("email", { required: "Email is required" })}
        error={errors.email?.message}
      />

      <InputField
        id="password"
        label="Password"
        type="password"
        register={register("password", { required: "Password is required" })}
        error={errors.password?.message}
      />

      <button
        type="submit"
        className="flex w-full justify-center rounded-md bg-[#31EEC4]  py-2 px-4 text-sm font-medium text-black hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
        disabled={isLoading}
      >
        {isLoading ? <Loading /> : "Login"}
      </button>

      <div className="text-center mt-4">
        <p className="text-xs text-gray-700">
          Don&apos;t have an account?
          <Link href="/register" className="ml-2 text-blue-500 font-semibold">
            Register now
          </Link>
        </p>
      </div>
    </form>
  );
}
