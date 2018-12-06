import { Cliente } from '../modelo/cliente';

export class DataRepository<T> {
    page: any;
    _embedded: {
        rows: Array<T>
    };
    _links: any;
}
