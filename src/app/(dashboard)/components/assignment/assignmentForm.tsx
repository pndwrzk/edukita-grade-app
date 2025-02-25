import { useForm } from "react-hook-form";
import { Modal } from "@/components/modalForm";
import { InputField } from "@/components/form/inputField";
import { TextareaField } from "@/components/form/textareaField";
import {  CreateGradeRequestBody } from "@/types/grade-types";


interface AssignmentFormProps {
  readonly isOpen: boolean;
  readonly isLoading: boolean;
  readonly onSubmit: (data: CreateGradeRequestBody) => void;
  readonly onClose: () => void;
  id_assignment: number;
}

export function AssignmentForm({
  isOpen,
  isLoading,
  onSubmit,
  onClose,
  id_assignment,
}: AssignmentFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CreateGradeRequestBody>({
    defaultValues: {
      grade: 0,
      assignment_id: -1,
      feedback: "",
    },
  });

  setValue("assignment_id", id_assignment);

  return (
    <Modal
      isOpen={isOpen}
      title="Submit Grade"
      isLoading={isLoading}
      onClose={onClose}
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset();
      })}
    >
     <InputField
  id="title"
  label="Grade"
  type="number"
  register={register("grade", { 
    required: "Grade is required", 
    min: { value: 0, message: "Grade must be at least 0" },
    max: { value: 100, message: "Grade cannot exceed 100" }
  })}
  error={errors.grade?.message}
/>


      <TextareaField
        id="feedback"
        label="Feedback"
        register={register("feedback", {
          required: "Content is required",
        })}
        error={errors.feedback?.message}
      />
    </Modal>
  );
}
