"use client"

import { getAssignments } from "@/services/grade-service";
import { Assignments } from "@/types/grade-types";
import { useCallback, useEffect, useState } from "react";
import AssignmentFilter from "../components/assignment/assignmentFilter";
import { AssignmentTable } from "../components/assignment/assignmentTable";
import { showAlert } from "@/components/alert";



export default function AssignmentsPage() {
    const [assignments, setAssignments] = useState<Assignments[]>([]);
    const [filterSubject, setFilterSubject] = useState<string>("");

    const  fetchAssignments = useCallback(async () => {
        const result = await getAssignments(filterSubject);
        if (result.data) {
          setAssignments(result.data);
        }
        showAlert(result.message, result.data!= null)
      
      }, [filterSubject]);
  
    useEffect(() => {
      fetchAssignments();
    }, [filterSubject,fetchAssignments]);
  
    return (
      <div className="container mx-auto p-6">
        <AssignmentFilter filterSubject={filterSubject} setFilterSubject={setFilterSubject} />
        <AssignmentTable assignments={assignments} fetchAssignments={fetchAssignments} />
      </div>
    );
  }