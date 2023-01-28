export default function FilmHeader() {
  return (
    <div>
      <a href="/films/brd">
        <button className="btn mx-2">BluRays</button>
      </a>
      <a href="/films/dvd">
        <button className="btn">DVDs</button>
      </a>
    </div>
  );
}
