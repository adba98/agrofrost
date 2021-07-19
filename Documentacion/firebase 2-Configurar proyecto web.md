# Para hacer un aintegacion completa con angular

Existen libretias para SDK cliente o de adminitracion, y para cada tecnologia cliente (web, unity .....) o admin (node, java, go..) framework
**Con el SDK de Admin, puedes leer y escribir datos de Realtime Database con todos los privilegios de administrador o con privilegios limitados con mayor nivel de detalle
**

- https://firebase.google.com/docs/libraries?hl=es

# creadenciales web para usar sdk de firebae

El SDK de firebae para web se puede utilizar por medio de

- CDN
- npm package https://www.npmjs.com/package/firebase
- Bower package

El caso nuestro se usara
`npm install firebase`

### Credenciales

Para crear una apliacion web,

1. se debe añadir una app, para eello ve a configuraciion de protyecto o en la ventana principal debajo del nombre).
2. Puedes crear la app con el nombre-proyecto-web para diferencair la aplicacióny le das registrar _(Tambien se puede vincular un hostig, sin embargo, si lo estas haciebdo por medio de git, puede salta este paso )_

3. esto le geerar un codigo javascriot que apunta al sdk de firebae, donde tendra informacion como apiKeym authDomain, databaseURl,......, projectID, appId .. Le das ir a consola
4. Pedira información como correo de asistencia, zona para usar GCP
5. Hay dos alternativas paa vincular y Configuración del SDK

- CDN: Tieene los script por medio de CDN necesarios para utlizar el proyecto , mas las credenciales
- Configuaración: Tiene todas las credeciales

# para facebook

https://developers.facebook.com/docs/facebook-login/web

- se debe crear una cuenta desarrollador y crear una aplicacion En configuraciones basico se optiene la llave secreta y el id de aplicacion de facebook
