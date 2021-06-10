import { Switch, Route, Redirect } from "react-router-dom";
//Components
import Sidebar from "../../components/Sidebar/Sidebar";
//Pages
import Dashboard from "../Dashboard/Dashboard";
import Panchayat from "../Panchayat/Panchayat";
import Ward from "../Ward/Ward";
import Contact from "../Contact/Contact";

function Admin(props) {
  return (
    <>
      <div className="bg-gray-200 h-full w-full absolute"></div>
      <Sidebar setIsLoggedIn={props.setIsLoggedIn} />
      <div className="relative flex flex-col ml-0 sm:ml-14 lg:ml-64 h-screen">
        <div className="flex-grow bg-gray-200 pb-10">
          <Switch>
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/panchayat" exact component={Panchayat} />
            <Route path="/ward" exact component={Ward} />
            <Route path="/contact" exact component={Contact} />
            <Redirect path="*" to="/dashboard" />
          </Switch>
        </div>
        {/* Footer */}
        <div className="border-t-2 bg-gray-100">
          <h2 className="text-center p-3 text-gray-400">© 2021 Covid Focus</h2>
        </div>
      </div>
    </>
  );
}

export default Admin;
