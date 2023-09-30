import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empleado, ResponseEmpleado, RptEmpleado } from '../insterface/empleado.inteface';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  URL_API = environment.API_URL;



  constructor(private http: HttpClient) { }


  getEmpleados(): Observable<ResponseEmpleado> {
    let data = `${this.URL_API}empleados`;

    return this.http.get<ResponseEmpleado>(data);
  }

  deleteEmpoyeeId(empleado: Empleado) {
    return this.http.delete(`${this.URL_API}empleados/${empleado._id}`);
  }

  saveEmployee( empleado : Empleado){
    return this.http.post(`${this.URL_API}empleados`, empleado);
  }

  updateEmployee(empleado: Empleado) {
    return this.http.put(`${this.URL_API}empleados/${empleado._id}`, empleado);
  }


  getByIdEmployeeInt(id: string) {
    let data = `${this.URL_API}empleados/${id}`;
    return this.http.get<RptEmpleado>(data);
  }
}
