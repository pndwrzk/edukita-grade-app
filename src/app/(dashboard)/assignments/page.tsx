"use client";

import { useEffect, useState } from "react";
import { Assignments } from "@/types/grade-types";
import { getAssignments } from "@/services/grade-service";
import { LIST_SUBJECT } from "@/app/constanst/subject";

export default function Assigments() {
  const [assignments, setAssignments] = useState<Assignments[]>([]);
  const [filterSubject, setFilterSubject] = useState<string>("");
  useEffect(() => {
    const fetchAssignments = async (): Promise<void> => {
      const result = await getAssignments(filterSubject);
      if (result.data) {
        setAssignments(result.data);
      }
    };
    fetchAssignments();
  }, [filterSubject]);

  return (
    <div className="container mx-auto p-6">
      <div className="my-3 w-[200px]">
        <select
          id="subject"
          onChange={(e) => setFilterSubject(e.target.value)}
          className="mt-1 p-2 w-full border rounded-lg focus:ring-2 focus:ring-gray-500 text-black"
        >
          <option value="" className="text-black">
            Select a subject
          </option>
          {LIST_SUBJECT.map((subject) => (
            <option
              key={subject.value}
              value={subject.value}
              className="text-black"
            >
              {subject.label}
            </option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto rounded-sm shadow">
        <table className="w-full border-black  text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-white border-y  dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Student
              </th>
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
                Grade
              </th>
            </tr>
          </thead>

          <tbody>
            {assignments.map((assignment) => {
              return (
                <tr key={assignment.id} className="bg-white ">
                  <td className="px-6 py-4">{`${assignment.student.name} (${assignment.student.email})`}</td>
                  <td className="px-6 py-4">{assignment.title}</td>
                  <td className="px-6 py-4">{assignment.subject}</td>
                  <td className="px-6 py-4">{assignment.content}</td>
                  <td className="px-6 py-4">{assignment.created_at}</td>
                  <td className="px-6 py-4">
                    {assignment.grade ? (
                      assignment.grade.grade
                    ) : (
                      <a
                        href="/submit-grade"
                        className="text-blue-500 hover:underline"
                      >
                        Submit Grade
                      </a>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
