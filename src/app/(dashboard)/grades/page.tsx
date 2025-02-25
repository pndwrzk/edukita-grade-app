"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Grade } from "@/types/grade-types";
import { getGrades, createAssignments } from "@/services/grade-service";
import Loading from "@/components/loading";

interface FormData {
  title: string;
  subject: "math" | "english";
  content: string;
}

export default function Grades() {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    fetchGrades();
  }, []);

  const fetchGrades = async (): Promise<void> => {
    const result = await getGrades();
    if (result.data) {
      setGrades(result.data);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    reset();
  };

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    const result = await createAssignments(data);
    if (result.data) {
      await fetchGrades();
    }
    toggleModal();
    setIsLoading(false);
  };

  return (
    <>
      <div className="container mx-auto p-6">
        <div className='flex justify-between'>
          <div>
            <button
              type="button"
              className="py-2 px-4 mb-5 max-w-md flex justify-center items-center bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
              onClick={toggleModal}
            >
              Add New Assignment
            </button>
          </div>
          <div>
          
          </div>
        </div>

        <div className="overflow-x-auto rounded-sm shadow">
          <table className="w-full border-black text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-white border-y dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Subject
                </th>
                <th scope="col" className="px-6 py-3">
                  Content
                </th>
                <th scope="col" className="px-6 py-3">
                  Created At
                </th>
                <th scope="col" className="px-6 py-3">
                  Teacher
                </th>
                <th scope="col" className="px-6 py-3">
                  Grade
                </th>
                <th scope="col" className="px-6 py-3">
                  Feedback
                </th>
              </tr>
            </thead>

            <tbody>
              {grades.map((grade) => (
                <tr key={grade.id} className="bg-white">
                  <td className="px-6 py-4">{grade.title}</td>
                  <td className="px-6 py-4">{grade.subject}</td>
                  <td className="px-6 py-4">{grade.content}</td>
                  <td className="px-6 py-4">{grade.created_at}</td>
                  <td className="px-6 py-4">
                    {grade.grade
                      ? `${grade.grade.teacher.name} (${grade.grade.teacher.email})`
                      : "-"}
                  </td>
                  <td className="px-6 py-4">
                    {grade.grade ? grade.grade.grade : "-"}
                  </td>
                  <td className="px-6 py-4">
                    {grade.grade ? grade.grade.feedback : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="text-black fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full transform transition-all duration-300 scale-95 animate-fade-in">
            <h2 className="text-xl font-semibold mb-4">New Assignment</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  {...register("title", { required: "Title is required" })}
                  className="mt-1 p-2 w-full border rounded-lg focus:ring-2 focus:ring-gray-500"
                />
                {errors.title && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700"
                >
                  Subject
                </label>
                <select
                  id="subject"
                  {...register("subject", { required: "Subject is required" })}
                  className="mt-1 p-2 w-full border rounded-lg focus:ring-2 focus:ring-gray-500"
                >
                  <option value="">Select a subject</option>
                  <option value="math">Math</option>
                  <option value="english">English</option>
                </select>
                {errors.subject && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-700"
                >
                  Content
                </label>
                <textarea
                  id="content"
                  {...register("content", { required: "Content is required" })}
                  placeholder="Enter content"
                  className="mt-1 p-2 w-full border rounded-lg focus:ring-2 focus:ring-gray-500"
                />
                {errors.content && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.content.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                  onClick={toggleModal}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  {isLoading && <Loading />} Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
