const API_URL ='http://localhost:3000/api';

const handleResponse = async (res) => {
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message);
  }
  if (res.status === 204) return null;
  return res.json();
};

// GET /movies
export const getMovies = async () => {
  const res = await fetch(`${API_URL}/movies`);
  return handleResponse(res);
};

// GET /movies/:id
export const getMovieById = async (id) => {
  const res = await fetch(`${API_URL}/movie/${id}`);
  return handleResponse(res);
};

// POST /movies
export const createMovie = async (movieData) => {
  const res = await fetch(`${API_URL}/createMovie`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(movieData),
  });
  return handleResponse(res);
};

// PUT /movies/:id
export const updateMovie = async (id, movieData) => {
  const res = await fetch(`${API_URL}/movie/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(movieData),
  });
  return handleResponse(res);
};

// DELETE /movies/:id
export const deleteMovie = async (id) => {
  const res = await fetch(`${API_URL}/movie/${id}`, {
    method: 'DELETE',
  });
  return handleResponse(res);
};