import { Outlet, Link, useLocation } from "react-router-dom"
import { CiSettings, CiLogout  } from "react-icons/ci";
import { LiaUsersCogSolid } from "react-icons/lia";
import { AiOutlineAppstore } from "react-icons/ai";
import { BsFileBarGraph } from "react-icons/bs";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

export const AdminPage: React.FC = () => {
  const location = useLocation();
  console.log(location)
  const pathName = location.pathname;
  const pathNameSplitted = pathName.split('/');
  const currentLocation = pathName[pathName.length - 1] === '/' ? pathNameSplitted[pathNameSplitted.length - 2] : pathNameSplitted[pathNameSplitted.length - 1];

  return (
    <div className="admin-page grid grid-cols-12">

      <div className="aside-panel relative bg-[#314556] col-span-2">
        <div className="flex items-center my-6 pl-4">
          <MdOutlineAdminPanelSettings className="mr-2 text-3xl text-white"/>
          <p className="text-xl font-bold text-white">ADMIN PANEL</p>
        </div>

        <ul className="flex flex-col text-base text-[#a1a8b9] font-semibold">
          <li className={`flex items-center pl-4  hover:cursor-pointer bg-[#314556] hover:brightness-150 border-l-4  ${currentLocation === 'admin' ? 'border-[#46caff] brightness-150' : 'border-[#314556] brightness-100' }`}>
            <BsFileBarGraph className="mr-2 text-3xl" />
            <Link to="/admin" className="py-3 w-full">Dashboard</Link>
          </li>
          <li className={`flex items-center pl-4  hover:cursor-pointer bg-[#314556] hover:brightness-150 border-l-4  ${currentLocation === 'products' ? 'border-[#46caff] brightness-150' : 'border-[#314556] brightness-100' }`}>
            <AiOutlineAppstore className="mr-2 text-3xl"/>
            <Link to="products" className="py-3 w-full">Products</Link>
          </li>
          <li className={`flex items-center pl-4  hover:cursor-pointer bg-[#314556] hover:brightness-150 border-l-4  ${currentLocation === 'users' ? 'border-[#46caff] brightness-150' : 'border-[#314556] brightness-100' }`}>
            <LiaUsersCogSolid className="mr-2 text-3xl"/>
            <Link to="users" className="py-3 w-full">Users</Link>
          </li>
          <li className={`flex items-center pl-4  hover:cursor-pointer bg-[#314556] hover:brightness-150 border-l-4  ${currentLocation === 'settings' ? 'border-[#46caff] brightness-150' : 'border-[#314556] brightness-100' }`}>
            <CiSettings className="mr-2 text-3xl"/>
            <Link to="settings" className="py-3 w-full">Settings</Link>
          </li>
        </ul>

        <button className="w-full absolute bottom-0 flex items-center text-base font-semibold text-white py-3 pl-4 bg-[#314556] hover:brightness-150">
          <CiLogout className="mr-2 text-2xl" />
          Logout
        </button>
      </div>

      <div className="admin-content col-span-10 p-3">
        <Outlet />
      </div>

    </div>
  )
}