import * as React from 'react';
import { ChangeEvent } from 'react';
import * as classnames from 'classnames';

type InputType = 'text' | 'password';
type InputSize = 'small' | 'medium' | 'large';

interface InputProps {
  id: string;
  name: string;
  label: string;
  type: InputType;
  size?: InputSize;
  value: string | number;
  fluid?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export class Input extends React.Component<InputProps, any> {
  render() {
    const { id, name, label, type, size = 'medium', value, fluid = false, onChange } = this.props;

    return (
      <div className={classnames(
        'InputContainer',
        {
          ['fluid']: fluid
        }
      )}
      >
        {label && <label htmlFor={id}>{label}</label>}
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          className='Input'
        />
      </div>
    );
  }
}
