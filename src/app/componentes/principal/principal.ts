import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-principal',
  imports: [CommonModule, TranslatePipe],
  templateUrl: './principal.html',
  styleUrl: './principal.css',
})
export class Principal {
  tarjetas = [
    {
      icono: '/iconos/Usuario.svg',
      texto: 'MY_ACCOUNT',
      alt: 'MY_ACCOUNT',
    },
    {
      icono: '/iconos/Registro.svg',
      texto: 'REGISTER',
      alt: 'REGISTER',
      accion: () => this.irARegistro(),
    },
    {
      icono: '/iconos/Notificaciones.svg',
      texto: 'NOTIFICATIONS',
      alt: 'NOTIFICATIONS',
    },
    {
      icono: '/iconos/Pantera.svg',
      texto: 'CHATBOT',
      alt: 'CHATBOT',
    },
    {
      icono: '/iconos/AvisoPrivacidad.svg',
      texto: 'PRIVACY_NOTICE',
      alt: 'PRIVACY_NOTICE',
    },
    {
      icono: '/iconos/Cerrar sesion.svg',
      texto: 'LOGOUT',
      alt: 'LOGOUT',
      accion: () => this.cerrarSesion(),
    },
  ];

  constructor(
    private router: Router,
    private translate: TranslateService
  ) {}

  // Nota: la ruta '/registro' se habilita en la segunda parte
  irARegistro() {
    this.router.navigate(['/registro']);
  }

  cerrarSesion() {
    this.router.navigate(['/bienvenido']);
  }

  cambiarIdioma(lang: string) {
    this.translate.use(lang);
  }
}
