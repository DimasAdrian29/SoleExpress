import { AiFillPicture } from "react-icons/ai"; 
import { FaUserFriends } from "react-icons/fa"; 
import { BiErrorAlt } from "react-icons/bi"; 
import { MdDashboard } from "react-icons/md";
import { AiFillShopping } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { NavLink } from "react-router-dom";

export default function MenuList() {
  const menuClass = ({ isActive }) =>
    `flex items-center rounded-xl p-3 space-x-3 transition-all font-bold
     ${isActive
        ? "text-white bg-[#1e293b]" // biru keabu gelap
        : "text-slate-100 hover:text-white hover:bg-[#475569]"
      }`;

  return (
    <div id="sidebar-menu" className="mt-10">
      <ul id="menu-list" className="space-y-2">
        <li>
          <NavLink to="/" className={menuClass}>
            <MdDashboard className="text-xl" />
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/produklist" className={menuClass}>
            <AiFillShopping className="text-xl" />
            <span>Produk</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/vendorlist" className={menuClass}>
            <BiUserCircle className="text-xl" />
            <span>Vendor</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/karyawanlist" className={menuClass}>
           <FaUserFriends  className="text-xl"/>
            <span>Karyawan</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/galerilist" className={menuClass}>
          <AiFillPicture  className="text-xl"/>
            <span>Galeri</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/ErrorPage400" className={menuClass}>
          
            <BiErrorAlt className="text-xl" />
            <span>ErorPage400</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/ErrorPage403" className={menuClass}>
          <BiErrorAlt className="text-xl" />
            <span>ErorPage403</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
