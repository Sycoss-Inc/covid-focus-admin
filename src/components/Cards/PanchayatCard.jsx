import { useState } from "react";
//Components
import PanchayatForm from "../Forms/PanchayatForm";

function PanchayatCard({ data, id, fetchData, setAlert }) {
  const [edit, setEdit] = useState(false);

  let date = new Date(data.date);

  return (
    <>
      {!edit ? (
        <div className="relative">
          {id === 0 ? (
            <button
              title="Edit"
              className="absolute text-sm bg-white border border-gray-300 focus:outline-none text-green-600 rounded-lg p-2 opacity-80 right-9 top-1 hover:opacity-100"
              onClick={() => setEdit(true)}
            >
              <i className="fas fa-edit"></i>
            </button>
          ) : (
            ""
          )}

          <div className="grid grid-cols-3 sm:grid-cols-6 bg-gray-200 gap-px shadow rounded-lg sm:rounded-none mb-5 sm:mb-0 overflow-hidden">
            <div className="px-6 py-5 col-span-1 block sm:hidden text-left text-xs font-medium bg-gray-50 text-gray-500 uppercase">
              Date
            </div>
            <div className="px-6 py-4 col-span-2 sm:col-span-1 bg-white">
              <div className="text-sm text-gray-900">
                {`${date.getDate()}/${
                  date.getMonth() + 1
                }/${date.getFullYear()}`}
              </div>
            </div>
            <div className="px-6 py-5 col-span-1 block sm:hidden text-left text-xs font-medium bg-gray-50 text-gray-500 uppercase">
              Total Cases
            </div>
            <div className="px-6 py-4 col-span-2 sm:col-span-1 bg-white">
              <div className="text-sm text-gray-900">{data.total_cases}</div>
            </div>
            <div className="px-6 py-5 col-span-1 block sm:hidden text-left text-xs font-medium bg-gray-50 text-gray-500 uppercase">
              Today's Cases
            </div>
            <div className="px-6 py-4 col-span-2 sm:col-span-1 bg-white">
              <div className="text-sm text-gray-900">{data.todays_cases}</div>
            </div>
            <div className="px-6 py-5 col-span-1 block sm:hidden text-left text-xs font-medium bg-gray-50 text-gray-500 uppercase">
              Positive Rate
            </div>
            <div className="px-6 py-4 col-span-2 sm:col-span-1 bg-white">
              <div className="text-sm text-gray-900">{data.positive_rate}</div>
            </div>
            <div className="px-6 py-5 col-span-1 block sm:hidden text-left text-xs font-medium bg-gray-50 text-gray-500 uppercase">
              Recovered
            </div>
            <div className="px-6 py-4 col-span-2 sm:col-span-1 bg-white">
              <div className="text-sm text-gray-900">{data.recovered}</div>
            </div>
            <div className="px-6 py-5 col-span-1 block sm:hidden text-left text-xs font-medium bg-gray-50 text-gray-500 uppercase">
              Deaths
            </div>
            <div className="px-6 py-4 col-span-2 sm:col-span-1 bg-white">
              <div className="text-sm text-gray-900">{data.deaths}</div>
            </div>
          </div>
        </div>
      ) : (
        <PanchayatForm
          fetchData={fetchData}
          setAddNew={setEdit}
          setAlert={setAlert}
          data={data}
          edit={true}
        />
      )}
    </>
  );
}

export default PanchayatCard;
