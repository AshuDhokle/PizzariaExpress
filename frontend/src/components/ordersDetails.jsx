import React from 'react';

const OrderDetails = ({ order }) => {
    console.log(order);
    return (
        <div className="max-w-md mx-20 shadow-lg rounded-lg my-4 bg-white">
            <div className="p-4">
                <h1 className="text-2xl font-bold text-red-600">{order.userName}</h1>
                <p className="text-blue-600">{order.email}</p>
                <div className="mt-4 bg-red-500 p-2 text-white rounded-xl">
                    <h2 className="text-lg font-semibold text-blue-900">Order Details</h2>
                    <p className=""><span className="font-semibold text-lime-200">Order Amount:</span> {order.orderAmount}</p>
                    <p className=""><span className="font-semibold text-lime-200">Delivered:</span> {order.isDelivered ? 'Yes' : 'No'}</p>
                    <p className=""><span className="font-semibold text-lime-200">Transaction ID:</span> {order.transactionId}</p>
                </div>
                <div className="mt-4 bg-red-500 p-2 text-white rounded-xl">
                    <h2 className="text-lg font-semibold text-blue-900">Shipping Address</h2>
                    <p className=""><span className="font-semibold text-lime-200">City:</span> {order.address.city}</p>
                    <p className=""><span className="font-semibold text-lime-200">Street:</span> {order.address.street}</p>
                    <p className=""><span className="font-semibold text-lime-200">Country:</span> {order.address.country}</p>
                </div>
                <div className="mt-4 bg-red-500 p-2 text-white rounded-xl">
                    <h2 className="text-lg font-semibold text-blue-900">Order Items</h2>
                    <ul className="list-disc pl-4">
                        {order.orderItem.map((item, index) => (
                            <li key={index} className="">{item.name} - {item.quantity}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
