import Style from './Button.module.css';

type ButtonsProps = {
  type?: HTMLButtonElement['type'];
  onClick?: () => void
  text: string;
  styleType: string;
};

const Button = ({ type = 'button', onClick, text, styleType }: ButtonsProps) => {
  const buttonStyle = (style: string) => {
    if (style === 'add') {
      return `${Style.addButton}`;
    } else if (style === 'delete') {
      return `${Style.deleteButton}`;
    } else if (style === 'edit') {
      return `${Style.editButton}`;
    } else if (style === 'cancel') {
      return `${Style.cancelButton}`;
    } else if (style === 'save') {
      return `${Style.saveButton}`;
    } else if (style === 'sort') {
      return `${Style.sortButton}`
    }
  };
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${Style.button} ${buttonStyle(styleType)}`}
    >
      {text}
    </button>
  );
};

export default Button;
