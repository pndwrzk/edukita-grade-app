import { useForm } from "react-hook-form";
import { Modal } from "@/components/modalForm";
import { LIST_SUBJECT } from "@/app/constanst/subject";
import { InputField } from "@/components/form/inputField";
import { TextareaField } from "@/components/form/textareaField";
import { SelectField } from "@/components/form/selectField";

interface FormData {
  title: string;
  subject: "math" | "english";
  content: string;
}

interface AssignmentFormProps {
  readonly isOpen: boolean;
  readonly isLoading: boolean;
  readonly onSubmit: (data: FormData) => void;
  readonly onClose: () => void;
}

export function GradeForm({
  isOpen,
  isLoading,
  onSubmit,
  onClose
}: AssignmentFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const selectedSubject = watch("subject");

  return (
    <Modal
      isOpen={isOpen}
      title="New Assignment"
      isLoading={isLoading}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputField
        id="title"
        label="Title"
        register={register("title", { required: "Title is required" })}
        error={errors.title?.message}
      />

      <SelectField
        id="subject"
        label="Subject"
        options={LIST_SUBJECT}
        register={register("subject", { required: "Subject is required" })}
        error={errors.subject?.message}
      />

      <TextareaField
        id="content"
        label="Content"

        register={register("content", {
          required: "Content is required",
          ...(selectedSubject === "math" && {
            pattern: {
              value: /^\d+$/,
              message: "Only numbers are allowed for Math",
            },
          }),
        })}
        error={errors.content?.message}
      />
    </Modal>
  );
}
