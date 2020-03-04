import * as React from 'react';
import { ChangeEvent } from 'react';

interface CheckboxProps {
  id?: string;
  name: string;
  label?: string;
  checked?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export class Checkbox extends React.Component<CheckboxProps, any> {
  render() {
    const { id, name, label, checked, onChange } = this.props;

    return (
      <label htmlFor={id} className={'Checkbox'}>
        <input id={id} type='checkbox' name={name} checked={checked} onChange={onChange} />
        <div className='CheckboxWrapper'>
          {checked && (
            <svg style={{width: '10px', height: '10px'}}>
              <use xlinkHref={'/images/sprite.svg#icon-tick'}></use>
            </svg>
          )}
        </div>
        {label && <div className='CheckboxLabel'>{label}</div>}
      </label>
    )
  }
}
