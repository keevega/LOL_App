import express from 'express'
import dotenv from 'dotenv'
import { show_profile, search_profile } from './controllers/profile.js'
dotenv.config({path: '.env'})
// Crea la app
const app = express();

//Habilitar lectura de datos de formulario
app.use(express.urlencoded({extended: true}));

// Routing (endpoint)

app.get('/', show_profile)
app.post('/', search_profile)

// Habilitar PUG

app.set('view engine', 'pug');
app.set('views', './views');

// Carpeta Pública
app.use( express.static('public'));

// Definir un puerto y arrancar servidor

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
})