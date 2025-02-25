import { Grade } from "@/types/grade-types";
import moment from "moment";

interface AssignmentTableProps {
  grades: ReadonlyArray<Grade>;
}

export function GradeTable({ grades }: Readonly<AssignmentTableProps>) {
  return (
    <div className="overflow-x-auto rounded-lg shadow-md">
      <table className="w-full text-sm text-left text-gray-700">
        <thead className="bg-[#31EEC4] sticky top-0 z-10">
          <tr>
            {["Title", "Subject", "Content", "Created At", "Teacher", "Grade", "Feedback"].map((header) => (
              <th key={header} className="px-6 py-3 font-semibold tracking-wider text-gray-600">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {grades.map((grade, index) => (
            <tr
              key={grade.id}
              className={`${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-gray-100 transition-colors duration-200`}
            >
              <td className="px-6 py-4 font-medium text-gray-800">{grade.title}</td>
              <td className="px-6 py-4">{grade.subject}</td>
              <td className="px-6 py-4">{grade.content}</td>
              <td className="px-6 py-4">{moment(grade.created_at).format("DD MMM YYYY, HH:mm")}</td>
              <td className="px-6 py-4">
                {grade.grade ? (
                  <div>
                    <p>{grade.grade.teacher.name}</p>
                    <p className="text-xs text-gray-500">{grade.grade.teacher.email}</p>
                  </div>
                ) : (
                  "-"
                )}
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
