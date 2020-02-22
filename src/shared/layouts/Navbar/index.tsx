import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import withNotification from '../../../components/notification/notification.component';
import { resetNotification } from '../../../actions/info.action';

import { Button } from '../../components/Button';
import { NavbarItem } from './NavbarItem';
import AuthService from '../../../services/auth';
import { signout } from '../../../actions/auth.action';

interface NavbarState {
  selectedPosition: number;
}

class Navbar extends React.Component<RouteComponentProps, NavbarState> {
  constructor(props) {
    super(props);

    this.state = {
      selectedPosition: 0
    };
  }

  componentDidMount(): void {
    this.getCurrentVisitedMenu();
  }

  componentDidUpdate(prevProps: Readonly<RouteComponentProps>, prevState: Readonly<NavbarState>, snapshot?: any): void {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.getCurrentVisitedMenu();
    }
  }

  getCurrentVisitedMenu = () => {
    let { pathname } = this.props.location;
    let { selectedPosition } = this.state;

    if (pathname.includes('clientes')) {
      selectedPosition = 0;
    }

    if (pathname.includes('articulos')) {
      selectedPosition = 125;
    }

    if (pathname.includes('diaria')) {
      selectedPosition = 250;
    }

    if (pathname.includes('pedidos')) {
      selectedPosition = 375;
    }

    if (pathname.includes('remitos')) {
      selectedPosition = 500;
    }

    if (pathname.includes('reportes')) {
      selectedPosition = 625;
    }

    if (pathname.includes('competencia')) {
      selectedPosition = 750;
    }

    if (pathname.includes('proveedores')) {
      selectedPosition = 875;
    }

    if (pathname.includes('map')) {
      selectedPosition = 1000;
    }

    this.setState({
      selectedPosition
    });
  };

  onLogout = async () => {
    await AuthService.logout();

    this.props.history.push('/');
  };

  render() {
    const { location } = this.props;
    const { selectedPosition } = this.state;

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
          <div className="NavigationItems">
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
          <div
            style={{
              left: `${selectedPosition}px`
            }}
            className='visited'
          />
        </div>
        <Button type='secondary' onClick={this.onLogout}>Cerrar Sesion</Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { notifications: state.info.notifications };
};

export const ConnectedNavbar = withRouter(connect(mapStateToProps, { resetNotification })(withNotification(Navbar)));

