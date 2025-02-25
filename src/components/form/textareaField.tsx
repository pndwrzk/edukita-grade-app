interface TextareaFieldProps {
  id: string;
  label: string;
  register: any;
  error?: string;
  height?: string;
}

export function TextareaField({
  id,
  label,
  register,
  error,
  height = "h-32", 
}: Readonly<TextareaFieldProps>) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <textarea
        id={id}
        {...register}
        className={`mt-1 p-2 w-full border rounded-lg focus:ring-2 focus:ring-gray-500 ${height}`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
