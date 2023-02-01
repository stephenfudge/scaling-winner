export default function MusicHeader({title}) {
  return (
    <div className="flex justify-center">
      <h1 className="text-2xl px-5 py-3">{title}</h1>
      <a href="/music/brd">
        <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md mx-2 my-2">BluRays</button>
      </a>
      <a href="/music/dvd">
        <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md mx-2 my-2">DVDs</button>
      </a>
      <a href="/music/add">
        <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md mx-2 my-2">Add To Music</button>
      </a>
    </div>
  );
}
