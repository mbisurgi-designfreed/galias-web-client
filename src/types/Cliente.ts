export interface Cliente {
  _id?: string;
  codigo: number;
  razonSocial: string;
  cuit?: string;
  iva: string;
  nombreComercial?: string;
  direccion: any;
  zona: string;
  email?: string;
  canal: string;
  subcanal: string;
  division: string;
  condicionPago: string;
  sincronizado: boolean;
  personas: [any];
  diaEntrega: [any];
  diaVisita: [any];
  clasificacion: string;
  sucursales: [any];
  telefonos: [any];
  habilitado: boolean;
}
