# Firebase atentication

## using CDN and

`<script src="https://www.gstatic.com/firebasejs/ui/4.8.0/firebase-ui-auth.js"></script>

<link type="text/css" rel="stylesheet" href="https://www.gstatic.com/firebasejs/ui/4.8.0/firebase-ui-auth.css" />`

## Firbase para agular

En angular aparte de hacer la intalcion del sdk, como se vio en confgurción del proyecto tambien se puede utilizar la libreia de angular fire https://github.com/angular/angularfire

- Documentacion https://github.com/angular/angularfire/blob/master/docs/install-and-setup.md

1. (opcioal) Instamos angular y creamos proyecto ( si no se ha hecho ) `npm install -g @angular/cli && ng new <project-name> && cd roject-name>`
2. hacemos la respectiva intalacion `ng add @angular/fire`
3. Configramos la variables, para ello modificamos _enviroments.ts_. como se muestra en la [Documentacion](https://github.com/angular/angularfire/blob/master/docs/install-and-setup.md), con la llave firebase
4. Configurar modulo root (app.module.ts) , con AngularFireModule e iniclizar pasando el objeto de configuración
5. $ npm install firebase firebaseui @angular/fire firebaseui-angular --save
   https://github.com/angular/angularfire/blob/master/docs/auth/getting-started.md

6 Se intalar angular fireui

### firbase Ui

# otras alternativa

https://github.com/adba98/restserver
https://developers.google.com/identity/sign-in/web/sign-in (sigin in)

# Autenticacion con firebase

https://firebase.google.com/docs/auth/where-to-start?authuser=0
