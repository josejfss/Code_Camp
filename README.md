# CODE CAMP - OPTIMA TECNOLOGIA

## Archivos y carpetas dentro del repositorio

- Carpetas 
    - back_end: En esta carpeta se encuentra toda la lógica del backend desarrollado en Node.js utilizando *sequalize* para realizar las peticiones al servidor de base de datos de *SQL SERVER*. Esta carpeta está distribuida de la siguiente forma:

        - encryption: En esta carpeta encontrará los siguientes archivos: *encriptar.js* que contiene funciones para encriptar y desencriptar la contraseña del usuario; *jwt.js* posee funciones para el manejo correcto de JSON Web Token (JWT).

        - middleware: En esta carpeta encontrará los siguientes archivos: *auth.js* archivo que contiene funciones para verificar la atenticidad del usuario dentro del API; *role_auth* tiene la funcionalidad para verificar los permisos del usario para poder acceder a recursos exclusivos para administradores.

        - routes: En está carpeta encontrará una serie de carpetas con nombres que harán referencia a un grupo de enpoints y una serie de archivos de JAVASCRIPT con el nombre que hará referencia al ENDPOINT desarrollado.

        - uploads: Es una carpeta dedicada para cargar temporalmente los archivos al servidor para posteriormente estos sean subidos a un bucket (S3) de AWS.

        - index.js: Encontrará configuraciones como el puerto y el llamado al server de express para su ejecución

        - require_glob.js: Esté archivo contiene la configuración para poder trabajar las diferentes rutas de la api en carpetas como se describió en la carpeta *routes*.

        - server.js: Encontrará configuraciones esenciales del servidor. Por ejemplo: configuración de cabeceras y cors, manejo de time out, entre otras configuraciones.

- Archivos:
    - Archivos con extensión *.sql*: Archivos utilizado para DDL, DML de la base de datos.
    - ER de tienda.mwb: Este archivo se encuentra el diagrama actualizado de la base de datos utilizado para este proyecto. El software compatible para abrir el diagrama es *MySQL Workbench*