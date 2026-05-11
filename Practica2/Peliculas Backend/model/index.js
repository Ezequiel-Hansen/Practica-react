import { Movie }     from './movie.model.js';
import { Cinema }    from './cinemas.model.js';
import { Screen } from './Screen.model.js';

const models = { Movie, Cinema, Screen };

Object.values(models).forEach((model) => {
  if (model.associate) model.associate(models);
});