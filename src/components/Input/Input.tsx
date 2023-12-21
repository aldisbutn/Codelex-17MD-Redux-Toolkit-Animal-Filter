import Style from './Input.module.css';

type InputProps = {
  type?: string;
  name: string;
  placeholder?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value?: string | number | readonly string[] | undefined;
};

const Input = ({ type = 'text', name, placeholder, onChange, value }: InputProps) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={(e) => {
        onChange(e);
      }}
      className={Style.input}
    />
  );
};

export default Input;
