module.exports = (sequelize, DataType) => {
  const Cliente = sequelize.define('clientes', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    endereco: {
      type: DataType.STRING,
      allowNull: true
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
  return Cliente;
};