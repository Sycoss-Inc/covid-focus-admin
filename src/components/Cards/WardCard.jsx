import { Fragment } from "react";

function WardCard({ data }) {
  const returnDate = (time) => {
    let date = new Date(time);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const renderData = () => {
    let tile = [];
    for (let i = 0; i < 5; i++) {
      tile.push(
        <div className="px-6 py-5 col-span-1 block sm:hidden text-left text-xs font-medium bg-gray-50 text-gray-500 uppercase">
          {data.active[i] ? returnDate(data.active[i].date) : "Enter data"}
        </div>
      );
      tile.push(
        <div className="px-6 py-4 col-span-2 sm:col-span-1 bg-white">
          <div className="text-sm text-gray-900">
            {data.active[i] ? data.active[0].cases : "Enter data"}
          </div>
        </div>
      );
    }

    return tile;
  };

  return (
    <>
      <div className="relative">
        <div className="grid grid-cols-3 sm:grid-cols-6 bg-gray-200 gap-px shadow rounded-lg sm:rounded-none mb-5 sm:mb-0 overflow-hidden">
          <div className="px-6 py-5 col-span-1 block sm:hidden text-left text-xs font-medium bg-gray-50 text-gray-500 uppercase">
            Ward
          </div>
          <div className="px-6 py-4 col-span-2 sm:col-span-1 bg-white">
            <div className="text-sm text-gray-900">{data.ward}</div>
          </div>
          {renderData().map((tile, i) => (
            <Fragment key={i}>{tile}</Fragment>
          ))}
        </div>
      </div>
    </>
  );
}

export default WardCard;
