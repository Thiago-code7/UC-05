const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

const Professor = sequelize.define('Professor', {
  matricula: {
    type: DataTypes.STRING(8),
    primaryKey: true,
    allowNull: false
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'professores',
  createdAt: 'criado_em',
  updatedAt: 'atualizado_em'
});

module.exports = Professor;


