import LoggedInHeader from "../../components/loggedinHeader";
export default function LoggedIn() {
  return (
    <div className="py-10">
      <LoggedInHeader />
      <div className="flex justify-center py-6 text-center">
        <div>
          <h3 className="text-lg py-3">You have successfully logged in!</h3>
          <p>Click on the header to select what you would like to do</p>
        </div>
      </div>
    </div>
  );
}
