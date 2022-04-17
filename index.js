const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
var favicon = require('serve-favicon');
const ejs = require('ejs')
const app = express();
const db = require('./config')
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(favicon('./scissors.png'));


app.get('/', (req, res) => {
    res.render("index.ejs", {
        show:false
    });
})
app.get('/*', async (req, res) => {
    const query = req.url.substring(1)
    const data = []
    await db.collection("urls").where("alias", "==", query).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const dt = {
                "id": doc.id,
                ...doc.data()
            }
            data.push(dt);
        });
    });
    if(data.length==0) {
        res.status(400).send("Bad request") 
        return
    }
    res.redirect(data[0]?.url)
})
app.post('/', async (req, res) => {
    if(req.body){
    await db.collection("urls").add(req.body)
        res.render("index.ejs", {
            show:true,
            showval:"success",
            shorturl:req.body.alias,
            msg:"  url shortened..  and can be found at /"
        });
    }
    else{
        res.render("index.ejs", {
            show:true,
            showval:"danger",
            msg:"Enter url"
        });
    }
})

app.listen(process.env.PORT || 5000, () => {
    console.log(process.env.PORT ? `Listening on port ${process.env.PORT}` : "Listening on port 5000")
})