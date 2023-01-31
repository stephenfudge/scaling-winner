export default function FilmHeader() {
  return (
    <div className="flex">
      <a href="/films/brd">
        <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md mx-2 my-2" >BluRays</button>
      </a>
      <a href="/films/dvd">
        <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md my-2">DVDs</button>
      </a>
    </div>
  );
}
