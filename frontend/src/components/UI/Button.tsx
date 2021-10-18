
enum buttonType{
    button='button',
    submit='submit',
    reset='reset',
}

interface propsButton {
  type: buttonType;
  className: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

const Button: React.FC<propsButton> = ({
  type,
  className,
  disabled,
  loading,
  children,
  onClick
}) => {
  return (
    <button onClick={onClick} className={className} type={type} disabled={disabled}>
      {loading && (
          <>
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        >
        </span>
        Loading...
        </>
      )}
      {!loading && children}
    </button>
  );
};

export default Button;
