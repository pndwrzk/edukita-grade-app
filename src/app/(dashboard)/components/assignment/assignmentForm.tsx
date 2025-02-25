import { useForm } from "react-hook-form";
import { Modal } from "@/components/modalForm";
import { InputField } from "@/components/form/inputField";
import { TextareaField } from "@/components/form/textareaField";


interface FormData {
  grade: number;
  assignment_id: number
  feedback : string
}

interface AssignmentFormProps {
  readonly isOpen: boolean;
  readonly isLoading: boolean;
  readonly onSubmit: (data: FormData) => void;
  readonly onClose: () => void;
  id_assignment : number;
}

export function AssignmentForm({
  isOpen,
  isLoading,
  onSubmit,
  onClose,
  id_assignment
}: AssignmentFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  setValue('assignment_id',id_assignment)



  return (
    <Modal
      isOpen={isOpen}
      title="Submit Grade"
      isLoading={isLoading}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputField
        id="title"
        label="Grade"
        register={register("grade", { required: "Title is required" })}
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
