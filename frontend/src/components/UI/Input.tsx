interface propsInput {
  type: string;
  name: string;
  id: string;
  className: string;
  placeholder?: string;
  label: string;
  required?: boolean;
  value?: string | number | readonly string[] | undefined;
  onChange?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}

const Input: React.FC<propsInput> = ({
  type,
  name,
  id,
  className,
  placeholder,
  label,
  value,
  onChange,
  onKeyUp,
  required
}) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        onChange={onChange}
        onKeyUp={onKeyUp}
        type={type}
        name={name}
        id={id}
        className={className}
        placeholder={placeholder}
        required={required}
        value={value}
      />
    </div>
  );
};

export default Input;
