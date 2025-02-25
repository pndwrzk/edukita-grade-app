import { Grade } from "@/types/grade-types";
import moment from "moment";

interface AssignmentTableProps {
  grades: ReadonlyArray<Grade>;
}

export function GradeTable({ grades }: Readonly<AssignmentTableProps>) {
  return (
    <div className="overflow-x-auto rounded-sm shadow">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-white border-y">
        <tr>
            {["Title", "Subject", "Content", "Created At", "Teacher", "Grade", "Feedback"].map((header) => (
              <th key={header} className="px-6 py-3">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {grades.map((grade) => (
            <tr key={grade.id} className="bg-white">
              <td className="px-6 py-4">{grade.title}</td>
              <td className="px-6 py-4">{grade.subject}</td>
              <td className="px-6 py-4">{grade.content}</td>
              <td className="px-6 py-4">{moment(grade.created_at).format("DD MMM YYYY, HH:mm")}</td>
              <td className="px-6 py-4">
                {grade.grade ? `${grade.grade.teacher.name} (${grade.grade.teacher.email})` : "-"}
              </td>
              <td className="px-6 py-4">{grade.grade?.grade ?? "-"}</td>
              <td className="px-6 py-4">{grade.grade?.feedback ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}