/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/alt-text */
import "./navbar.scss";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import LanguageSharpIcon from "@mui/icons-material/LanguageSharp";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import { motion } from "framer-motion";

const navBarVarients = {
  initial: {
    y: -250,
  },
  animate: {
    y: 0,
    transition: {
      delay: 0.2,
      type: "spring",
      stiffness: "120",
    },
  },
};

export const NavBar = () => {
  return (
    <motion.div className="navbar" variants={navBarVarients} initial="initial" animate="animate">
      <div className="wrapper">
        <div className="search">
          <input className="search-input" type="text" placeholder="Search..." />
          <SearchSharpIcon />
        </div>
        <div className="items">
          <div className="item">
            <LanguageSharpIcon className="icon" />
            English
          </div>
          <div className="item">
            <DarkModeOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <FullscreenExitOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div>
          <div className="item">
            <FormatListBulletedOutlinedIcon className="icon" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
