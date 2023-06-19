module.exports = (sequelize, DataType) => {
  const Servico = sequelize.define('servicos', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    nome: {
      type: DataType.STRING,
      allowNull: false
    },

    descricao: {
      type: DataType.STRING,
      allowNull: true
    },

    duracao: {
      type: DataType.INTEGER,
      allowNull: true
    },

    preco: {
      type: DataType.DECIMAL(10, 2),
      allowNull: false
    },

    data_cadastro: {
      type: DataType.DATE,
      allowNull: false,
      defaultValue: DataType.NOW
    }
  });
  return Servico;
};