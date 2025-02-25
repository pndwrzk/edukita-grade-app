"use client";
import { useEffect, useState } from "react";
import { CreateAssignmentRequestBody, Grade } from "@/types/grade-types";
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
    } 
    showAlert(result.message, result.data!= null)
     
    
   
  };

  const handleCreate = async (data: CreateAssignmentRequestBody) => {
    setIsLoading(true);
    const result = await createAssignments(data);
    showAlert(result.message, result.data!= null)
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
          className="py-2 px-4 bg-[#E0418E] text-white rounded-lg hover:bg-[#ee4697]"
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
