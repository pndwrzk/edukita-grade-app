import { Assignments } from "@/types/grade-types";
import moment from "moment";
import { AssignmentForm } from "@/app/(dashboard)/components/assignment/assignmentForm";
import { useState } from "react";

interface AssignmentTableProps {
  assignments: Assignments[];
}

export function AssignmentTable({
  assignments,
}: Readonly<AssignmentTableProps>) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [idAssignment, setIdAssignment] = useState<number>(0);

  const handleOpenModal = (id: number) => {
    setIdAssignment(id);
    setIsModalOpen(true);
  };

  const handleCreate = async (data: {
    grade: number;
    assignment_id: number;
    feedback: string;
  }) => {
    setIsLoading(true);
  };

  return (
    <>
      <div className="overflow-x-auto rounded-sm shadow">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border-black">
          <thead className="text-xs uppercase bg-white border-y text-gray-700 dark:text-gray-400">
            <tr>
              {[
                "Student",
                "Title",
                "Subject",
                "Content",
                "Created At",
                "Grade",
              ].map((header) => (
                <th key={header} scope="col" className="px-6 py-3">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {assignments.map(
              ({ id, student, title, subject, content, created_at, grade }) => (
                <tr key={id} className="bg-white">
                  <td className="px-6 py-4">
                    {student?.name} ({student?.email})
                  </td>
                  <td className="px-6 py-4">{title}</td>
                  <td className="px-6 py-4">{subject}</td>
                  <td className="px-6 py-4">{content}</td>
                  <td className="px-6 py-4">
                    {moment(created_at).format("DD MMM YYYY, HH:mm")}
                  </td>
                  <td className="px-6 py-4">
                    {grade?.grade ?? (
                      <button
                        onClick={() => handleOpenModal(id)}
                        className="text-blue-500 hover:underline"
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
