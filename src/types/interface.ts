import type {IconProp} from '@fortawesome/fontawesome-svg-core';

export interface GlobalObject {
  [key: string]: any;
}

export interface InputProps extends GlobalObject {
  inputType: string;
  inputName: string;
  inputLabel?: string;
  inputValue: string;
  inputPlaceholder: string;
  inputOnChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputOnBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  inputClassName?: string;
  inputRequired?: boolean;
  inputDisabled?: boolean;
  inputSize: string;
}

export interface ButtonProps extends GlobalObject {
  buttonTheme: string;
  buttonClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
  buttonClass?: string;
  buttonType?: 'button' | 'submit' | 'reset';
  buttonText?: string;
  buttonSize: string;
  buttonIcon?: IconProp;
  buttonIconPosition?: string;
  buttonIconClassName?: string;
}
