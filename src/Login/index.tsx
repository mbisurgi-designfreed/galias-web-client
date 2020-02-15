import * as React from 'react';
import { Redirect } from 'react-router-dom';

import { Input } from '../shared/components/Input';
import { Button } from '../shared/components/Button';
import AuthService from '../services/auth';

interface LoginState {
  username: string;
  password: string;
  isAuthenticate: boolean;
}

export class Login extends React.Component<any, LoginState> {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      isAuthenticate: false
    };
  }

  onLogin = async () => {
    const { username, password } = this.state;

    const auth = await AuthService.login(username, password);

    if (auth.status === 'success') {
      this.setState({
        isAuthenticate: true
      })
    }

    return;
  };

  render() {
    const { username, password, isAuthenticate } = this.state;

    if (isAuthenticate) return <Redirect to={'/'} />;

    return (
      <div className='Login'>
        <div className='LoginMain'>
          <h1>Galias Distribuidor Oficial</h1>
          <div className='LoginForm'>
            <div className='LoginFormInputs'>
              <Input
                id='username'
                name='username'
                label='Usuario'
                type='text'
                fluid
                value={username}
                onChange={(e) => this.setState({ username: e.target.value })}
              />
              <Input
                id='password'
                name='password'
                label='Contraseña'
                type='password'
                fluid
                value={password}
                onChange={(e) => this.setState({ password: e.target.value })}
              />
            </div>
            <Button onClick={this.onLogin}>Iniciar Sesion</Button>
          </div>
        </div>
        <div className='LoginFooter'>
          <div className='LoginFooterImage'/>
          <span>Sistema Integral de Gestion Comercial</span>
        </div>
      </div>
    );
  }
}
