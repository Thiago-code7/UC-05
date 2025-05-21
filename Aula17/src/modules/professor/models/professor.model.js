const sequelize = require('../../../config/configDb');
const { DataTypes } = require('sequelize');

const ProfessorModel = sequelize.define('ProfessorModel',{
      matricula: {
        type: DataTypes.CHAR(5),
        primaryKey: true,
        validate:{
            is:{
                args:/^i\d{4}$/,
                msg: 'A matrícula deve começar com uma letra i e ter quatro números em seguida.'
            }
        }
      },
      nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate:{
            isAlpha:{
                msg:'É permitido apenas letras!'
            }
        }
      },
      email:{
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false, 
        validate:{
            is:{
                args:/^[a-zA-Z0-9._%+-]+@edum\.rn\.senac\.br$/                ,
                msg:'E-mail invalido! O e-mail deve pertencer ao dominio @rn.senac.br'
            },
            isNumeric:{
              msg:'É permitido apenas números!'
            }
        }
      },
      senha:{
        type: DataTypes.STRING(12),
        allowNull: false,
        validate:{
            len:{
                args: [8, 12],
                msg: 'A senha deve ter no mínimo 8 e no máximo 12 caracteres.'
            },
            is:{
                args:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%&*!])[A-Za-z\d@#$%&*!]{8,}$/,
                msg: 'A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um símbolo especial (@, #, $, %, &, , !).'
            }
        }
      },
      
    },
    {
        tableName:'professor',
        createdAt: 'criado_em',
        updatedAt: 'atualizado_em'
    }
  );

  module.exports = ProfessorModel


