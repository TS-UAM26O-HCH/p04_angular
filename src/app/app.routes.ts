import { Routes } from '@angular/router';
import { Bienvenido } from './componentes/bienvenido/bienvenido';
import { Principal } from './componentes/principal/principal';

export const routes: Routes = [
  { path: 'bienvenido', component: Bienvenido }, //ruta para el inicio de sesion
  { path: 'principal', component: Principal }, //ruta para el menu principal
  { path: '', redirectTo: '/bienvenido', pathMatch: 'full' }, // Ruta por defecto
];
