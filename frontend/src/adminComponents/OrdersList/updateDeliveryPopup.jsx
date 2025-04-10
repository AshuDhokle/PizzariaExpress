import React from 'react'
import Loading from 'react-loading';
const UpdateDeliveryPopup = (props) => {
  return (
    props.trig ? (
      <div className="fixed z-10 top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="bg-white rounded-lg p-4">
          <h1 className="text-xl font-bold mb-4">Confirm!</h1>
          <p className="text-gray-700 mb-4">Are you sure the item is Delivered?</p>
          <div className="flex justify-end">
            <button onClick={() => props.updateDelivery(props.id)} className="bg-red-500 text-white px-4 py-2 rounded-md mr-2">Yes</button>
            <button onClick={() => props.resetTrig()} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md">No</button>
            <div>
              <div className="m-2">
                {props.loading && <Loading type="spin" color="#1DCD9F" width={25} height={25} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : null
  );
}

export default UpdateDeliveryPopup