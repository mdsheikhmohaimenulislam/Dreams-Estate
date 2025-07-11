import { FaUserCog } from 'react-icons/fa'
import { RiAdminFill } from "react-icons/ri";
import { FaUsersCog } from "react-icons/fa";
import MenuItem from './MenuItem'
import { FaStarHalfAlt } from "react-icons/fa";
const AdminMenu = () => {
  return (
    <>
      {/* <MenuItem icon={RiAdminFill} label='Admin Profile' address='adminProfile' /> */}
      <MenuItem icon={FaUserCog} label='Manage Properties' address='manageProperties' />
      <MenuItem icon={FaUsersCog } label='Manage Users' address='manageUsers' />
      <MenuItem icon={FaStarHalfAlt} label='Manage reviews' address='manageReviews' />
    </>
  )
}

export default AdminMenu
