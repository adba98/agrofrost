# Configuracion

1. Intalar cli `npm install -g firebase-tools`
2. Login `firebase login` , desplegara un apagina y con ella se procede a autenticar, tambien puedes gnerar un token u añadirlo al proyecto por medio de `firebase login:ci` y almacenarlo en una variable `FIREBASE_TOKEN`, puede tambien iniar y revocarl token po rmedio de `firebase logout --token TOKEN` (el token puede se utilizado por multiples usuarios)
3. para verificar que estas logueado `firebase projects:list`

- Referncia https://firebase.google.com/docs/cli

# Creacion del proyecto

Despues de haber creado el proyecto de angular o react, o antes podemos ejecutar el comando `firebase init` el cual nos sirve para configurar o crear un nuevo proyecto de firebase, aqui se pedira que servicios desea implementar y si desea untilizar un proyecto existente, crear uno o integrar con google cloud platafform

De acuerdo a las opciones seleccionadas pedira

## Cuanbdo tengo varios proyectos

Puedo identificar cuantos proyectos hay en nuestro pc

## Realtine database

Seleccionar en que zona desplegar el servidor

Creeara un archivo firebase.rules.json `firebase use --add` y para añadir `firebase use --add NOMBRE_PROYECTO`

## Hosting

Pedira la carpeta que se hara publica, en el caso, de usar por ejemplo angular debemos correr primero `ng build`, que generar una carpeta _dist_

1. Indicar la carpeta publica a utlilizar ( se recomienda verificar bien en ocaciones se genera en una subcarpeta)
2. Pedira sobresctibir las paginas de la carpeta como el index y 404 ( Le das que no )
3. Pedira que si deseamos rescribir las URL ( depende del framework, angular no)
4. Si etenemos autenticacion con GIthub, podemo permitir que se desplegue automaticamente

### Github (`firebase init hosting:github`)

Para inciar al proceso, pedira la autentiacaión y se almacenara un token

1. Pedira el repostorio en el formato usuario/repo `adba98/agrofrost`
2. Indicar si existe un comando a ejecutar para copliar antes del despligue, `ng build`
3. Se puede configurar los flujos de trabajo, ej, si existe un Pull Request, merge (**\*SE debe etudiar esta sección ya que no se huieron cambios en github, pero no hay cambios de la pagina **)

Creara al final .github y .firebase

10. se debe configurar y revisar el archivor .yarml, despliegeue en github actions, puede indicar un deploy con falla

Creara al final .github y .firebase

## Cloud fuction y Cloud run

- https://firebase.google.com/docs/hosting/serverless-overview

## Deploy y prubas

firebase deploy
firebase deploy --project=prod, opcionalemte puedes colocar la bandera
-m "Deploying the best new feature ever."

- https://firebase.google.com/docs/cli?authuser=0#partial_deploys
