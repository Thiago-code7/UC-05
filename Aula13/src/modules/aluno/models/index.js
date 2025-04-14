const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/configDb')

const Aluno = sequelize.define(
  'Aluno',
  {
    
    matricula: {
      type: DataTypes.CHAR(5),
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(60),
      allowNull: false,
      unique: true,
      validate:{
         isEmail:{
           msg: 'Forneça um e-mail valido!'
         },
      len:{
         args: [3,60],
         msg: 'O e-mail deve ter no minimo 10 caracteres e no maximo 60!'
      }
      }
    },
    senha:{
      type: DataTypes.STRING(10),
      allowNull: false,
      validate:{
         len:{
            args:[10],
            msg: 'A senha deve ter 10 caracteres!'
         },
        
      }
    },
    turma_id:{
     type: DataTypes.INTEGER,
     allowNull: false,
     references
      
    }
  },
  {
   tableName: 'aluno',
   createdAt: 'criado_em',
   updatedAt: 'atualizado_em'
  },
);

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true