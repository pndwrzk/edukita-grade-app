"use client";
import { useEffect, useState } from "react";
import { Grade } from "@/types/grade-types";
import { getGrades, createAssignments } from "@/services/grade-service";
import { GradeForm } from "@/app/(dashboard)/components/grade/gradeForm";
import { GradeTable } from "@/app/(dashboard)/components/grade/gradeTable";
import { showAlert } from "@/components/alert";

export default function Grades() {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchGrades();
  }, []);

  const fetchGrades = async () => {
    const result = await getGrades();
    if (result.data) {
      setGrades(result.data);
    } else {
      showAlert(result.message, result.data != null);
    }
   
  };

  const handleCreate = async (data: {
    title: string;
    subject: "math" | "english";
    content: string;
  }) => {
    setIsLoading(true);
    const result = await createAssignments(data);
    if (result.data) {
      await fetchGrades();
      setIsModalOpen(false);
    }
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between mb-5">
        <button
          className="py-2 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          onClick={() => setIsModalOpen(true)}
        >
          Add New Assignment
        </button>
      </div>

      <GradeTable grades={grades} />

      <GradeForm
        isOpen={isModalOpen}
        isLoading={isLoading}
        onSubmit={handleCreate}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
