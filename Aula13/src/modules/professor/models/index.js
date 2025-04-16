const { DataTypes } = require('sequelize')
const sequelize = require('../../../config/configDb')

const Professor = sequelize.define('Professor', {

    matricula: {
        type: DataTypes.CHAR(8),
  primaryKey: true,
  validate:{
    is:{
        args: /^[A-Za-z][0-9]{7}$/,
        msg: 'A matricula deve comecar com uma letra e ter mais de sete numeros'
    }
  }
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull:false,
        validate:{
            len:{
                args:[100]
            }
        }
    },
    email: {
        type: DataTypes.STRING(100),
allowNull: false,
        unique: true,
        validate:{
            isEmail:{
                msg: 'Forneça um e-mail valido!'
            }
        }
    },

    senha: {
        type: DataTypes.CHAR(10),
        allowNull: false,
        validate:{
            args: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{10}$/,
            msg: 'A senha deve conter dez caracteres com no minimo uma letra maiuscula e numeros'
        }

    },
})

module.exports = Professor;