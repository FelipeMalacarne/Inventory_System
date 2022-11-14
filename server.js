// imports 
const express =  require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')


// Configurar passport middleware em uma file separada
const initializePassport = require('./passport_config')
initializePassport(passport,
    email => users.find(user => user.email === email), // Acha o usuário pelo email
    id => users.find(user => user.id === id), // Acha o usuário pelo id
)

// Variables
require('dotenv').config() // set the env variables
port = 3000

const users = []


// Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))

app.use(express.urlencoded({extended: false}))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave:false, // dont resave if nothing changed
    saveUninitialized:false // dont save empty values
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

// Set Views
app.set('views', './views')
app.set('view engine', 'ejs')


// Endpoints
app.get('/', checkAuthenticated,(req, res) => {
    res.render('index.ejs')
})

// GET /login endpoint
app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login')
})

// POST /login endpoint
app.post('/login',checkNotAuthenticated,  passport.authenticate('local', {
    successRedirect: '/inventory',
    failureRedirect: '/login',
    failureFlash: true
}))

// DELETE /logout endpoint
app.delete('/logout', checkAuthenticated, (req, res, next) => {
    req.logOut((err) => {
        if (err) {
          return next(err);
        }
        res.redirect('/login');
      });
})


// GET /register endpoint
app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register')
})

// POST /register endpoint
app.post('/register', checkNotAuthenticated, async (req, res) => {
    // tenta registrar novo usuario, recarrega a página caso erro
    try{
        // Espera pelo hash do password
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        // adiciona novo usuário à variavel
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        res.redirect('/login')
    } catch(e) {
        alert(e)
        res.redirect('/register')
    }
    console.log(users);
})

app.get('/about',(req, res) => {
    res.render('about', {text: 'about page'})
})
app.get('/inventory', checkAuthenticated, (req, res) => {
    res.render('inventory', {name: req.user.name} )
})

// checa se auteticado antes de permitir a acesso à página protegida
function checkAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next){
    if (req.isAuthenticated()){
       return res.redirect('/inventory')
    }
    next()
}


// Listen on Port
app.listen(port, () => console.info(`Listening on port ${port}`))