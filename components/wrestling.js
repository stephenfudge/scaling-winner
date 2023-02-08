export default function WrestlingHeader({title}) {
  return (
    <div className="flex justify-center">
      <h1 className="text-sm md:text-lg lg:text-2xl px-5 py-3 max-lg:hidden">{title}</h1>
      <div className="dropdown">
        <label tabIndex={0} className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md m-1">
          Media Format
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <a href="/wrestling/brd">BluRays</a>
          </li>
          <li>
            <a href="/wrestling/dvd">DVDs</a>
          </li>
        </ul>
      </div>
      <div className="dropdown">
        <label tabIndex={0} className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md m-1">
          Presentation Style
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <a href="/wrestling/compilation">Compilations</a>
          </li>
          <li>
            <a href="/wrestling/documentary">Documentaries</a>
          </li>
          <li>
            <a href="/wrestling/ppv">PPVs</a>
          </li>
        </ul>
      </div>
      <div className="dropdown">
        <label tabIndex={0} className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md m-1">
          Promotion
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <a href="/wrestling/nonwwe">Non WWE Content</a>
          </li>
          <li>
            <a href="/wrestling/wwe">WWE Content</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
