# PrimeraAplicación

Aplicación web desarrollada con **Angular 22** (standalone components) que incluye una pantalla de **inicio de sesión** y un **menú principal**, con soporte de **internacionalización (i18n)** en español e inglés y **renderizado del lado del servidor (SSR)** mediante Express.

> **Nota importante:** el inicio de sesión es únicamente visual (no hay backend ni autenticación real). Al enviar el formulario solo se muestra una alerta. Para llegar a la pantalla principal **debes cambiar manualmente la URL** de `/bienvenido` a `/principal`.

---

## Tabla de contenido

- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Uso](#uso)
  - [Servidor de desarrollo](#servidor-de-desarrollo)
  - [Navegación entre pantallas](#navegación-entre-pantallas)
  - [Compilación](#compilación)
  - [SSR (producción)](#ssr-producción)
  - [Pruebas unitarias](#pruebas-unitarias)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Rutas](#rutas)
- [Funcionalidades](#funcionalidades)
  - [Pantalla de bienvenida (`/bienvenido`)](#pantalla-de-bienvenida-bienvenido)
  - [Pantalla principal (`/principal`)](#pantalla-principal-principal)
  - [Internacionalización](#internacionalización)
- [Scripts disponibles](#scripts-disponibles)
- [Recursos estáticos](#recursos-estáticos)
- [Solución de problemas](#solución-de-problemas)

---

## Requisitos

- **Node.js** 20 o superior (recomendado 22+)
- **pnpm** (el proyecto usa `pnpm@12.11.2` como gestor de paquetes)

```bash
npm install -g pnpm
```

## Instalación

Clona el repositorio e instala las dependencias:

```bash
git clone <URL-del-repositorio>
cd primeraAplicacion
pnpm install
```

## Uso

### Servidor de desarrollo

```bash
pnpm start
```

o, de forma equivalente:

```bash
pnpm ng serve
```

Abre el navegador en **http://localhost:4200/**. La ruta raíz `/` redirige automáticamente a `/bienvenido`.

La aplicación se recarga automáticamente al modificar los archivos fuente.

### Navegación entre pantallas

El flujo **no está automatizado**: el formulario de inicio de sesión no redirige al menú principal aunque las credenciales sean válidas.

1. Abre **http://localhost:4200/bienvenido** (o simplemente `/`).
2. Una vez en la pantalla de bienvenida, **cambia manualmente la URL** en la barra del navegador a:

   ```
   http://localhost:4200/principal
   ```

3. Para regresar, cambia la URL a `/bienvenido` o haz clic en la tarjeta **Cerrar sesión** dentro del menú principal.

### Compilación

```bash
pnpm build
```

Los artefactos se generan en `dist/primeraAplicacion/`. Por defecto se usa la configuración de producción (optimizada).

Para una compilación en modo desarrollo con recarga de cambios:

```bash
pnpm watch
```

### SSR (producción)

El proyecto está configurado con SSR (`outputMode: "server"`). Tras compilar:

```bash
pnpm build
pnpm serve:ssr:primeraAplicacion
```

El servidor Express escucha por defecto en **http://localhost:4000**. Puedes cambiar el puerto con la variable de entorno `PORT`:

```bash
PORT=8080 pnpm serve:ssr:primeraAplicacion
```

### Pruebas unitarias

```bash
pnpm test
```

Se ejecutan con [Vitest](https://vitest.dev/) mediante el builder `@angular/build:unit-test`.

---

## Estructura del proyecto

```text
primeraAplicacion/
├── public/                         # Recursos estáticos servidos tal cual
│   ├── favicon.ico
│   ├── iconos/                     # Iconos SVG de la interfaz
│   │   ├── AvisoPrivacidad.svg
│   │   ├── Background.svg
│   │   ├── Cerrar sesion.svg
│   │   ├── Notificaciones.svg
│   │   ├── Pantera.svg
│   │   ├── Registro.svg
│   │   ├── Usuario.svg
│   │   └── Visualizar.svg
│   ├── imagenes/
│   └── lenguajes/                  # Traducciones i18n
│       ├── es.json                 # Español
│       └── en.json                 # Inglés
├── src/
│   ├── app/
│   │   ├── componentes/
│   │   │   ├── bienvenido/         # Pantalla de inicio de sesión
│   │   │   │   ├── bienvenido.ts
│   │   │   │   ├── bienvenido.html
│   │   │   │   ├── bienvenido.css
│   │   │   │   └── bienvenido.spec.ts
│   │   │   └── principal/          # Menú principal con tarjetas
│   │   │       ├── principal.ts
│   │   │       ├── principal.html
│   │   │       ├── principal.css
│   │   │       └── principal.spec.ts
│   │   ├── app.ts                  # Componente raíz
│   │   ├── app.html                # Plantilla raíz (<router-outlet />)
│   │   ├── app.css
│   │   ├── app.config.ts           # Configuración del cliente (router, HTTP, i18n)
│   │   ├── app.config.server.ts    # Configuración del servidor (SSR)
│   │   ├── app.routes.ts           # Definición de rutas del cliente
│   │   ├── app.routes.server.ts    # Modo de renderizado del servidor
│   │   └── app.spec.ts
│   ├── main.ts                     # Punto de entrada del navegador
│   ├── main.server.ts              # Punto de entrada del servidor
│   ├── server.ts                   # Servidor Express para SSR
│   ├── index.html                  # Documento HTML principal
│   └── styles.css                  # Estilos globales
├── .vscode/                        # Configuración de VS Code (tareas, launch)
├── cypress/                        # Carpeta reservada para pruebas E2E
├── angular.json                    # Configuración de Angular CLI
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.spec.json
├── .prettierrc                     # Configuración de formato de código
└── README.md
```

> Las carpetas `node_modules/`, `dist/` y `.angular/cache/` se generan automáticamente y no forman parte del código fuente.

---

## Rutas

| Ruta          | Componente   | Descripción                                             |
| ------------- | ------------ | ------------------------------------------------------- |
| `/`           | —            | Redirige a `/bienvenido`                                |
| `/bienvenido` | `Bienvenido` | Pantalla de inicio de sesión                            |
| `/principal`  | `Principal`  | Menú principal con tarjetas de opciones                 |
| `/registro`   | —            | **No implementada** (se habilitará en una etapa futura) |

La navegación de `/bienvenido` a `/principal` es **manual** (ver [Navegación entre pantallas](#navegación-entre-pantallas)).

---

## Funcionalidades

### Pantalla de bienvenida (`/bienvenido`)

- Formulario reactivo con los campos **correo electrónico** y **contraseña**.
- Validaciones:
  - Campos obligatorios.
  - Formato de correo mediante expresión regular.
- Botón con icono para **mostrar/ocultar la contraseña**.
- Mensajes de error traducidos al idioma activo.
- Casilla **Recuérdame** (solo visual).
- Botones para cambiar entre **Español** e **Inglés**.
- Al enviar el formulario:
  - Si es válido, se muestra la alerta `Se inició sesión correctamente`.
  - Si no es válido, se marcan todos los campos como tocados y se muestra `Datos incorrectos`.

### Pantalla principal (`/principal`)

Menú con seis tarjetas:

| Tarjeta              | Acción                                  |
| -------------------- | --------------------------------------- |
| Mi cuenta            | Sin acción (pendiente)                  |
| Registro             | Intenta navegar a `/registro` (no existe aún) |
| Notificaciones       | Sin acción (pendiente)                  |
| ChatBot              | Sin acción (pendiente)                  |
| Aviso de privacidad  | Sin acción (pendiente)                  |
| Cerrar sesión        | Navega a `/bienvenido`                  |

También incluye el selector de idioma **Español / English**.

### Internacionalización

- Se usa `@ngx-translate/core` con `@ngx-translate/http-loader`.
- Los archivos de traducción viven en `public/lenguajes/` y se cargan desde `/lenguajes/<idioma>.json`.
- Idioma por defecto: **español** (`es`), con `es` como idioma de respaldo.
- Para agregar un idioma:
  1. Crea `public/lenguajes/<codigo>.json` con las mismas claves.
  2. Añade un botón que llame a `cambiarIdioma('<codigo>')` en las plantillas.
- Claves disponibles: `TITLE`, `LOGIN`, `EMAIL`, `PASSWORD`, `REMEMBER_ME`, `ACCESS`, `FORGOT_PASSWORD`, `REQUIERED`, `MY_ACCOUNT`, `REGISTER`, `NOTIFICATIONS`, `CHATBOT`, `PRIVACY_NOTICE`, `LOGOUT`.

---

## Scripts disponibles

| Comando                               | Descripción                                        |
| ------------------------------------- | -------------------------------------------------- |
| `pnpm start` / `pnpm ng serve`        | Inicia el servidor de desarrollo en el puerto 4200 |
| `pnpm build`                          | Compila la aplicación para producción              |
| `pnpm watch`                          | Compila en modo desarrollo y observa cambios       |
| `pnpm test`                           | Ejecuta las pruebas unitarias con Vitest           |
| `pnpm serve:ssr:primeraAplicacion`    | Sirve la compilación SSR con Express (puerto 4000) |

Generación de componentes con Angular CLI:

```bash
pnpm ng generate component componentes/nombre-componente
```

Para ver todos los esquemas disponibles:

```bash
pnpm ng generate --help
```

---

## Recursos estáticos

Todo lo que se coloque en `public/` se sirve desde la raíz del sitio:

- Iconos: `/iconos/<nombre>.svg`
- Traducciones: `/lenguajes/<idioma>.json`
- Imágenes: `/imagenes/<archivo>`

Esto está configurado en `angular.json` dentro de `projects.primeraAplicacion.architect.build.options.assets`.

---

## Solución de problemas

- **La raíz `/` no carga:** verifica que el servidor esté corriendo en http://localhost:4200 y que hayas ejecutado `pnpm install`.
- **No veo la pantalla principal después de iniciar sesión:** es el comportamiento esperado; cambia la URL manualmente a `/principal`.
- **Las traducciones no cargan:** confirma que `public/lenguajes/es.json` y `en.json` existan y que la aplicación se sirva desde la raíz (`<base href="/">`).
- **La tarjeta "Registro" no hace nada:** la ruta `/registro` aún no está implementada; se habilitará en una etapa posterior.
- **Puerto ocupado:** usa otro puerto, por ejemplo `pnpm start -- --port 4300`, o para SSR `PORT=4300 pnpm serve:ssr:primeraAplicacion`.

---

## Recursos adicionales

- [Angular CLI](https://angular.dev/tools/cli)
- [Angular SSR](https://angular.dev/guide/ssr)
- [ngx-translate](https://github.com/ngx-translate/core)
- [Vitest](https://vitest.dev/)
