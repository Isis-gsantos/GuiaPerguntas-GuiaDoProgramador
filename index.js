const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database"); //esse arquivo por sua vez exporta o objeto de conexão
const perguntaModel = require("./database/Pergunta");

//Database
connection
    .authenticate()
//o authenticate vai tentar logar no mysql e após ele tentar autenticar 2 coisas podem acontecer: ou ele vai conseguir ou vai acontecer um erro. Caso ele conseguir se conectar vai chamar a função .then(() => {}) que é chamada apenas quando a autentificação foi um sucesso e caso o erro aconteça vai chamar a função .catch((erro) => {})
    .then(() => {
        console.log("Conexão feita com o banco de dados!");
    })
    .catch((msgErro) => {
        console.log(msgErro);
    })
    //portanto, vou fazer a autentificação com a conexão, se for um sucesso executa o then e se der erro vai executar o catch -> PROMISE

app.set('view engine', 'ejs');
app.use(express.static('public'));
//Body parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

//Rotas
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
})

app.post("/salvarpergunta", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    res.send("Formulário recebido! Titulo = " + titulo + " " + " Descricao " + descricao);
});

app.listen(8080, ()=>{console.log("App rodando");});