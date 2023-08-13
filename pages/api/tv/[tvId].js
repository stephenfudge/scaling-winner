export default async function handler(req, res) {
  const { tvId } = req.query;
  const API_KEY = process.env.API_TOKEN;

  try {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + API_KEY
      }
    };

    const response = await fetch(`https://api.themoviedb.org/3/tv/${tvId}?append_to_response=external_ids`, options);
    const data = await response.json();

    const imdbId = data.external_ids.imdb_id;
    const imdbLink = `https://www.imdb.com/title/${imdbId}/`;

    // Add the IMDb link to the response data
    const responseData = {
      ...data,
      imdb_link: imdbLink
    };

    res.status(200).json(responseData);
  } catch (error) {
    console.error('Error fetching TV show details:', error);
    res.status(500).json({ error: 'Error fetching TV show details' });
  }
}
