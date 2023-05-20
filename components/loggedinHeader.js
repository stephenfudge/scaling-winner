import { useAuth } from "../hooks/useAuth";

export default function LoggedInHeader() {
  const { user, logout } = useAuth();

  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="flex justify-center">
      <h1 className="text-sm md:text-lg lg:text-2xl px-5 py-3 max-lg:hidden"> {user ? `Hi ${capitalizeFirstLetter(user.username)} ` : "Hi "}Select Category and What To Do </h1>
      <div className="dropdown">
        <label tabIndex={0} className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md m-1">
          Films
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <a href="/films/add">Add</a>
          </li>
          <li>
            <a href="/films/edit">Edit</a>
          </li>
          <li>
            <a href="/films/delete">Delete</a>
          </li>
        </ul>
      </div>
      <div className="dropdown">
        <label tabIndex={0} className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md m-1">
          Music
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <a href="/music/add">Add</a>
          </li>
          <li>
            <a href="/music/edit">Edit</a>
          </li>
          <li>
            <a href="/music/delete">Delete</a>
          </li>
        </ul>
      </div>
      <div className="dropdown">
        <label tabIndex={0} className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md m-1">
          TV
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <a href="/tv/add">Add</a>
          </li>
          <li>
            <a href="/tv/edit">Edit</a>
          </li>
          <li>
            <a href="/tv/delete">Delete</a>
          </li>
        </ul>
      </div>
      <div className="dropdown">
        <label tabIndex={0} className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md m-1">
          Wrestling
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <a href="/wrestling/add">Add</a>
          </li>
          <li>
            <a href="/wrestling/edit">Edit</a>
          </li>
          <li>
            <a href="/wrestling/delete">Delete</a>
          </li>
        </ul>
      </div>
      <btn className="btn btn-outline btn-xs sm:btn-sm md:btn-md lg:btn-md m-1" onClick={logout} >Logout</btn>
    </div>
  );
}

