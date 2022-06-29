const express = require('express');
const { Router } = express;
const Api = require("./api.js");

const app = express();
const router = Router();

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Server http listening in port ${server.address().port}`)
})
server.on("error", error => console.log(`Error in server ${error}`));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/static', express.static(__dirname + '/public'));
app.set("views", "./views");
app.set("view engine", "pug");

let products = [
    {
        "title": "Computer",
        "price": "$70.000",
        "thumbnail": "http://medias.musimundo.com/medias/00454003-177631-177631-01.png-177631-01.png-size515?context=bWFzdGVyfGltYWdlc3wxNDg0MzZ8aW1hZ2UvcG5nfGg5YS9oYjYvMTAzODE1ODkyMTczMTAvMDA0NTQwMDMtMTc3NjMxLTE3NzYzMV8wMS5wbmctMTc3NjMxXzAxLnBuZ19zaXplNTE1fDdjNzU4NGRkMjBjMjdhYjBlZWI3YzYxMjc0NmNlYzE4ODhkODU5Nzc5NjMwMGVhZTNmNzYzNmUyMDVhMzU5YjQ",
        "id": 1
    },

    {
        "title": "Television",
        "price": "$90.000",
        "thumbnail": "http://medias.musimundo.com/medias/00436001-144197-144197-01-144197-01.jpg-size515?context=bWFzdGVyfGltYWdlc3w1NDgxNHxpbWFnZS9qcGVnfGhiOC9oNzcvMTAzODA5MDMyNTE5OTgvMDA0MzYwMDEtMTQ0MTk3LTE0NDE5N18wMS0xNDQxOTdfMDEuanBnX3NpemU1MTV8NWRmNDk5OTcxYjNlZDUxYTYzZTQ5ZTk3MzU3MTRhNzEwNjk5YjczZjk0ZTRmMGIzZTUxMzlkY2E5OWFlYTdjYg",
        "id": 2
    },
    
    {
        "title": "Cellphone",
        "price": "$40.000",
        "thumbnail": "http://medias.musimundo.com/medias/00510014-145437-145437-01-145437-01.jpg-size515?context=bWFzdGVyfGltYWdlc3w3NzEwMnxpbWFnZS9qcGVnfGgwOS9oODQvMTAzOTA4NTMxMjQxMjYvMDA1MTAwMTQtMTQ1NDM3LTE0NTQzN18wMS0xNDU0MzdfMDEuanBnX3NpemU1MTV8NWViNDJlZDUwZDU1YWZmYWQ4Yjc4NTMxZTUwZTI0NGRkNjViNjE0ZmRmMTMwMDJhODc5NGI2YmMyM2I2ZDkzNQ",
        "id": 3
    }
];

const newProd = new Api(products);

app.get('', (req, res)=>{
    const data = {products}
    return res.render('index', data)
})

app.get('/products', (req, res)=>{
    const data = {products}
    return res.render('products', data)
})


router.post('/products', (req, res)=>{
    return newProd.postProd(req,res);
});

router.get('/', (req, res)=>{
    const data = {products}
    return res.render('index', data)
});

app.use('/api', router);