interface InputFieldProps {
    id: string;
    label: string;
    type?: string;
    register: any;
    error?: string;
  }
  
  export function InputField({
    id,
    label,
    type = "text",
    register,
    error,
  }: Readonly<InputFieldProps>) {
    return (
      <div className="mb-4">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <input
          type={type}
          id={id}
          {...register}
          className="mt-1 p-2 w-full border rounded-lg focus:ring-2 focus:ring-gray-500"
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    );
  }
  