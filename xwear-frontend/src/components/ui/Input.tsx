export interface InputProps {
  type: string;
  title: string;
  value?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  type,
  title,
  value,
  onChange,
  placeholder,
  defaultValue,
  className,
}) => {
  return (
    <div className={`bg-gray-100 p-4 rounded-md ${className}`}>
      <label className="block text-sm font-medium mb-1">{title}</label>
      <input
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="w-full bg-gray-100 focus:outline-none"
      />
    </div>
  );
};
