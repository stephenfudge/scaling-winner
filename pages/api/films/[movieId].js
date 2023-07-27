export default async function handler(req, res) {
  const { movieId } = req.query;
  const API_KEY = process.env.TMDB_API_KEY;

  try {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + API_KEY,
      },
    };

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}`,
      options
    );
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching movie details:", error);
    res.status(500).json({ error: "Error fetching movie details" });
  }
}
