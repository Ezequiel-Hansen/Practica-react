import { DataTypes } from 'sequelize';
import sequelize from '../db/database.js';
import { Movie } from './movie.model.js';
import { Cinema } from './cinemas.model.js';

export const Screen = sequelize.define('Screening', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  movie_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'movies',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  cinema_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'cinemas',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  screening_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  screening_time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
}, {
  timestamps: true,
  tableName: 'screenings',
});

Screen.associate = (models) => {
  Screen.belongsTo(models.Movie, {
    foreignKey: 'movie_id',
    as: 'movie',
  });

  Screen.belongsTo(models.Cinema, {
    foreignKey: 'cinema_id',
    as: 'cinema',
  });
};