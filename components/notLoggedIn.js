export default function NotLoggedIn (){
    return(
        <div className="grid justify-center py-12 max-h-screen mx-3 my-3 text-center">
            <h2 className="text-2xl py-2">You are not logged in!</h2>
            <br />
            <p>It looks like you don't have access to this page, feel free to choose one of the following options</p>
            <br />
          <ul className="menu menu-horizontal">
            <li>
            <a href="/" className="underline text-error">Go Home</a>
            </li>
            <li>
            <a href="/login" className="underline text-success">Login</a>
            </li>
          </ul>
          

        </div>
    )
}