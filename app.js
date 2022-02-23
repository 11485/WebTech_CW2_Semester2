let express = require('express')
let fs = require('fs')
let path = require('path')
let bodyParser = require('body-parser')
let app = express()

app.set('view engine', 'pug')
app.use('/task/:taskstatu/:taskid', express.static(path.join(__dirname, 'public', 'styles')))
app.use('/', express.static(path.join(__dirname, 'public', 'styles')))
app.use(bodyParser.urlencoded({extended: false}))

app.get('/', (req, res) => {
    let id = req.params.id
    let posts = JSON.parse(fs.readFileSync('Tasks_file.json'))
    res.render(path.join(__dirname, 'views', 'index'), { students: posts })
    // res.redirect("/logins")
})

app.get('/about', (req, res) => {
    res.render(path.join(__dirname, 'views', 'about'))
})

app.get('/task/:taskstatu/:taskid', (req, res) => {
    let id = req.params.taskid
    let status = req.params.taskstatus
    let tasks = JSON.parse(fs.readFileSync('Tasks_file.json'))
    .filter(item => item.id == id)[0]
    res.render(path.join(__dirname, 'views', 'task'), { task : tasks })
})

app.get('/logins', (req, res) => {
    // let id = req.params.userid
    // let users = JSON.parse(fs.readFileSync('users_account_info.json')).filter(item => item.id == id)[0]
    res.render(path.join(__dirname, 'views', 'login'))
})


// app.post('/account', (req, res) => {
//     let username = req.body.userUsername.trim()
//     if (username.length < 2){
//         res.render(path.join(__dirname, 'views', 'login'), {error: true})
//     }else{
//         res.render(path.join(__dirname, 'views', 'login'), {error: false})
//     }
// })

app.get('/new-task/to-do', (req, res) => {
    res.send("soon todo")
})

app.get('/new-task/progress', (req, res) => {
    res.send("soon progress")
})

app.get('/new-task/completed', (req, res) => {
    res.send("soon completed")
})

// app.get('/new-task/:taskstatus', (req, res) => {
//     let status = req.params.taskstatus
//     if (status == 'to-do'){
//         res.send("<h1>Adding data to " +"<em>TO-DO</em>" +  " list will be added soon</h1>")
//     }else if (status == 'progress'){
//         res.send("<h1>Adding data to " +"<em>PROGRESS</em>" +  " list will be added soon</h1>")
//     }else if (status == 'completed'){
//         res.send("<h1>Adding data to " +"<em>COMPLETED</em>" +  " list will be added soon</h1>")
//     }else{
//         res.send("fuck off")
//     }
// })


app.get('/settings', (req, res) => {
    res.send('<h1>Settings ,To be added soon!</h1>')
})

app.get('/logout', (req, res) => {
    res.send('<h1>Log out ,To be added soon!</h1>')
})



app.listen(3000)