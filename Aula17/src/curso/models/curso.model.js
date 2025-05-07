const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

const Curso = sequelize.define('Curso', {
  cod_curso: {
    type: DataTypes.STRING(4),
    primaryKey: true,
    allowNull: false,
    validate: {
      is: {
        args: /^[A-Z0-9]{4}$/,
        msg: 'O código do curso deve ter exatamente 4 caracteres alfanuméricos em maiúsculo.'
      }
    }
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: {
        args: /^[A-Za-zÀ-ÿ\s]+$/,
        msg: 'O nome deve conter apenas letras e espaços.'
      },
      len: {
        args: [3, 100],
        msg: 'O nome deve ter entre 3 e 100 caracteres.'
      }
    }
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      len: {
        args: [10, 1000],
        msg: 'A descrição deve ter entre 10 e 1000 caracteres.'
      }
    }
  }
}, {
    tableName: 'cursos',
    createdAt: 'criado_em',
    updatedAt: 'atualizado_em'
});

module.exports = Curso;


