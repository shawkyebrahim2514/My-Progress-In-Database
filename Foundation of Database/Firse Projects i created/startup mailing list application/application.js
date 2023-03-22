// ---- MySQL ----
const mysql = require('mysql2')
const databaseConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'shawky',
    database: 'mailing_list'
})

// ---- prepare the application  ----
const express = require('express')
const application = express()
const port = 3000
application.set('view engine', 'ejs')

// ---- Install body-parser to separate the request ----
var bodyParser = require('body-parser')
application.use(bodyParser.urlencoded({extended: true}))

// ---- make the application view the files in the folder 'public' ----
application.use(express.static(__dirname + '/public'));

// get the number of users from the database
var currentNumberOfUsers
application.get('/', (request, response) => {
    // get data from the database
    var query = 'select count(*) as total from users'
    databaseConnection.query(query, function (err, rows, fields) {
        if (err) throw err;
        // open index file and send to it the data received from teh database
        currentNumberOfUsers = rows[0].total;
        response.render('index', {databaseCount : currentNumberOfUsers})
    })
})

// receive data from html forms
application.post('/register', (request, response) => {
    var newPerson = {email: request.body.email}
    // insert the new user to the database
    var query = 'insert into users set ?'
    databaseConnection.query(query, newPerson, function (err, rows, fields) {
        if (err) throw err;
        // reload the main page to renew the counter number
        response.redirect('/')
    })
})

application.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})