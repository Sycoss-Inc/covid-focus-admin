import { useEffect, useState } from "react";
//Components
import WardCard from "../../components/Cards/WardCard";
import WardForm from "../../components/Forms/WardForm";
import Alert from "../../components/Alerts/Alert";
import Loader from "../../components/Loaders/ContentLoader";

function Ward() {
  const [data, setData] = useState(null);
  const [ward, setWard] = useState(null);
  const [active, setActive] = useState(null);
  const [rate, setRate] = useState(null);
  const [positive, setPositive] = useState(null);
  const [negative, setNegative] = useState(null);
  const [addNew, setAddNew] = useState(false);
  const [isDisabled] = useState(false);
  const [alert, setAlert] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = () => {
    setIsLoading(true);

    setWard([
      "പാത്രമംഗലം",
      "വെള്ളാറ്റഞ്ഞൂർ South",
      "തയ്യൂർ",
      "പഴവൂർ",
      "കോടശ്ശേരി",
      "വെങ്ങിലശ്ശേരി West",
      "അർണോസ് നഗർ",
      "കുട്ടംകുളം",
      "കിരാലൂർ",
      "കുറുമാൽ West",
      "കുറുമാൽ East",
      "വെങ്ങിലശ്ശേരി East",
      "വെള്ളാറ്റഞ്ഞൂർ South",
      "വേലൂർ",
      "തലക്കോട്ടുക്കര",
      "തണ്ടിലം",
      "പുലിയന്നൂർ",
    ]);

    fetch("http://localhost:8000/client/wards?panchayat=veloor&id=5").then(
      (res) =>
        res
          .json()
          .then((body) => {
            if (!res.ok) throw Error(body.message);
            else {
              let data = body.message;
              data.sort((a, b) => new Date(b.date) - new Date(a.date));
              setData(data);
              getActive(data);
              getRate(data);
              getPositive(data);
              getNegative(data);
              setIsLoading(false);
            }
          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false);
          })
    );
  };

  const getActive = (data) => {
    let active = [];
    data[0].active.map((ward, i) => {
      active.push({ ward: ward.ward, no: i, active: [] });
      return null;
    });

    data.map((date, i) => {
      active.map((ward, j) => {
        ward.active.push({
          date: date.date,
          cases: date.active[ward.no].active,
        });
        return null;
      });
      return null;
    });

    setActive(active);
  };

  const getRate = (data) => {
    let active = [];
    data[0].active.map((ward, i) => {
      active.push({ ward: ward.ward, no: i, active: [] });
      return null;
    });

    data.map((date, i) => {
      active.map((ward, j) => {
        ward.active.push({
          date: date.date,
          cases: date.rate[ward.no].rate,
        });
        return null;
      });
      return null;
    });

    setRate(active);
  };

  const getPositive = (data) => {
    let active = [];
    data[0].active.map((ward, i) => {
      active.push({ ward: ward.ward, no: i, active: [] });
      return null;
    });

    data.map((date, i) => {
      active.map((ward, j) => {
        ward.active.push({
          date: date.date,
          cases: date.positive[ward.no].positive,
        });
        return null;
      });
      return null;
    });

    setPositive(active);
  };

  const getNegative = (data) => {
    let active = [];
    data[0].active.map((ward, i) => {
      active.push({ ward: ward.ward, no: i, active: [] });
      return null;
    });

    data.map((date, i) => {
      active.map((ward, j) => {
        ward.active.push({
          date: date.date,
          cases: date.negative[ward.no].negative,
        });
        return null;
      });
      return null;
    });

    setNegative(active);
  };

  const returnDate = (time) => {
    let date = new Date(time);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
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
        <div className="p-1 pl-4 sm:p-4 text-lg sm:text-2xl">Ward</div>
      </div>
      <div className="flex flex-wrap pt-24 sm:pt-16 z-0">
        {!addNew ? (
          data ? (
            !isDisabled ? (
              <>
                <button
                  className="bg-gray-800 ml-6 hover:bg-gray-600 text-white py-2 px-4 mt-5 rounded focus:outline-none"
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
          )
        ) : (
          ""
        )}
      </div>
      {isLoading ? <Loader /> : ""}
      {addNew ? (
        <WardForm
          setAddNew={setAddNew}
          setAlert={setAlert}
          fetchData={fetchData}
          data={ward}
        />
      ) : (
        ""
      )}

      {!addNew ? (
        <>
          <div className="w-full p-6 pb-0">
            <h2 className="text-lg font-medium">Active Cases</h2>

            <div className="w-full px-5 py-2 pb-6">
              <div className="py-2 sm:px-6 lg:px-8">
                <div className="sm:shadow rounded-lg overflow-hidden">
                  {data ? (
                    <div className="hidden sm:grid grid-cols-6 bg-gray-200 border-b border-gray-200 gap-px">
                      <div className="px-6 py-3 col-span-1 text-left text-xs font-medium text-gray-500 bg-gray-50 uppercase">
                        Ward
                      </div>
                      <div className="px-6 py-3 col-span-1 text-left text-xs font-medium text-gray-500 bg-gray-50 uppercase">
                        {data[0] ? returnDate(data[0].date) : "Enter data"}
                      </div>
                      <div className="px-6 py-3 col-span-1 text-left text-xs font-medium text-gray-500 bg-gray-50 uppercase">
                        {data[1] ? returnDate(data[1].date) : "Enter data"}
                      </div>
                      <div className="px-6 py-3 col-span-1 text-left text-xs font-medium text-gray-500 bg-gray-50 uppercase">
                        {data[2] ? returnDate(data[2].date) : "Enter data"}
                      </div>
                      <div className="px-6 py-3 col-span-1 text-left text-xs font-medium text-gray-500 bg-gray-50 uppercase">
                        {data[3] ? returnDate(data[3].date) : "Enter data"}
                      </div>
                      <div className="px-6 py-3 col-span-1 text-left text-xs font-medium text-gray-500 bg-gray-50 uppercase">
                        {data[4] ? returnDate(data[4].date) : "Enter data"}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  {/* data */}
                  {active
                    ? active.map((data, i) => (
                        <div key={i}>
                          <WardCard data={data} />
                        </div>
                      ))
                    : ""}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full p-6 pb-0">
            <h2 className="text-lg font-medium">Positivity Rate</h2>

            <div className="w-full px-5 py-2 pb-6">
              <div className="py-2 sm:px-6 lg:px-8">
                <div className="sm:shadow rounded-lg overflow-hidden">
                  {data ? (
                    <div className="hidden sm:grid grid-cols-6 bg-gray-200 border-b border-gray-200 gap-px">
                      <div className="px-6 py-3 col-span-1 text-left text-xs font-medium text-gray-500 bg-gray-50 uppercase">
                        Ward
                      </div>
                      <div className="px-6 py-3 col-span-1 text-left text-xs font-medium text-gray-500 bg-gray-50 uppercase">
                        {data[0] ? returnDate(data[0].date) : "Enter data"}
                      </div>
                      <div className="px-6 py-3 col-span-1 text-left text-xs font-medium text-gray-500 bg-gray-50 uppercase">
                        {data[1] ? returnDate(data[1].date) : "Enter data"}
                      </div>
                      <div className="px-6 py-3 col-span-1 text-left text-xs font-medium text-gray-500 bg-gray-50 uppercase">
                        {data[2] ? returnDate(data[2].date) : "Enter data"}
                      </div>
                      <div className="px-6 py-3 col-span-1 text-left text-xs font-medium text-gray-500 bg-gray-50 uppercase">
                        {data[3] ? returnDate(data[3].date) : "Enter data"}
                      </div>
                      <div className="px-6 py-3 col-span-1 text-left text-xs font-medium text-gray-500 bg-gray-50 uppercase">
                        {data[4] ? returnDate(data[4].date) : "Enter data"}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  {/* data */}
                  {rate
                    ? rate.map((data, i) => (
                        <div key={i}>
                          <WardCard data={data} />
                        </div>
                      ))
                    : ""}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full p-6 pb-0">
            <h2 className="text-lg font-medium">Positive Cases</h2>

            <div className="w-full px-5 py-2 pb-6">
              <div className="py-2 sm:px-6 lg:px-8">
                <div className="sm:shadow rounded-lg overflow-hidden">
                  {data ? (
                    <div className="hidden sm:grid grid-cols-6 bg-gray-200 border-b border-gray-200 gap-px">
                      <div className="px-6 py-3 col-span-1 text-left text-xs font-medium text-gray-500 bg-gray-50 uppercase">
                        Ward
                      </div>
                      <div className="px-6 py-3 col-span-1 text-left text-xs font-medium text-gray-500 bg-gray-50 uppercase">
                        {data[0] ? returnDate(data[0].date) : "Enter data"}
                      </div>
                      <div className="px-6 py-3 col-span-1 text-left text-xs font-medium text-gray-500 bg-gray-50 uppercase">
                        {data[1] ? returnDate(data[1].date) : "Enter data"}
                      </div>
                      <div className="px-6 py-3 col-span-1 text-left text-xs font-medium text-gray-500 bg-gray-50 uppercase">
                        {data[2] ? returnDate(data[2].date) : "Enter data"}
                      </div>
                      <div className="px-6 py-3 col-span-1 text-left text-xs font-medium text-gray-500 bg-gray-50 uppercase">
                        {data[3] ? returnDate(data[3].date) : "Enter data"}
                      </div>
                      <div className="px-6 py-3 col-span-1 text-left text-xs font-medium text-gray-500 bg-gray-50 uppercase">
                        {data[4] ? returnDate(data[4].date) : "Enter data"}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  {/* data */}
                  {positive
                    ? positive.map((data, i) => (
                        <div key={i}>
                          <WardCard data={data} />
                        </div>
                      ))
                    : ""}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full p-6 pb-0">
            <h2 className="text-lg font-medium">Negative Cases</h2>

            <div className="w-full px-5 py-2 pb-6">
              <div className="py-2 sm:px-6 lg:px-8">
                <div className="sm:shadow rounded-lg overflow-hidden">
                  {data ? (
                    <div className="hidden sm:grid grid-cols-6 bg-gray-200 border-b border-gray-200 gap-px">
                      <div className="px-6 py-3 col-span-1 text-left text-xs font-medium text-gray-500 bg-gray-50 uppercase">
                        Ward
                      </div>
                      <div className="px-6 py-3 col-span-1 text-left text-xs font-medium text-gray-500 bg-gray-50 uppercase">
                        {data[0] ? returnDate(data[0].date) : "Enter data"}
                      </div>
                      <div className="px-6 py-3 col-span-1 text-left text-xs font-medium text-gray-500 bg-gray-50 uppercase">
                        {data[1] ? returnDate(data[1].date) : "Enter data"}
                      </div>
                      <div className="px-6 py-3 col-span-1 text-left text-xs font-medium text-gray-500 bg-gray-50 uppercase">
                        {data[2] ? returnDate(data[2].date) : "Enter data"}
                      </div>
                      <div className="px-6 py-3 col-span-1 text-left text-xs font-medium text-gray-500 bg-gray-50 uppercase">
                        {data[3] ? returnDate(data[3].date) : "Enter data"}
                      </div>
                      <div className="px-6 py-3 col-span-1 text-left text-xs font-medium text-gray-500 bg-gray-50 uppercase">
                        {data[4] ? returnDate(data[4].date) : "Enter data"}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  {/* data */}
                  {negative
                    ? negative.map((data, i) => (
                        <div key={i}>
                          <WardCard data={data} />
                        </div>
                      ))
                    : ""}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default Ward;
