const sequelize = require('../../../config/configDb');
const { DataTypes } = require('sequelize');

// Definição do modelo Professor
const ProfessorModel = sequelize.define('ProfessorModel', {

  // Matrícula: exatamente 5 números
  matricula: {
    type: DataTypes.CHAR(5),
    primaryKey: true,
    validate: {
      is: {
        args: /^\d{5}$/,
        msg: 'A matrícula deve conter exatamente 5 números.'
      }
    }
  },

  // Nome: obrigatório e somente com letras e espaços
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      is: {
        args: /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/i,
        msg: 'O nome deve conter apenas letras e espaços.'
      }
    }
  },

  // E-mail: único, obrigatório e deve seguir o domínio @rn.senac.br
  email: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false,
    validate: {
      is: {
        args: /^[a-zA-Z0-9._%+-]+@rn\.senac\.br$/,
        msg: 'E-mail inválido! O e-mail deve usar o domínio @rn.senac.br.'
      }
    }
  },

  // Senha: entre 8 e 12 caracteres, com critérios de segurança
  senha: {
    type: DataTypes.STRING(12),
    allowNull: false,
    validate: {
      len: {
        args: [8, 12],
        msg: 'A senha deve ter entre 8 e 12 caracteres.'
      },
      is: {
        args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%&*!])[A-Za-z\d@#$%&*!]{8,}$/,
        msg: 'A senha deve conter pelo menos uma letra maiúscula, uma minúscula, um número e um símbolo especial.'
      }
    }
  }

}, {
  tableName: 'professor',
  createdAt: 'criado_em',
  updatedAt: 'atualizado_em'
});

module.exports = ProfessorModel;

