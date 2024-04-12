const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");

//Database
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com o banco de dados!");
    })
    .catch((msgErro) => {
        console.log(msgErro);
    })

app.set('view engine', 'ejs');
app.use(express.static('public'));
//Body parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

//Rotas
app.get("/", (req, res) => {
    //para que eu consiga manipular as perguntas tenho que trabalhar com o model que representa a tabela perguntas (model Pergunta) e é através dele que vai fazer essa listagem
    //findAll() é responsável por procurar todas as perguntas da tabela e retornar, ele é equivalente a esse comando -> SELECT * ALL FROM nomeDaTabela (nesse casso perguntas). Feito isso para receber as perguntas utiliza o then que vai receber a lista de perguntas
    //porém quando deixa o findALL() vazio vem várias informações desnecessárias além das perguntas, para isso ser evitado tem que abrir um json e dentro dele coloca raw: true, que vai fazer uma pesquisa "crua" pelos dados e apenas trazer os dados e nada mais
    Pergunta.findAll({ raw: true, order: [
        //o order vai definir a regra de ornenação, que é basicamente outro array que recebe 2 valores, o primeiro valor é o nome do campo, que no caso eu vou ordenar pelo id e o segundo valor é se vai ser decrescente (DESK) ou crescente (ASC)
        ['id', 'DESC']
    ] }).then(perguntas => {
        //feito a busca pelos dados agora eu quero que eles sejam mandados para o frontend no endex dentro do views, antes o "res.render("index");" estava para fora do then, agora foi colocado para dentro, dentro dele abriu um json e estou criando uma variável perguntas que recebe as perguntas que vem do banco de dados. Agora consigo usar essa variável perguntas dentro do view index
        res.render("index", {
            perguntas: perguntas
        });
    });
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
})

app.post("/salvarpergunta", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    //depois de criado o banco de dados, quero pegar os dados que estou recebendo desse formulário e salvar no banco de dados. Como é um formulário de perguntas quero salvar dentro da tabela de perguntas, mas para manipular uma tabela no sequelize precisa importar o model dessa tabela (model.exports = Pergunta;)
    Pergunta.create({
        //o método create é o método responsável por salvar uma pergunta no banco de dados, dentro dele vai passar os campos que foram criados dentro da tabela. Nesse caso o campo titulo recebe a variável titulo (que está logo acima) e a descricao recebe a variável descricao
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        //se eu quiser fazer alguma coisa após a pergunta ser criada faz o then. Nesse caso quando a pergunta for salva eu qeuro redirecionar o usuário para a minha página principal
        //dentro do redirect coloca o caminho da rota desejada
        res.redirect("/");
    });
    //feito isso, dentro do meu localhost:8000/perguntar fiz uma pergunta com descrição, assim que apertei no botão redirecionou para a página principal, indicando que tudo aconteceu com sucesso e fica salvo dentro do MySQL workbench
});

app.get("/pergunta/:id", (req, res) => {
    //agora quero que tenha uma página exclusiva da pergunta, para isso o usuário teria que colocar essa rota com o id da pergunta
    var id = req.params.id;
    //agora que peguei o id posso fazer uma busca no banco de dados por esse id que o usuário digitou. QUero fazer uma busca por perguntas, que estão salvas na tabela perguntas, que é representada ao model Pergunta
    //o findOne() é um método do sequelize que vai buscar no banco de dados um dado, ele deve buscar um dado com uma condição, nesse caso eu quero achar uma pergunta que tenha o id igual a variável id. Dentro dele tem que abrir um json, dentro coloca where: {nome-do-campo-que-quero-pesquisar : valor-que-quero-comparar}
    Pergunta.findOne({
        where: {id: id} //ou seja, quero buscar no banco de dados uma pergunta que tenha o id igual a minha variável id
        //o where consegue fazer buscar através de condições e pode comparar qualquer campo
    }).then(pergunta => {
        //then é uma função que vai rodar após o model fazer a pesquisa, mas ele pode não achar a pergunta e o then é chamado da mesma forma com a variável pergunta nula, então tem que verificar antes se a pergunta é diferente de undefined
        if(pergunta != undefined) {
            //se for diferente de undefined significa que ela existe e a pergunta foi encontrada
            //vou criar um novo arquivo ejs para que quando a pergunta for encontrada redirecione para página da pergunta específica
            res.render("pergunta", {
                //quero passar os dados da pergunta que foi encontrada para a nova view, dentro desse res.render que é a função que renderiza a view na tela, dentro dela passei a variável pergunta para essa view
                pergunta: pergunta
            });
        } else {
            //pergunta não encontrada, pergunta undefined/nula e vai redirecionar para a página principal
            res.redirect("/");
        }
    });
});

app.post("/responder", (req, res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    
});

app.listen(8080, ()=>{console.log("App rodando");});