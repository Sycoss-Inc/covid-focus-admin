import { useEffect, useState, Fragment } from "react";
//Components
import Loader from "../Loaders/FormLoader";

function WardForm({ setAddNew, setAlert, fetchData, data }) {
  const [state, setState] = useState(null);
  const [date, setDate] = useState(new Date().toISOString().substr(0, 10));
  const [isLoading, setIsLoading] = useState(false);
  const [uploadPercent, setUploadPercent] = useState(0);

  useEffect(() => {
    let array = [[], [], [], []];
    let wardactive = data.map((ward) => ({ ward: ward, active: "0" }));
    let wardrate = data.map((ward) => ({ ward: ward, rate: "0" }));
    let wardpositive = data.map((ward) => ({ ward: ward, positive: "0" }));
    let wardnegative = data.map((ward) => ({ ward: ward, negative: "0" }));
    array[0] = wardactive;
    array[1] = wardrate;
    array[2] = wardpositive;
    array[3] = wardnegative;
    setState(array);
  }, [data]);

  let localData = window.localStorage.getItem("auth_data");
  if (!localData) localData = window.sessionStorage.getItem("auth_data");
  localData = JSON.parse(localData);

  const formHandler = (i, category, value) => {
    let array = state;
    if (category === "active") array[0][i].active = value;
    else if (category === "rate") array[1][i].rate = value;
    else if (category === "positive") array[2][i].positive = value;
    else if (category === "negative") array[3][i].negative = value;

    setState(array);
  };

  const addData = () => {
    setIsLoading(true);
    setUploadPercent(101);

    let sendData = state;
    sendData.push({ date: date });

    fetch("http://localhost:8000/admin/add/wards/velur", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localData.token}`,
      },
      body: JSON.stringify(sendData),
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

    // add data
    addData();
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

            <label
              htmlFor="date"
              className="block text-lg font-medium text-gray-700 mt-4 ml-6"
            >
              Date
            </label>
            <div className="mt-1 flex px-16">
              <input
                type="date"
                name="date"
                id="date"
                className="focus:border-gray-800 flex-1 block w-full bg-white rounded-md sm:text-sm border-gray-300 border p-3"
                value={date}
                onChange={(e) => {
                  e.preventDefault();
                  setDate(e.target.value);
                }}
              />
            </div>

            {/* Active */}
            <div className="w-full p-6 pb-0">
              <h2 className="text-lg font-medium">Active Cases</h2>

              <div className="w-full px-5 py-2 pb-6">
                <div className="py-2 sm:px-6 lg:px-8">
                  <div className="rounded-lg overflow-hidden">
                    {state ? (
                      <div className="grid grid-cols-2 sm:grid-cols-4 bg-gray-200 border-b border-gray-200 gap-px">
                        {data.map((ward, i) => (
                          <Fragment key={`active${i}`}>
                            <label
                              htmlFor={`ward_active_${i}`}
                              className="px-6 py-3 col-span-1 flex items-center justify-center text-xs font-medium text-gray-500 bg-gray-50 uppercase"
                            >
                              <span>{ward}</span>
                            </label>
                            <div className="px-6 py-3 col-span-1 text-left text-xs font-medium text-gray-500 bg-white uppercase">
                              <input
                                type="number"
                                id={`ward_active_${i}`}
                                className="focus:border-gray-800 flex-1 block w-full rounded-md sm:text-sm border-gray-300 border p-3"
                                placeholder="Enter no of cases"
                                onChange={(e) => {
                                  formHandler(i, "active", e.target.value);
                                }}
                              />
                            </div>
                            {data.length % 2 !== 0 && i === data.length - 2 ? (
                              <div className="hidden sm:block"></div>
                            ) : (
                              ""
                            )}
                          </Fragment>
                        ))}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Rate */}
            <div className="w-full p-6 pb-0">
              <h2 className="text-lg font-medium">Positivity Rate</h2>

              <div className="w-full px-5 py-2 pb-6">
                <div className="py-2 sm:px-6 lg:px-8">
                  <div className="rounded-lg overflow-hidden">
                    {state ? (
                      <div className="grid grid-cols-2 sm:grid-cols-4 bg-gray-200 border-b border-gray-200 gap-px">
                        {data.map((ward, i) => (
                          <Fragment key={`rate${i}`}>
                            <label
                              htmlFor={`ward_rate_${i}`}
                              className="px-6 py-3 col-span-1 flex items-center justify-center text-xs font-medium text-gray-500 bg-gray-50 uppercase"
                            >
                              <span>{ward}</span>
                            </label>
                            <div className="px-6 py-3 col-span-1 text-left text-xs font-medium text-gray-500 bg-white uppercase">
                              <input
                                type="number"
                                id={`ward_rate_${i}`}
                                className="focus:border-gray-800 flex-1 block w-full rounded-md sm:text-sm border-gray-300 border p-3"
                                placeholder="Enter no of cases"
                                onChange={(e) => {
                                  formHandler(i, "rate", e.target.value);
                                }}
                              />
                            </div>
                            {data.length % 2 !== 0 && i === data.length - 2 ? (
                              <div className="hidden sm:block"></div>
                            ) : (
                              ""
                            )}
                          </Fragment>
                        ))}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Positive */}
            <div className="w-full p-6 pb-0">
              <h2 className="text-lg font-medium">Positive Cases</h2>

              <div className="w-full px-5 py-2 pb-6">
                <div className="py-2 sm:px-6 lg:px-8">
                  <div className="rounded-lg overflow-hidden">
                    {state ? (
                      <div className="grid grid-cols-2 sm:grid-cols-4 bg-gray-200 border-b border-gray-200 gap-px">
                        {data.map((ward, i) => (
                          <Fragment key={`positive${i}`}>
                            <label
                              htmlFor={`ward_positive_${i}`}
                              className="px-6 py-3 col-span-1 flex items-center justify-center text-xs font-medium text-gray-500 bg-gray-50 uppercase"
                            >
                              <span>{ward}</span>
                            </label>
                            <div className="px-6 py-3 col-span-1 text-left text-xs font-medium text-gray-500 bg-white uppercase">
                              <input
                                type="number"
                                id={`ward_positive_${i}`}
                                className="focus:border-gray-800 flex-1 block w-full rounded-md sm:text-sm border-gray-300 border p-3"
                                placeholder="Enter no of cases"
                                onChange={(e) => {
                                  formHandler(i, "positive", e.target.value);
                                }}
                              />
                            </div>
                            {data.length % 2 !== 0 && i === data.length - 2 ? (
                              <div className="hidden sm:block"></div>
                            ) : (
                              ""
                            )}
                          </Fragment>
                        ))}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Negative */}
            <div className="w-full p-6 pb-0">
              <h2 className="text-lg font-medium">Negative Cases</h2>

              <div className="w-full px-5 py-2 pb-6">
                <div className="py-2 sm:px-6 lg:px-8">
                  <div className="rounded-lg overflow-hidden">
                    {state ? (
                      <div className="grid grid-cols-2 sm:grid-cols-4 bg-gray-200 border-b border-gray-200 gap-px">
                        {data.map((ward, i) => (
                          <Fragment key={`negative${i}`}>
                            <label
                              htmlFor={`ward_negative_${i}`}
                              className="px-6 py-3 col-span-1 flex items-center justify-center text-xs font-medium text-gray-500 bg-gray-50 uppercase"
                            >
                              <span>{ward}</span>
                            </label>
                            <div className="px-6 py-3 col-span-1 text-left text-xs font-medium text-gray-500 bg-white uppercase">
                              <input
                                type="number"
                                id={`ward_negative_${i}`}
                                className="focus:border-gray-800 flex-1 block w-full rounded-md sm:text-sm border-gray-300 border p-3"
                                placeholder="Enter no of cases"
                                onChange={(e) => {
                                  formHandler(i, "negative", e.target.value);
                                }}
                              />
                            </div>
                            {data.length % 2 !== 0 && i === data.length - 2 ? (
                              <div className="hidden sm:block"></div>
                            ) : (
                              ""
                            )}
                          </Fragment>
                        ))}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="px-4 py-3 mx-16 rounded-xl flex justify-center bg-gray-50 text-right sm:px-6 border-t border-gray-300">
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
        </form>
      </div>
    </>
  );
}

export default WardForm;
