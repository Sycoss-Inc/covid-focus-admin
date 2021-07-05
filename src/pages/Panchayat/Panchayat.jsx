import { useEffect, useState } from "react";
//Components
import PanchayatCard from "../../components/Cards/PanchayatCard";
import PanchayatForm from "../../components/Forms/PanchayatForm";
import Alert from "../../components/Alerts/Alert";
import Loader from "../../components/Loaders/ContentLoader";

function Panchayat() {
  const [data, setData] = useState(null);
  const [addNew, setAddNew] = useState(false);
  // const [isDisabled, setIsDisabled] = useState(false);
  const [alert, setAlert] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setIsLoading(true);
    fetch(
      "http://localhost:8000/client/panchayat?panchayat=veloor_panchayat&records=5"
    ).then((res) =>
      res
        .json()
        .then((body) => {
          if (!res.ok) throw Error(body.message);
          else {
            let data = body.message;
            data.sort((a, b) => new Date(b.date) - new Date(a.date));
            // let date = new Date(data[0].date);
            // let dateNow = new Date();
            // let date1 = `${date.getDate()}/${
            //   date.getMonth() + 1
            // }/${date.getFullYear()}`;
            // let date2 = `${dateNow.getDate()}/${
            //   dateNow.getMonth() + 1
            // }/${dateNow.getFullYear()}`;
            // if (date1 === date2) setIsDisabled(true);
            setData(data);
            setIsLoading(false);
          }
        })
        .catch((err) => console.log(err))
    );
  };

  return (
    <>
      <Alert
        type={alert.type}
        title={alert.title}
        content={alert.content}
        setAlert={setAlert}
      />
      <div className="left-0 sm:left-14 mt-14 sm:mt-0 lg:left-64 right-0 bg-gray-100 rounded-b-lg shadow fixed z-20">
        <div className="p-1 pl-4 sm:p-4 text-lg sm:text-2xl">Panchayat</div>
      </div>
      <div className="flex flex-wrap pt-24 sm:pt-16 z-0">
        <div className="w-full p-6 pb-0">
          <h2 className="text-lg font-medium">വെല്ലൂർ ഗ്രാമപഞ്ചായത്ത്</h2>
          {!addNew ? (
            data ? (
              <>
                <button
                  className="bg-gray-800 hover:bg-gray-600 text-white py-2 px-4 mt-5 rounded focus:outline-none"
                  onClick={() => setAddNew(true)}
                >
                  <i className="fas fa-plus"></i> Add Data
                </button>
              </>
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </div>
        {isLoading ? <Loader /> : ""}

        <div className="w-full px-5 py-2 pb-6">
          <div className="py-2 sm:px-6 lg:px-8">
            <div className="sm:shadow rounded-lg overflow-hidden">
              {data ? (
                <div className="hidden sm:grid grid-cols-6 bg-gray-200 border-b border-gray-200 gap-px">
                  <div className="px-6 py-3 col-span-1 text-left text-xs font-medium text-gray-500 bg-gray-50 uppercase">
                    Date
                  </div>
                  <div className="px-6 py-3 col-span-1 text-left text-xs font-medium text-gray-500 bg-gray-50 uppercase">
                    Total Cases
                  </div>
                  <div className="px-6 py-3 col-span-1 text-left text-xs font-medium text-gray-500 bg-gray-50 uppercase">
                    Today's Cases
                  </div>
                  <div className="px-6 py-3 col-span-1 text-left text-xs font-medium text-gray-500 bg-gray-50 uppercase">
                    Positive Rate
                  </div>
                  <div className="px-6 py-3 col-span-1 text-left text-xs font-medium text-gray-500 bg-gray-50 uppercase">
                    Recovered
                  </div>
                  <div className="px-6 py-3 col-span-1 text-left text-xs font-medium text-gray-500 bg-gray-50 uppercase">
                    Deaths
                  </div>
                </div>
              ) : (
                ""
              )}

              {/* form */}
              {addNew ? (
                <div>
                  <PanchayatForm
                    setAddNew={setAddNew}
                    fetchData={fetchData}
                    setAlert={setAlert}
                    edit={false}
                  />
                </div>
              ) : (
                ""
              )}

              {/* data */}
              {data
                ? data.map((data, i) => (
                    <div key={i}>
                      <PanchayatCard
                        id={i}
                        setAlert={setAlert}
                        data={data}
                        fetchData={fetchData}
                      />
                    </div>
                  ))
                : ""}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Panchayat;
