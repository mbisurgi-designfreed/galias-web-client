import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Button } from '../../components/Button';
import { NavbarItem } from './NavbarItem';
import AuthService from '../../../services/auth';

class Navbar extends React.Component<RouteComponentProps, any> {
  onLogout = async () => {
    await AuthService.logout();

    this.props.history.push('/');
  };

  render() {
    const { location } = this.props;

    const navbarItems = [
      { href: 'clientes', icon: 'clientes', title: 'Clientes' },
      { href: 'articulos', icon: 'articulos', title: 'Articulos' },
      { href: 'diaria', icon: 'diarias', title: 'Diaria' },
      { href: 'pedidos', icon: 'pedidos', title: 'Pedidos' },
      { href: 'remitos', icon: 'remitos', title: 'Remitos' },
      { href: 'reportes', icon: 'reportes', title: 'Reportes' },
      { href: 'competencia/new', icon: 'competencia', title: 'Competencia' },
      { href: 'proveedores', icon: 'proveedores', title: 'Proveedores' },
      { href: 'mapa', icon: 'mapa', title: 'Mapa' }
    ];

    return (
      <div className='Navbar'>
        <span>Galias</span>
        <div className='Navigation'>
          {navbarItems.map(i => (
            <NavbarItem
              key={i.href}
              href={`/${i.href}`}
              icon={i.icon}
              title={i.title}
              selected={location.pathname.includes(i.href)}
            />
          ))}
        </div>
        <Button size='small' type='secondary' onClick={this.onLogout}>Cerrar Sesion</Button>
      </div>
    );
  }
}

export const ConnectedNavbar = withRouter(Navbar);
