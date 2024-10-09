<<<<<<< HEAD
## PinterestClon

Flujo de Datos:
Store: Contiene el estado global de la aplicación y proporciona funciones para acceder y actualizar el estado.
Controllers: Se comunican con el store para actualizar o acceder al estado. Llaman a los adapters para obtener o enviar datos a través de la API.
Adapters: Traducen las solicitudes de los controllers en llamadas a servicios y procesan las respuestas para devolver datos formateados a los controllers.
Services: Realizan las operaciones concretas con la API o la base de datos, como obtener o enviar datos, y manejan cualquier lógica específica relacionada con esas operaciones.

Ejemplo de Flujo:
UI: Un componente de la UI solicita la información del usuario.
Contr
oller: El controller recibe la solicitud, llama al adapter para obtener los datos del usuario.
Adapter: El adapter llama al servicio para obtener los datos de la API.
Service: El servicio realiza la llamada a la API, recibe los datos, y los devuelve al adapter.
Adapter: El adapter transforma los datos si es necesario y los devuelve al controller.
Controller: El controller actualiza el estado del store con los datos obtenidos.
Store: El estado se actualiza y la UI se vuelve a renderizar con la nueva información.
=======
Ayuda 😢😖
>>>>>>> 47d5704bb54b5e7564e89e70b39cc0ef57f79bb4
