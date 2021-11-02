# Api de musica

- clonarse el repo
- Reconstruir los modulos de node con `npm install`
- Crear el archivo .env donde se encuentran las variables de entorno.
  En mi caso el archivo env, lo tengo de la siguiente manera:
  PORT=8080
  MONGODB_CNN=mongodb://localhost/music

- Tienen que tener instalado y corriendo localmente mongodb
- Usen postman para pegarle a los distintos endpoints
- Para facilidad de la prueba que haran, les facilito todos los endpoints con su body, mediante el archivo musica.postman_collection.json que exporte de postman

#### Aclaracion:

* con el tema de seguridad, si quieren creo una entidad mas llamada usuarios, la cual le hago un abm, y mediante jwt le doy seguridad a todos los endpoints
* Si precisan que suba la api a heroku y la bd a mongoatlas para tener todo en la nube me avisan y lo hago.
