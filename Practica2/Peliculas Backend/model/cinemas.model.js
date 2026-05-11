import { DataTypes } from 'sequelize';
import sequelize from '../db/database.js';

export const Cinema = sequelize.define('Cinema', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  timestamps: true,
  tableName: 'cinemas',
});

Cinema.associate = (models) => {
  Cinema.hasMany(models.Screen, {
    foreignKey: 'cinema_id',
    as: 'screenings',
  });
};