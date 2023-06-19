module.exports = (sequelize, DataType) => {
  const Profissional = sequelize.define('profissionais', {
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
      allowNull: false
    },

    cpf: {
      type: DataType.STRING,
      allowNull: false
    },

    comissao: {
      type: DataType.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0
    },

    usuario_id: {
      type: DataType.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },

    data_cadastro: {
      type: DataType.DATE,
      allowNull: false,
      defaultValue: DataType.NOW
    }
  });
  return Profissional;
};