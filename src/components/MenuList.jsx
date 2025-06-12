import { MdContacts } from "react-icons/md"; 
import { BiCommentDetail } from "react-icons/bi"; 
import { AiFillInfoCircle } from "react-icons/ai"; 
import { RiTeamLine } from "react-icons/ri"; 
import { AiFillMessage } from "react-icons/ai";
import { FaQuestion } from "react-icons/fa";
import { RiArticleLine } from "react-icons/ri";
import { AiOutlineUser } from "react-icons/ai";
import { AiFillPicture } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import { BiErrorAlt } from "react-icons/bi";
import { MdDashboard } from "react-icons/md";
import { AiFillShopping } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";

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
          <NavLink to="/artikel" className={menuClass}>
            <RiArticleLine className="text-xl" />
            <span>Artikel</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/faq" className={menuClass}>
            <FaQuestion className="text-xl" />
            <span>FAQ</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/career" className={menuClass}>

            <HiOutlineBuildingOffice2 className="text-xl" />
            <span>career</span>
          </NavLink>
        </li>
       
        <li>
          <NavLink to="/pesansaran" className={menuClass}>
            <MdContacts  className="text-xl" />
            <span>Kontak Masuk</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/team" className={menuClass}>
            <RiTeamLine className="text-xl" />
            <span>Team List</span>
          </NavLink>
        </li>
         <li>
          <NavLink to="/about" className={menuClass}>
            <AiFillInfoCircle className="text-xl" />
            <span>About us</span>
          </NavLink>
        </li>
         <li>
          <NavLink to="/testimoni" className={menuClass}>
            <BiCommentDetail className="text-xl" />
            <span>Testimoni</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/karyawanlist" className={menuClass}>
            <FaUserFriends className="text-xl" />
            <span>Karyawan</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/galerilist" className={menuClass}>
            <AiFillPicture className="text-xl" />
            <span>Galeri</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/user" className={menuClass}>
            <AiOutlineUser className="text-xl" />
            <span>Pengguna</span>
          </NavLink>
        </li>
         <li>
          <NavLink to="/vendorlist" className={menuClass}>
            <BiUserCircle className="text-xl" />
            <span>Vendor</span>
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
