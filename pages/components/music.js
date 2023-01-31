export default function MusicHeader() {
  return (
    <div className="flex">
      <a href="/music/brd">
        <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md mx-2 my-2">BluRays</button>
      </a>
      <a href="/music/dvd">
        <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md mx-2 my-2">DVDs</button>
      </a>
      <a href="/music/add">
        <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md mx-2 my-2">Add To Music</button>
      </a>
      {/* <a href="/music/pagi"><button className="btn mx-2">Pagination testing</button></a> */}
    </div>
  );
}
