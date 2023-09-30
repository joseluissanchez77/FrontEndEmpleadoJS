import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado, ResponseEmpleado } from 'src/app/insterface/empleado.inteface';
import { EmpleadoService } from 'src/app/service/empleado.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  empleadoForm: Empleado = {
    _id: '',
    nombre: '',
    cargo: '',
    departamento: '',
    sueldo: 0,
    correo: '',
    createdAt: undefined,
    updatedAt: undefined
  }

  empleadoUpdateForm = this.fb.group({

    fcn_nombre: ['', [Validators.required]],
    fcn_cargo: ['', [Validators.required]],
    fcn_departamento: ['', [Validators.required]],
    fcn_sueldo: ['', [Validators.required]],
    fcn_correo: ['', [Validators.required]],

  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private empleadoService: EmpleadoService,
    private activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe((prm) => {
      this.getIdEmpleadoData(prm['id']);
    });
  }

  ngOnInit(): void {

  }

  editarEmpleado() {

    if (this.empleadoUpdateForm.valid) {
      Swal.fire({
        title: 'Esta seguro de editar empleado?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Editar',
        denyButtonText: `Cancelar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.confirmarUpdate();
        } else if (result.isDenied) {
          Swal.fire(
            'Accion cancelada, los datos furon borrados del formulario',
            '',
            'info'
          );
        }
      });
    } else {
      this.empleadoUpdateForm.markAllAsTouched();
    }
  }


  confirmarUpdate() {
    let data = {
      _id: this.empleadoForm._id,
      nombre: this.empleadoUpdateForm.get('fcn_nombre')?.value,
      cargo: this.empleadoUpdateForm.get('fcn_cargo')?.value,
      departamento: this.empleadoUpdateForm.get('fcn_departamento')?.value,
      sueldo: this.empleadoUpdateForm.get('fcn_sueldo')?.value,
      correo: this.empleadoUpdateForm.get('fcn_correo')?.value,
    };
    this.empleadoService.updateEmployee(data as any).subscribe({
      next: (rpt) => {
        this.empleadoUpdateForm.reset();
        this.router.navigate(['']);
        // console.log(rpt);
      },
      error: (errorData) => {
        console.log(errorData);
        // this.loginError = errorData?.error?.detail;
      },
      complete: () => {
        this.empleadoUpdateForm.reset();
        // this.formGroupProductos.get('fcn_categoria')?.setValue('');
        Swal.fire('Editado!', '', 'success');
      },
    });
  }


  cancelarEmpleado() {
    // this.empleadoForm.reset();
    this.router.navigate(['']);
  }


  getIdEmpleadoData(id: string) {
    this.empleadoService.getByIdEmployeeInt(id).subscribe({
      next: (rpt) => {
        this.empleadoForm = rpt.data;
        console.log(rpt.data);
      },
      error: (errorData) => {
        console.log(errorData);
      },
      complete: () => { },
    });
  }


  /**
* get
*/

  get fcn_nombre() {
    return this.empleadoUpdateForm.controls.fcn_nombre;
  }
  get fcn_cargo() {
    return this.empleadoUpdateForm.controls.fcn_cargo;
  }
  get fcn_departamento() {
    return this.empleadoUpdateForm.controls.fcn_departamento;
  }
  get fcn_sueldo() {
    return this.empleadoUpdateForm.controls.fcn_sueldo;
  }
  get fcn_correo() {
    return this.empleadoUpdateForm.controls.fcn_correo;
  }


}
