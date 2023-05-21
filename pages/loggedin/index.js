import LoggedInHeader from "../../components/loggedinHeader";
export default function LoggedIn() {
  return (
    <div className="py-10">
      <LoggedInHeader />
      <div className="flex justify-center py-6 text-center">
        <div>
          <h1 className="py-3">Logged In</h1>
          <p>Click on the header to select what you would like to do</p>
        </div>
      </div>
    </div>
  );
}
