const Sequelize = require("sequelize");
const connection = require("./database");

const Resposta = connection.define("respostas", {
    corpo: {
        //o corpo seria a parte de texto da resposta, toda resposta precisa de um corpo
        type: Sequelize.TEXT,
        allowNull: false
    },
    perguntaId: {
        //campo de pergunta, toda resposta vai pertencer/responder a uma pergunta. Preciso de uma forma para saber qual pergunta estou respondendo, representado pela perguntaId, esse campo vai guardar o id da pergunta que essa resposta está respondendo
        //portanto, quando eu respondo alguma pergunta a minha resposta vai ficar salva no corpo e a perguntaId vai ser o id da pergunta que foi respondida -> relacionamento cru
        type: Sequelize.INTEGER, //tipo INTEGER pois ele é um número inteiro
        allowNull: false
    }
    //isso tudo é um relacionamento pois estou relacionando uma tabela com a outra, nesse caso relacionando a tabela de pergunta com a de respostas
});

Resposta.sync({ fprce: false });

module.exports = Resposta;