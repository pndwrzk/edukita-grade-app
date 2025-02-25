"use client"

import { useForm } from "react-hook-form";
import { Modal } from "@/components/modalForm";
import { LIST_SUBJECT } from "@/app/constanst/subject";
import { InputField } from "@/components/form/inputField";
import { TextareaField } from "@/components/form/textareaField";
import { SelectField } from "@/components/form/selectField";
import { useEffect } from "react";
import { CreateAssignmentRequestBody } from "@/types/grade-types";




interface AssignmentFormProps {
  readonly isOpen: boolean;
  readonly isLoading: boolean;
  readonly onSubmit: (data: CreateAssignmentRequestBody) => void;
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
    setValue,
    reset,
    formState: { errors },
  } = useForm<CreateAssignmentRequestBody>({
    defaultValues:{
      title :'',
      subject: '',
      content: '',
    }
  });

  const selectedSubject = watch("subject");



  useEffect(() => {
    setValue("content", ""); 
  }, [selectedSubject,setValue]);

  return (
    <Modal
      isOpen={isOpen}
      title="New Assignment"
      isLoading={isLoading}
      onClose={onClose}
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset();
      })}
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
         height="h-64"
        register={register("content", {
          required: "Content is required",
          validate: (value) => 
            selectedSubject === "math"
             ? /^[^a-zA-Z]*$/.test(value) || "Letters are not allowed for Math"
              : true,
        })}
        error={errors.content?.message}
      />
    </Modal>
  );
}

