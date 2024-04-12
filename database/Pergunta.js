const Sequelize = require("sequelize");
const connection = require("./database");

//model, para poder criar um model tem que chamar a conexão, dentro do define vai definir o nome da tabela. Feito isso abre um json e dentro dele começa a definir os campos: {nome do campo: tipo}
//também é preciso passar um segundo json, que é o json de opções mas pode passar ele vazio ou não passar
const Pergunta = connection.define('perguntas', {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false //impede que o campo receba valores nulos
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});
//o tipo string é para textos curtos e o tipo text é para textos longos

//para de fato criar a tabela no banco. Vai sincronizar o que foi criado em Pergunta com o banco de dados, se no meu banco de dados não existe uma tabela chamada pergunta ele vai criar 
//o force significa que ele não vai forçar a criação da tabela caso ela exista, ou seja ele não vai recriar a tabela
//o then é executado quando a tabela é criada
Pergunta.sync({force: false}).then(() => {});

module.exports = Pergunta;