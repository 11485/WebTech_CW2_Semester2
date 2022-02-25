let express = require('express')
let fs = require('fs')
let path = require('path')
let bodyParser = require('body-parser')
const { json } = require('express')
let app = express()

app.set('view engine', 'pug')

app.use('/static', express.static(path.join(__dirname, 'public', 'styles')))
app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    let id = req.params.id
    let posts = JSON.parse(fs.readFileSync('Tasks_file.json'))
    res.render(path.join(__dirname, 'views', 'index'), { allTasks: posts })
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

app.post('/add-new/to-do', (req, res) => {
    let form = req.body

    if (form.title.length > 2 & form.text.length > 5 ){
        var d = new Date()
        let newtask = {
            id: uid(),
            title: form.title,
            text: form.text,
            status: 'to-do',
            time: {
                LocalTime: d.toLocaleTimeString(),
                Day: d.getDate(),
                LocalDate: d.toLocaleDateString()
            }
        }

        try{
            let taksavailable = JSON.parse(fs.readFileSync('Tasks_file.json'))
            taksavailable.push(newtask)
            fs.writeFileSync('Tasks_file.json', JSON.stringify(taksavailable))
            let success = true
            res.redirect('/')
        }catch{
            res.send("error")
        }
    }
    else{
        res.render(path.join(__dirname, 'views', 'to-do-add.pug'),{error: true})
    }
})


app.get('/add-new/to-do', (req, res) => {
    
    res.render(path.join(__dirname, 'views', 'to-do-add.pug'))
    
})

// /////////////////////////////////////////////////////

app.get('/add-new/progress', (req, res) => {
    res.render(path.join(__dirname, 'views', 'progress-add.pug'))
})

app.post('/add-new/progress', (req, res) => {
    let form = req.body
    var d = new Date()
    if (form.title.length > 2 & form.text.length > 5 ){
        let newtask = {
            id: uid(),
            title: form.title,
            text: form.text,
            status: 'progress',
            time: {
                LocalTime: d.toLocaleTimeString(),
                Day: d.getDate(),
                LocalDate: d.toLocaleDateString()
            }
        }
    
        try{
            let taksavailable = JSON.parse(fs.readFileSync('Tasks_file.json'))
            taksavailable.push(newtask)
            fs.writeFileSync('Tasks_file.json', JSON.stringify(taksavailable))
            let success = true
            res.redirect('/')
        }catch{
            res.send("error")
        }
    }else{
        res.render(path.join(__dirname, 'views', 'progress-add.pug'),{error: true})
    }
})


app.get('/add-new/completed', (req, res) => {
    res.render(path.join(__dirname, 'views', 'completed-add.pug'))
})

app.post('/add-new/completed', (req, res) => {
    let form = req.body
    var d = new Date()
    let newtask = {
        id: uid(),
        title: form.title,
        text: form.text,
        status: 'completed',
        time: {
            LocalTime: d.toLocaleTimeString(),
            Day: d.getDate(),
            LocalDate: d.toLocaleDateString()
        }
    }

    try{
        let taksavailable = JSON.parse(fs.readFileSync('Tasks_file.json'))
        taksavailable.push(newtask)
        fs.writeFileSync('Tasks_file.json', JSON.stringify(taksavailable))
        let success = true
        res.redirect('/')
    }catch{
        res.send("error")
    }
})

app.get('/to-do/remove', (req, res) => {
    res.send("SOON")
})


app.get('/add-new/progress', (req, res) => {
    res.send("soon progress")
})
app.get('/add-new/completed', (req, res) => {
    res.send("soon completed")
})

app.get('/settings', (req, res) => {
    res.send('<h1>Settings ,To be added soon!</h1>')
})

app.get('/logout', (req, res) => {
    res.send('<h1>Log out ,To be added soon!</h1>')
})

app.listen(3000)

function uid() {
    return Math.random().toString(36).substr(2, 9) ;
  };
