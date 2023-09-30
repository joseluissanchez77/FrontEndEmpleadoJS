export interface ResponseEmpleado {
    data:   Empleado[];
    status: string;
}

export interface RptEmpleado {
    data:   Empleado;
    status: string;
}

export interface Empleado {
    _id:          string;
    nombre:       string;
    cargo:        string;
    departamento: string;
    sueldo:       number;
    correo:       string;
    createdAt?:    Date;
    updatedAt?:    Date;
}
