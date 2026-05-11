import sequelize from "./db/database.js"
import {initialMovies} from "./data/movies.js"
import { Movie } from "./model/movie.model.js";
import { Cinema } from "./model/cinemas.model.js";
import { Screen } from "./model/Screen.model.js";
export const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    for (const data of initialMovies) {
      const movie = await Movie.create({
        title: data.title,
        director: data.director,
        duration: data.duration,
        rating: data.rating,
        poster: data.poster,
        synopsis: data.synopsis,
        date:data.date,
        time:data.time
      });

      for (const name of data.cinemas) {
        const [cinema] = await Cinema.findOrCreate({ where: { name } });

        await Screen.create({
          movie_id: movie.id,
          cinema_id: cinema.id,
          screening_date: data.date,
          screening_time: data.time,
        });
      }
    }

    console.log("✅ Películas y cines sembrados correctamente");
  } catch (error) {
    console.error("❌ Error en el semillado:", error);
  }
};