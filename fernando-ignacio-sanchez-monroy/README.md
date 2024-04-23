# Nombre del Proyecto

Este es un proyecto de API REST para gestionar productos de una tienda de comercio electrónico. Proporciona endpoints para la creación, actualización, eliminación y obtención de productos, así como la implementación de seguridad mediante tokens de acceso.

## Requisitos previos

Antes de ejecutar este proyecto, asegúrate de tener instalado lo siguiente:

- Node.js (versión 12 o superior)
- MySQL (versión 5.7 o superior)

## Configuración

Sigue estos pasos para configurar y ejecutar el proyecto:

1. Clona este repositorio en tu máquina local:

git clone <https://github.com/Fernando-SM/Examen-Express>

2. Navega hasta la carpeta del proyecto:

cd <fernando_ignacio_sanchez_monroy>

3. Instala las dependencias del proyecto:

npm install 

4. Configura las variables de entorno:
- Crea un archivo `.env` en la raíz del proyecto.
- Agrega las siguientes variables de entorno y proporciona los valores correspondientes:
  ```
  DB_HOST=<host_de_la_base_de_datos>
  DB_PORT=<puerto_de_la_base_de_datos>
  DB_USER=<usuario_de_la_base_de_datos>
  DB_PASSWORD=<contraseña_de_la_base_de_datos>
  DB_NAME=<nombre_de_la_base_de_datos>
  JWT_SECRET=<clave_secreta_para_jwt>
  ```

5. Crea la base de datos y las tablas necesarias:
- Ejecuta el script SQL `tablas.sql` en tu servidor MySQL para crear la estructura de la base de datos.

6. Inicia el servidor:

npm start

7. La API estará disponible en `http://localhost:3001`.

## Endpoints

La API proporciona los siguientes endpoints:

- `POST /login`: Inicia sesión y obtiene un token de acceso.
- `GET /products`: Obtiene todos los productos (requiere autenticación).
- `GET /products/:id`: Obtiene un producto por su ID (requiere autenticación).
- `POST /products`: Crea nuevos productos (requiere autenticación).
- `PUT /products`: Actualiza productos existentes (requiere autenticación).
- `DELETE /products`: Elimina productos (requiere autenticación).

Para las solicitudes que requieren autenticación, se debe incluir el token de acceso en el encabezado `Authorization` de la siguiente manera:

Authorization: Bearer <token_de_acceso>

## Ejemplos de uso

A continuación se muestran algunos ejemplos de cómo utilizar los endpoints de la API:

### Iniciar sesión

POST /login
Content-Type: application/json
{
"username": "admin",
"password": "password"
}

Respuesta exitosa:
```json
{
  "token": "<token_de_acceso>"
}

Obtener todos los productos

GET /products
Authorization: Bearer <token_de_acceso>

Respuesta exitosa:

[
  {
    "id": 1,
    "name": "Producto 1",
    "description": "Descripción del producto 1",
    "height": 10.5,
    "length": 20.0,
    "width": 15.0
  },
  ...
]

Crear nuevos productos

POST /products
Authorization: Bearer <token_de_acceso>
Content-Type: application/json

[
  {
    "name": "Nuevo producto 1",
    "description": "Descripción del nuevo producto 1",
    "height": 8.0,
    "length": 12.0,
    "width": 10.0
  },
  {
    "name": "Nuevo producto 2",
    "description": "Descripción del nuevo producto 2",
    "height": 5.5,
    "length": 8.0,
    "width": 6.0
  }
]

Respuesta exitosa:

{
  "message": "Productos creados exitosamente",
  "insertedIds": [4, 5]
}