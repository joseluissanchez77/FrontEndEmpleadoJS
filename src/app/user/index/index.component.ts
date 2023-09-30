import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Empleado, ResponseEmpleado } from 'src/app/insterface/empleado.inteface';
import { EmpleadoService } from 'src/app/service/empleado.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  @Input() objGetEmpleado: ResponseEmpleado[] | any = [];

  constructor(
    private empleadoService: EmpleadoService,
    private router:Router
  ) {
    this.listEmployee();
  }
  ngOnInit(): void { }

  listEmployee() {
    this.empleadoService.getEmpleados().subscribe({
      next: (rpt: ResponseEmpleado) => {
        console.log(rpt);
        this.objGetEmpleado = rpt.data;
        // this.collectionSize = rpt.total;
      },
      error: (e) => {
        console.log(e);
        // this.loading = false;
      },
    });
  }

  dataPersonRow(data: Empleado) {

  }


  deleteEmployeeRowConfirm(data: Empleado) {
    Swal.fire({
      title: 'Esta seguro de borrar empleado?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Borrar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.deleteEmployee(data);
      } else if (result.isDenied) {
        // this.cancelarProducto();
        Swal.fire('Accion cancelada', '', 'info');
      }
    });
  }


  btnUpdateEmployee($event: Empleado) {
    this.router.navigate(["employee-edit",$event._id]);
  }


  btnAddEmployee() {
    this.router.navigate(["employee-save"]);
  }


  deleteEmployee(data: Empleado) {
    this.empleadoService.deleteEmpoyeeId(data).subscribe({
      next: (rpt) => {
        // this.productos();
        console.log(rpt);
      },
      error: (errorData) => {
        console.log(errorData);
      },
      complete: () => {
        this.listEmployee();
        Swal.fire('Empleado Borrado!', '', 'success');
      },
    });
  }

}
