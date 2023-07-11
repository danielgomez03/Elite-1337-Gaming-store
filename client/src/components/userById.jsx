import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById } from '../redux/actions';

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return null;
  }

  return (
    
    <div className="container mx-auto my-5 p-5 max-w-screen-xl">
      <div className="md:flex no-wrap md:-mx-2">
        {/* Left Side */}
        <div className="w-full md:w-3/12 md:mx-2">
          {/* Profile Card */}
          <div className="bg-white p-3 border-t-4 border-orange-500">
            <div className="image overflow-hidden">
              <img className="h-auto w-full mx-auto" src="https://cdn.australianageingagenda.com.au/wp-content/uploads/2015/06/28085920/Phil-Beckett-2-e1435107243361.jpg" alt="Profile" />
            </div>
            <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{user.firstName} {user.lastName}</h1>
            <h3 className="text-gray-600 font-lg text-semibold leading-6">Costumer</h3>
            <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, eligendi dolorum sequi illum qui unde aspernatur non deserunt</p>
            <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
  <li className="flex items-center py-3">
    <span>Member since</span>
    <span className="ml-auto">{user.createdAt.split('T')[0]}</span>
  </li>
  <li className="flex items-center py-3">
    <span>Last Update</span>
    <span className="ml-auto">{user.updatedAt.split('T')[0]}</span>
  </li>
</ul>
          </div>
          {/* End of profile card */}
          <div className="my-4"></div>
          {/* Friends card */}
        </div>
        {/* Right Side */}
        <div className="w-full md:w-9/12 mx-2 h-64">
          {/* Profile tab */}
          {/* About Section */}
          <div className="bg-white p-3 shadow-sm rounded-sm">
            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
              <span className="text-green-500">
              <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#FF5F00">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </span>
              <span className="tracking-wide">About</span>
            </div>
            <div className="text-gray-700">
              <div className="grid md:grid-cols-2 text-sm">
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">First Name</div>
                  <div className="px-4 py-2">{user.firstName}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Last Name</div>
                  <div className="px-4 py-2">{user.lastName}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Country</div>
                  <div className="px-4 py-2">{user.country}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Contact No.</div>
                  <div className="px-4 py-2">{user.phoneNumber}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Current Address</div>
                  <div className="px-4 py-2">{user.address}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Email.</div>
                  <div className="px-4 py-2">
                    <a className="text-blue-800" href={user.login.email}>{user.login.email}</a>
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Birthday</div>
                  <div className="px-4 py-2">{user.birthDate}</div>
                </div>
              </div>
            </div>
          </div>
          {/* End of about section */}
          <div className="my-4"></div>
          {/* Experience and education */}
          <div className="bg-white p-3 shadow-sm rounded-sm">
            <div className="grid grid-cols-2">

              <div>
                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                  {/* <span className="text-green-500">
                    <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path fill="#fff" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm0 0l9-5-9-5-9 5 9 5zm-4 6v-7.5l4-2.222" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                    </svg>
                  </span> */}
                  <span className="tracking-wide">Purchases</span>
                </div>
              </div>
            </div>
            {/* End of Experience and education grid */}
          </div>
          {/* End of profile tab */}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

