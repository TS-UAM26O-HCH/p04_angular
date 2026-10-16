import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-bienvenido',
  imports: [CommonModule, ReactiveFormsModule, TranslatePipe],
  templateUrl: './bienvenido.html',
  styleUrl: './bienvenido.css',
})
export class Bienvenido {
  formulario: FormGroup;
  mostrarContrasena = false;

  campos = [
    {
      label: 'EMAIL',
      name: 'correo',
      type: 'email',
      required: true,
      pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
    },
    {
      label: 'PASSWORD',
      name: 'contrasena',
      type: 'password',
      required: true,
    },
  ];

  constructor(
    private fb: FormBuilder,
    private translate: TranslateService
  ) {
    this.formulario = this.fb.group({});
    this.campos.forEach((campo) => {
      const validators = campo.required ? [Validators.required] : [];
      if (campo.pattern) {
        validators.push(Validators.pattern(campo.pattern));
      }
      this.formulario.addControl(campo.name, this.fb.control('', validators));
    });
  }

  alternarVisibilidad() {
    this.mostrarContrasena = !this.mostrarContrasena;
  }

  cambiarIdioma(lang: string) {
    this.translate.use(lang);
  }

  enviarFormulario() {
    if (this.formulario.valid) {
      alert('Se inició sesión correctamente');
    } else {
      this.formulario.markAllAsTouched();
      alert('Datos incorrectos');
    }
  }
}
