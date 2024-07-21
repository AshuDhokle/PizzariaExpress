import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import ReactLoading from 'react-loading';

const UserList = () => {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await Axios.get('http://localhost:3000/api/admin/users');
        setUserList(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='m-4 overflow-x-auto'>
      {loading ? (
        <ReactLoading type='spin' color='blue' height={200} width={200} />
      ) : (
        <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border border-3 border-black   animate-fade-in'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 h-8 text-center'>
            <tr className='px-6 py-3'>
              <th className=' md:table-cell'>Name</th>
              <th>Email</th>
              <th className='hidden md:table-cell'>Phone No.</th>
            </tr>
          </thead>
          <tbody className='border border-3 border-black text-center'>
            {userList.map((user, idx) => (
              <tr
                className={`${
                  idx % 2 === 0 ? 'bg-blue-100 dark:bg-gray-800' : 'bg-white dark:bg-blue-200'
                } border-b dark:border-gray-700`}
                key={idx}
              >
                <td className='px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap'>
                  {user.name}
                </td>
                <td className='px-6 py-3 text-red-600'>{user.email}</td>
                <td className='px-6 py-3 text-blue-500 hidden md:table-cell'>{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList;
