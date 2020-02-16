import * as React from 'react';
import { Link } from 'react-router-dom';
import * as classnames from 'classnames';

interface NavbarItemProps {
  href: string;
  icon: string;
  title: string;
  selected: boolean;
}

export class NavbarItem extends React.Component<NavbarItemProps, any> {
  render() {
    const { href, icon, title, selected } = this.props;

    return (
      <Link to={href} className={classnames('NavbarItem', selected ? 'selected' : '')} >
        <svg>
          <use xlinkHref={`/images/sprite.svg#icon-${icon}`}></use>
        </svg>
        <span>{title}</span>
      </Link>
    );
  }
}
