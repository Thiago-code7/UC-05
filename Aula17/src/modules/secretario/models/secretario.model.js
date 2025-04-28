const sequelize = require("../../../config/configDb");

const { DataTypes } = require('sequelize');

const SecretarioModel = sequelize.define('SecretarioModel', {

    matricula: {
        type: DataTypes.STRING(5),
        primaryKey: true,
        validate:{
         is: {
            args: /^(?=(?:.*[A-Za-z]))(?=(?:.*\d){4,}).+$/,
            msg: 'A matrícula deve conter pelo menos uma letra e no mínimo quatro números'

         }
        }

    },

    nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate:{
            isAlpha:{
            msg: 'É permitido apenas letras!'
            }
        }
    },

    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate:{
            args:/^[a-zA-Z0-9._%+-]+@rn\.senac\.br$/,
            isEmail:{
                msg: 'E-mail invalido!, o e-mail deve pertencer ao dominio rn@senac.com.br'
            }
        }
    },

    senha: {
        type: DataTypes.STRING(12),
        allowNull: false,
        validate:{
            len:{
            args: [8,12],
            msg: 'A senha deve ter no minimo 8 e no maximo 12 caracteres.'
            },
            is:{
                args:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|-]).{8,}$/,
                msg: 'A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiuscula'

            }
        }
    }
  },
  {
  tableName: 'secretario',
  createdAt: 'criado_em',
  updatedAt: 'atualizado_em'
  },
);
module.exports = SecretarioModel


