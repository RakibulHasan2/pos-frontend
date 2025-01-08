// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import CommonTopNab from '../../Shared/CommonTopNav/CommonTopNab';
import useGetData from '../../Hooks/useGetData';
import { FaCaretRight, FaEye } from 'react-icons/fa6';
import { NavLink } from 'react-router';
import { CiEdit } from 'react-icons/ci';
import { AiTwotoneDelete } from 'react-icons/ai';

export default function CustomerList() {
    const { data: categoriesData, isLoading: tableLoading } = useGetData(
        "http://localhost:5000/api/customerProduct/getAllCustomerProducts"
    );

    const [filter, setFilter] = useState("");

    // Handle input change for filtering
    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    // Sort data by `createdAt` in descending order (latest first)
    const sortedData = categoriesData?.data?.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    // Filter the data based on email or phone
    const filteredData = sortedData?.filter((customer) =>
        customer.customerEmail.toLowerCase().includes(filter.toLowerCase()) ||
        customer.customerPhone.includes(filter)
    );

    if (tableLoading) {
        return <p>Loading data...</p>;
    }

    return (
        <div>
            <CommonTopNab />
            <div className="container mx-auto p-4">
                <h2 className="text-xl font-bold mb-4">Customer List</h2>

                {/* Filter Input */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search by Email or Phone"
                        value={filter}
                        onChange={handleFilterChange}
                        className="border border-gray-300 rounded px-4 py-2 w-full"
                    />
                </div>

                {/* No Data Found Message */}
                {filteredData?.length === 0 && (
                    <p className="text-red-500 text-center">No such data found.</p>
                )}

                {/* Data Table */}
                {filteredData?.length > 0 && (
                    <table className="table-auto w-full border-collapse border text-sm border-gray-200">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2">Customer Name</th>
                                <th className="border border-gray-300 px-4 py-2">Email</th>
                                <th className="border border-gray-300 px-4 py-2">Phone</th>
                                <th className="border border-gray-300 px-4 py-2">Address</th>
                                <th className="border border-gray-300 px-4 py-2">Purchase Date</th>
                                <th className="border border-gray-300 px-4 py-2">Total Items</th>
                                <th className="border border-gray-300 px-4 py-2">Grand Total</th>
                                <th className="border border-gray-300 px-4 py-2">Customer Points</th>
                                <th className="border border-gray-300 px-4 py-2">Payment Status</th>
                                <th className="border border-gray-300 px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((customer, index) => (
                                <tr key={index} className="text-center">
                                    <td className="border border-gray-300 px-4 py-2">{customer.customerName}</td>
                                    <td className="border border-gray-300 px-4 py-2">{customer.customerEmail}</td>
                                    <td className="border border-gray-300 px-4 py-2">{customer.customerPhone}</td>
                                    <td className="border border-gray-300 px-4 py-2">{customer.customerAddress}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {new Date(customer.purchaseDate).toLocaleDateString()}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">{customer.totalItems}</td>
                                    <td className="border border-gray-300 px-4 py-2">${customer.grandTotal.toFixed(2)}</td>
                                    <td className="border border-gray-300 px-4 py-2">{customer.customerPoints}</td>
                                    <td className="border border-gray-300 px-4 py-2">{customer.paymentStatus === "" ? <p className='text-yellow-500'>Pending...</p> : <p className='text-green-600'>Paid</p>}</td>
                                    <div className="dropdown dropdown-left">
                                        <div tabIndex={0} role="button" className="btn m-1 text-blue-500">
                                            Action
                                        </div>
                                        <ul
                                            tabIndex={0}
                                            className="dropdown-content items-center border border-blue-500 menu bg-white rounded-md z-[1] w-52  shadow"
                                        >
                                            <FaCaretRight className="absolute text-3xl ml-[218px] text-blue-600" />

                                            <NavLink to={`/singleCustomerList/${encodeURIComponent(customer?._id)}`}>
                                                <li className="w-full border-b text-blue-500" >
                                                    <a>
                                                        <FaEye className="text-2xl" />
                                                        View Details
                                                    </a>
                                                </li>
                                            </NavLink>
                                            <li className="w-full border-b text-blue-500" >
                                                <a><CiEdit className="text-2xl" /> Edit</a>
                                            </li>
                                            <li className="w-full border-b text-red-500"  >
                                                <a><AiTwotoneDelete className="text-2xl" /> Delete</a>
                                            </li>
                                        </ul>
                                    </div>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* modal area */}
            <dialog id="my_modal_3" className="modal">
                <div className="w-[1000px] bg-white p-5 rounded-xl">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <div className='flex justify-end'>
                            <button className="btn btn-sm btn-circle btn-ghost">✕</button>
                        </div>
                    </form>
                    <div>
                        sing product details area
                    </div>
                </div>
            </dialog>
        </div>
    );
}
