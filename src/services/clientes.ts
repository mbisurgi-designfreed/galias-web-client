import BaseService from './baseService';

import { Cliente } from '../types';

export default class ClientesService extends BaseService {
  static clientesRoute = SERVICES.CLIENTES;

  public static async getClientes(): Promise<Array<Cliente>> {
    return await this.getRequest<Array<Cliente>>(this.clientesRoute, false);
  }
}
