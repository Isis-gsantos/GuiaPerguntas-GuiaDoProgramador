const Sequelize = require('sequelize');
//após importar constrói a conexão

const connection = new Sequelize('guiaperguntas', 'root', '1234@123', {
    host: 'localhost',
    dialect: 'mysql'
});
//dentro do Sequelize(') vai passar qual o nome do banco de dados que vou utilizar para se conectar com o sequelize (nesse caso foi criado um novo banco dentro do MySQL workbench), o usuário do banco de dados (que por padrão é root) e a senha. Depois vai abrir um json
//o host é onde está rodando o MySQL
//dialect é qual tipo de banco de dados que eu quero me conectar

//feito isso vou exportar a conexão para utiliza-la em outros arquivos
module.exports = connection;
//agora vou testar a conexão, isso foi feito dentro do index.js e dentro dele vou importar a conexão