"use client";

import { register as regis } from "@/services/grade-service";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { RegisterRequestBody } from "@/types/grade-types";
import { useState } from "react";
import {Loading} from "@/components/loading";
import Link from "next/link";
import { InputField } from "@/components/form/inputField";
import { LIST_ROLE } from "@/app/constanst/role";
import { SelectField } from "@/components/form/selectField";
import {FormAlert} from "@/components/formAlert";
import {showAlert} from "@/components/alert";

export default function Register() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<RegisterRequestBody>({ mode: "onSubmit" });

  const onSubmit = async (formValues: RegisterRequestBody) => {
    setIsLoading(true);
    try {
      const result = await regis(formValues);
      if (!result.data) {
        setErrorMessage(result.message);
      } else {
        showAlert(result.message,result.data!= null)
        router.push("/login");
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="from-[#4F59F6] to-[#6A75F8] flex h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-md rounded-md p-8">
          <h1 className="text-center text-md font-bold text-gray-900">GRADE-APP</h1>
          <h2 className="mt-2 text-center text-3xl font-bold text-gray-900">
            Sign up to your account
          </h2>

          {errorMessage && (
            <FormAlert message={errorMessage} onClose={() => setErrorMessage("")} />
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
            <InputField
              id="name"
              label="Name"
              type="text"
              register={register("name", { required: "Name is required" })}
              error={errors.name?.message}
            />

            <InputField
              id="email"
              label="Email"
              type="email"
              register={register("email", { required: "Email is required" })}
              error={errors.email?.message}
            />

            <SelectField
              id="role"
              label="Role"
              options={LIST_ROLE}
              register={register("role", { required: "Role is required" })}
              error={errors.role?.message}
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
              className="flex w-full justify-center rounded-md bg-[#31EEC4] py-2 px-4 text-black shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400"
              disabled={isLoading}
            >
              {isLoading ? <Loading /> : "Register"}
            </button>
          </form>

          <div className="flex justify-center items-center mt-4">
            <p className="text-gray-700 text-xs">
              Already have an account?
              <Link href="/login" className="ml-2 text-blue-500 font-semibold">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
