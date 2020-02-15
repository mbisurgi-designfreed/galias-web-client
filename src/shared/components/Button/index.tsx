import * as React from 'react';
import * as classnames from 'classnames';

type ButtonSizes = 'medium' | 'small' | 'tiny';
type ButtonTypes = 'primary' | 'secondary' | 'default' | 'light' | 'danger';

interface ButtonProps {
  size?: ButtonSizes;
  type?: ButtonTypes;
  onClick?: React.EventHandler<React.MouseEvent<HTMLButtonElement>>;
}

export class Button extends React.Component<ButtonProps, any> {
  render() {
    const { size = 'medium', type = 'primary', onClick, children } = this.props;

    return (
      <button className={classnames(
        'Button',
        {
          ['small']: size === 'small',
          ['medium']: size === 'medium'
        },
        {
          ['primary']: type === 'primary',
          ['secondary']: type === 'secondary'
        }
      )} onClick={onClick}>
        {children}
      </button>
    )
  }
}
