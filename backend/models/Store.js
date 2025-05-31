import { DataTypes } from 'sequelize';

export default function StoreModel(sequelize) {
  return sequelize.define('Store', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    ownerId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    // Optional: Add image field if shown in frontend
    // image: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    // },
  }, {
    tableName: 'stores',
    timestamps: true,
    underscored: true,
  });
}
