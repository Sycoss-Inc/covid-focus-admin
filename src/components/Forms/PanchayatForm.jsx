import { useEffect, useState } from "react";
//Components
import Loader from "../Loaders/FormLoader";

function PanchayatForm({ setAddNew, setAlert, fetchData, data, edit }) {
  const [state, setState] = useState({
    date: new Date().toISOString().substr(0, 10),
    total_cases: "",
    todays_cases: "",
    positive_rate: "",
    recovered: "",
    deaths: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [uploadPercent, setUploadPercent] = useState(0);

  let localData = window.localStorage.getItem("auth_data");
  if (!localData) localData = window.sessionStorage.getItem("auth_data");
  localData = JSON.parse(localData);

  useEffect(() => {
    if (edit) {
      setState({
        date: data.date,
        total_cases: data.total_cases,
        todays_cases: data.todays_cases,
        positive_rate: data.positive_rate,
        recovered: data.recovered,
        deaths: data.deaths,
      });
    }
  }, [data, edit]);

  const formHandler = (e) => {
    setState({ ...state, [e.target.id]: e.target.value });
  };

  const addData = () => {
    setIsLoading(true);
    setUploadPercent(101);

    fetch("http://localhost:8000/admin/add/panchayat/velur_panchayat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localData.token}`,
      },
      body: JSON.stringify({
        date: state.date,
        totalCases: state.total_cases,
        todaysCases: state.todays_cases,
        positiveRate: state.positive_rate,
        recovered: state.recovered,
        deaths: state.deaths,
      }),
    }).then((res) => {
      res
        .json()
        .then((body) => {
          if (!res.ok) throw Error(body.message);
          fetchData();
          setAddNew(false);
        })
        .catch((err) => console.log(err));
    });
  };

  const editData = () => {
    setIsLoading(true);
    setUploadPercent(101);

    fetch("http://localhost:8000/admin/update/panchayat/velur_panchayat", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localData.token}`,
      },
      body: JSON.stringify({
        total_cases: state.total_cases,
        todays_cases: state.todays_cases,
        positive_rate: state.positive_rate,
        recovered: state.recovered,
        deaths: state.deaths,
      }),
    }).then((res) => {
      res
        .json()
        .then((body) => {
          if (!res.ok) throw Error(body.message);
          fetchData();
          setAddNew(false);
        })
        .catch((err) => console.log(err));
    });
  };

  const formSubmit = (e) => {
    e.preventDefault();

    console.log(state);

    let content = "";
    if (state.date === "") {
      content = "Date is required";
    } else if (state.total_cases === "") {
      content = "Total cases is required";
    } else if (state.todays_cases === "") {
      content = "Today's cases is required";
    } else if (state.positive_rate === "") {
      content = "Positive rate is required";
    } else if (state.recovered === "") {
      content = "Recovered is required";
    } else if (state.deaths === "") {
      content = "Deaths is required";
    }

    if (content !== "") {
      setAlert({
        type: "danger",
        title: "Error!",
        content: content,
      });
      return;
    }

    // add or edit data
    if (edit) editData();
    else addData();
  };

  const formCancel = (e) => {
    e.preventDefault();
    setAlert("");
    setAddNew(false);
  };

  return (
    <>
      <div>
        <form autoComplete="off">
          <div className="relative">
            {isLoading ? <Loader uploadPercent={uploadPercent} /> : ""}

            <div className="bg-white mb-5 sm:mb-0 rounded-lg sm:rounded-none overflow-hidden relative">
              <div className="px-6 py-4">
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="date"
                    name="date"
                    id="date"
                    className="focus:border-gray-800 flex-1 block w-full bg-white rounded-md sm:text-sm border-gray-300 border p-3"
                    value={state.date}
                    onChange={formHandler}
                  />
                </div>

                <label
                  htmlFor="total_cases"
                  className="block text-sm font-medium text-gray-700 mt-4"
                >
                  Total Cases
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="number"
                    id="total_cases"
                    className="focus:border-gray-800 flex-1 block w-full rounded-md sm:text-sm border-gray-300 border p-3"
                    placeholder="Enter total no of cases"
                    value={state.total_cases}
                    onChange={formHandler}
                    autoFocus
                  />
                </div>

                <label
                  htmlFor="todays_cases"
                  className="block text-sm font-medium text-gray-700 mt-4"
                >
                  Today's Cases
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="number"
                    id="todays_cases"
                    className="focus:border-gray-800 flex-1 block w-full rounded-md sm:text-sm border-gray-300 border p-3"
                    placeholder="Enter today's cases"
                    value={state.todays_cases}
                    onChange={formHandler}
                  />
                </div>

                <label
                  htmlFor="positive_rate"
                  className="block text-sm font-medium text-gray-700 mt-4"
                >
                  Positive Rate
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="number"
                    id="positive_rate"
                    className="focus:border-gray-800 flex-1 block w-full rounded-md sm:text-sm border-gray-300 border p-3"
                    placeholder="Enter positive rate"
                    value={state.positive_rate}
                    onChange={formHandler}
                  />
                </div>

                <label
                  htmlFor="recovered"
                  className="block text-sm font-medium text-gray-700 mt-4"
                >
                  Recovered
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="number"
                    id="recovered"
                    className="focus:border-gray-800 flex-1 block w-full rounded-md sm:text-sm border-gray-300 border p-3"
                    placeholder="Enter recovered count"
                    value={state.recovered}
                    onChange={formHandler}
                  />
                </div>

                <label
                  htmlFor="deaths"
                  className="block text-sm font-medium text-gray-700 mt-4"
                >
                  Deaths
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="number"
                    id="deaths"
                    className="focus:border-gray-800 flex-1 block w-full rounded-md sm:text-sm border-gray-300 border p-3"
                    placeholder="Enter today's deaths"
                    value={state.deaths}
                    onChange={formHandler}
                  />
                </div>
              </div>

              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 border-t border-gray-300">
                <button
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  onClick={(e) => formSubmit(e)}
                >
                  Save
                </button>
                <button
                  className="inline-flex justify-center py-2 px-4 ml-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400"
                  onClick={(e) => formCancel(e)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default PanchayatForm;
