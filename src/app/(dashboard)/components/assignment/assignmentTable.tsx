import { Assignments, CreateGradeRequestBody } from "@/types/grade-types";
import moment from "moment";
import { AssignmentForm } from "@/app/(dashboard)/components/assignment/assignmentForm";
import { useState } from "react";
import { createGrade } from "@/services/grade-service";
import { showAlert } from "@/components/alert";

interface AssignmentTableProps {
  assignments: Assignments[];
  fetchAssignments: () => void;
}

export function AssignmentTable({
  assignments,
  fetchAssignments,
}: Readonly<AssignmentTableProps>) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [idAssignment, setIdAssignment] = useState<number>(0);

  const handleOpenModal = (id: number) => {
    setIdAssignment(id);
    setIsModalOpen(true);
  };

  const handleCreate = async (data: CreateGradeRequestBody) => {
    setIsLoading(true);
    const result = await createGrade(data);
    showAlert(result.message, result.data !=null);
    fetchAssignments();
    setIsModalOpen(false);
    setIsLoading(false);
  };

  return (
    <>
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="w-full text-sm text-left text-gray-700 border border-gray-200">
          <thead className="bg-[#31EEC4] sticky top-0 z-10">
            <tr>
              {[
                "Student",
                "Title",
                "Subject",
                "Content",
                "Created At",
                "Feedback",
                "Grade"
              ].map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="px-6 py-3 font-semibold"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {assignments.map(
              (
                { id, student, title, subject, content, created_at, grade },
                index
              ) => (
                <tr
                  key={id}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100 transition-all`}
                >
                  <td className="px-6 py-4 font-medium">
                    {student?.name} <br />
                    <span className="text-xs text-gray-500">
                      {student?.email}
                    </span>
                  </td>
                  <td className="px-6 py-4">{title}</td>
                  <td className="px-6 py-4">{subject}</td>
                  <td className="px-6 py-4">{content}</td>
                  <td className="px-6 py-4">
                    {moment(created_at).format("DD MMM YYYY, HH:mm")}
                  </td>
                  <td className="px-6 py-4">{grade?.feedback ?? '-'}</td>
                  <td className="px-6 py-4">
                    {grade?.grade ?? (
                      <button
                        onClick={() => handleOpenModal(id)}
                        className="px-3 py-1 text-sm font-medium text-white bg-[#4F59F6] rounded hover:bg-blue-600 transition"
                      >
                        Submit Grade
                      </button>
                    )}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      <AssignmentForm
        isOpen={isModalOpen}
        isLoading={isLoading}
        onSubmit={handleCreate}
        onClose={() => setIsModalOpen(false)}
        id_assignment={idAssignment}
      />
    </>
  );
}
