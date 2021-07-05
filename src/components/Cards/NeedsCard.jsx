import { useState } from "react";
//Components
import DeleteModal from "../Modals/DeleteModal";
import NeedsForm from "../Forms/NeedsForm";

function NeedsCard({ data, fetchData, setAlert }) {
  const [edit, setEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);

  let date = new Date(data.date);

  let localData = window.localStorage.getItem("auth_data");
  if (!localData) localData = window.sessionStorage.getItem("auth_data");
  localData = JSON.parse(localData);

  const deleteCard = () => {
    fetch("http://localhost:8000/admin/delete/needs/veloor_panchayat", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localData.token}`,
      },
      body: JSON.stringify({
        title: data.title,
      }),
    }).then((res) => {
      res
        .json()
        .then((body) => {
          if (!res.ok) throw Error(body.message);
          fetchData();
          setShowModal(false);
        })
        .catch((err) => console.log(err));
    });
  };

  return (
    <>
      {showModal ? (
        <DeleteModal
          message="Are you sure you want to delete this contact?"
          deleteCard={deleteCard}
          setShowModal={setShowModal}
        />
      ) : (
        ""
      )}
      {!edit ? (
        <div className="relative">
          <button
            title="Edit"
            className="absolute text-sm bg-white border border-gray-300 focus:outline-none text-green-600 rounded-lg p-2 opacity-80 right-9 top-1 hover:opacity-100"
            onClick={() => setEdit(true)}
          >
            <i className="fas fa-edit"></i>
          </button>
          <button
            title="Delete"
            className="absolute text-sm bg-white focus:outline-none text-red-600 rounded-lg p-2 opacity-80 right-1 top-1 hover:opacity-100 border border-gray-300"
            onClick={() => setShowModal(true)}
          >
            <i className="fas fa-trash-alt"></i>
          </button>

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
              Title
            </div>
            <div className="px-6 py-4 col-span-2 sm:col-span-2 bg-white">
              <div className="text-sm text-gray-900">{data.title}</div>
            </div>
            <div className="px-6 py-5 col-span-1 block sm:hidden text-left text-xs font-medium bg-gray-50 text-gray-500 uppercase">
              Description
            </div>
            <div className="pl-6 pr-6 sm:pr-16 py-4 col-span-2 sm:col-span-3 bg-white">
              <div className="text-sm text-gray-900">{data.description}</div>
            </div>
          </div>
        </div>
      ) : (
        <NeedsForm
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

export default NeedsCard;
