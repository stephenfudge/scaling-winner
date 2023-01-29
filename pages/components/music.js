export default function MusicHeader() {
  return (
    <div>
      <a href="/music/brd">
        <button className="btn mx-2">BluRays</button>
      </a>
      <a href="/music/dvd">
        <button className="btn">DVDs</button>
      </a>
      <a href="/music/add">
        <button className="btn mx-2">Add To Music</button>
      </a>
      <a href="/music/pagi"><button className="btn mx-2">Pagination testing</button></a>
    </div>
  );
}
