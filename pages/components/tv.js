export default function TvHeader() {
  return (
    <div className="flex">
      <a href="/tv/brd">
        <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md mx-2 my-2">BluRays</button>
      </a>
      <a href="/tv/dvd">
        <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md mx-2 my-2">DVDs</button>
      </a>
      {/* <a href="/tv/pagi"><button className="btn">Pagination testing</button></a> */}
    </div>
  );
}
