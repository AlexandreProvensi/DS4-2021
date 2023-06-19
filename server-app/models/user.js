module.exports = (sequelize, DataType) => {
  const User = sequelize.define('user', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    email: {
      type: DataType.STRING,
      allowNull: false
    },

    senha: {
      type: DataType.STRING,
      allowNull: false,
    },

    nome: {
      type: DataType.STRING,
      allowNull: false
    },

    telefone: {
      type: DataType.STRING,
      allowNull: false
    },

    //1 - Administrador, 2 - Usuário, 3 - Profissional
    tipo_acesso: {
      type: DataType.INTEGER,
      allowNull: false,
      defaultValue: 2
    },

    data_cadastro: {
      type: DataType.DATE,
      allowNull: false,
      defaultValue: DataType.NOW
    }
  });

  return User;
};