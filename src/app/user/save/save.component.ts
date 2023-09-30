import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Empleado } from 'src/app/insterface/empleado.inteface';
import { EmpleadoService } from 'src/app/service/empleado.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.css']
})
export class SaveComponent implements OnInit {

  empleadoForm = this.fb.group({

    fcn_nombre: ['', [Validators.required]],
    fcn_cargo: ['', [Validators.required]],
    fcn_departamento: ['', [Validators.required]],
    fcn_sueldo: ['', [Validators.required]],
    fcn_correo: ['', [Validators.required]],

  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private empleadoService: EmpleadoService
  ) { }


  ngOnInit(): void {

  }


  cancelarEmpleado() {
    this.empleadoForm.reset();
    this.router.navigate(['']);
  }

  guardarEmpleado() {
    console.log(this.empleadoForm);
    if (this.empleadoForm.valid) {
      Swal.fire({
        title: 'Esta seguro de guardar persona?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Guardar',
        denyButtonText: `Cancelar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.confirmarSave();
        } else if (result.isDenied) {
          Swal.fire(
            'Accion cancelada, los datos furon borrados del formulario',
            '',
            'info'
          );
          this.empleadoForm.reset();
        }
      });
    } else {
      this.empleadoForm.markAllAsTouched();
    }
  }

  confirmarSave() {
    let data = {
      _id: 0,
      nombre: this.empleadoForm.get('fcn_nombre')?.value,
      cargo: this.empleadoForm.get('fcn_cargo')?.value,
      departamento: this.empleadoForm.get('fcn_departamento')?.value,
      sueldo: this.empleadoForm.get('fcn_sueldo')?.value,
      correo: this.empleadoForm.get('fcn_correo')?.value,
    };
    this.empleadoService.saveEmployee(data as any).subscribe({
      next: (rpt) => {
        this.empleadoForm.reset();
        this.router.navigate(['']);
        // console.log(rpt);
      },
      error: (errorData) => {
        console.log(errorData);
      },
      complete: () => {
        this.empleadoForm.reset();
        Swal.fire('Guardado!', '', 'success');
      },
    });
  }

  /**
 * get
 */

  get fcn_nombre() {
    return this.empleadoForm.controls.fcn_nombre;
  }
  get fcn_cargo() {
    return this.empleadoForm.controls.fcn_cargo;
  }
  get fcn_departamento() {
    return this.empleadoForm.controls.fcn_departamento;
  }
  get fcn_sueldo() {
    return this.empleadoForm.controls.fcn_sueldo;
  }
  get fcn_correo() {
    return this.empleadoForm.controls.fcn_correo;
  }

}
