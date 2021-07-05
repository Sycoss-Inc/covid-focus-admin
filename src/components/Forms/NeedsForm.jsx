import { useEffect, useState } from "react";
//Components
import Loader from "../Loaders/FormLoader";

function NeedsForm({ setAddNew, setAlert, fetchData, data, edit }) {
  const [state, setState] = useState({
    title: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [uploadPercent, setUploadPercent] = useState(0);

  let localData = window.localStorage.getItem("auth_data");
  if (!localData) localData = window.sessionStorage.getItem("auth_data");
  localData = JSON.parse(localData);

  useEffect(() => {
    if (edit) {
      setState({
        title: data.title,
        description: data.description,
      });
    }
  }, [data, edit]);

  const formHandler = (e) => {
    setState({ ...state, [e.target.id]: e.target.value });
  };

  const addData = () => {
    setIsLoading(true);
    setUploadPercent(101);

    fetch("http://localhost:8000/admin/add/needs/veloor_panchayat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localData.token}`,
      },
      body: JSON.stringify({
        title: state.title,
        description: state.description,
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

    fetch("http://localhost:8000/admin/update/needs/veloor_panchayat", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localData.token}`,
      },
      body: JSON.stringify({
        title: state.title,
        description: state.description,
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

    let content = "";
    if (state.title === "") {
      content = "Title is required";
    } else if (state.description === "") {
      content = "Description is required";
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
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    id="title"
                    className="focus:border-gray-800 flex-1 block w-full rounded-md sm:text-sm border-gray-300 border p-3"
                    placeholder="Enter title"
                    value={state.title}
                    onChange={formHandler}
                    autoFocus={edit ? false : true}
                    disabled={edit ? true : false}
                  />
                </div>

                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mt-4"
                >
                  Description
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    id="description"
                    className="focus:border-gray-800 flex-1 block w-full rounded-md sm:text-sm border-gray-300 border p-3"
                    placeholder="Enter description"
                    value={state.description}
                    onChange={formHandler}
                    autoFocus={edit ? true : false}
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

export default NeedsForm;
