interface SelectFieldProps {
    id: string;
    label: string;
    options: { value: string; label: string }[];
    register: any;
    error?: string;
  }
  
  export function SelectField({
    id,
    label,
    options,
    register,
    error,
  }: Readonly<SelectFieldProps>) {
    return (
      <div className="mb-4">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <select
          id={id}
          {...register}
          className="mt-1 p-2 w-full border rounded-lg focus:ring-2 focus:ring-gray-500"
        >
          <option value="">Select {label}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    );
  }
  