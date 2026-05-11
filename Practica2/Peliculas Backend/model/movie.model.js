import { DataTypes } from 'sequelize';
import sequelize from '../db/database.js';

export const Movie = sequelize.define('Movie', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  director: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  duration: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  rating: {
    type: DataTypes.ENUM(
      'Apta para todo público',
      'Apta para mayores de 13 años',
      'Apta para mayores de 18 años'
    ),
    allowNull: false,
    defaultValue: 'Apta para todo público',
  },
  poster: {
    type: DataTypes.TEXT,
  },
  synopsis: {
    type: DataTypes.TEXT,
  },
  time:{
    type: DataTypes.ENUM('19:00', '21:30', '23:00','20:00','20:30','17:00', '22:00' ,'15:30' ,'16:00', '14:00')
  },
  date:{
    type:DataTypes.STRING,
  }
}, {
  timestamps: true,
  tableName: 'movies',
});

Movie.associate = (models) => {
  Movie.hasMany(models.Screen, {
    foreignKey: 'movie_id',
    as: 'screenings',
  });
};
