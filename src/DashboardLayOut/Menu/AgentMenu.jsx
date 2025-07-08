import { FaUserTie } from "react-icons/fa";
import { FaPlusSquare } from "react-icons/fa";
import {MdHouseSiding } from "react-icons/md";
import { LuCircleDollarSign } from "react-icons/lu";
import { SiMinutemailer } from "react-icons/si";
import MenuItem from "./MenuItem";
const AgentMenu = () => {
  return (
    <>
      <MenuItem
        icon={FaUserTie }
        label="Agent Profile"
        address="agentProfile"
      />
      <MenuItem icon={FaPlusSquare} label="Add Property" address="addProperty" />
      <MenuItem
        icon={MdHouseSiding}
        label="My added properties"
        address="myAddedProperties"
      />
      <MenuItem
        icon={ LuCircleDollarSign }
        label="My sold properties"
        address="mySoldProperties"
      />
      <MenuItem
        icon={SiMinutemailer}
        label="Requested properties"
        address="requestedProperties"
      />
    </>
  );
};

export default AgentMenu;
