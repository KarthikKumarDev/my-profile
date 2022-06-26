import { useState } from "react";
import MenuItem from "./MenuItems";

import "./Menu.scss";

function Menu(props) {
  const [isMenuOpen, setMenu] = useState(false);
  return (
    <div className="profile-menu">
      <div className="flip-menu">
        <img
          src={
            isMenuOpen ? "./images/book-open.png" : "./images/book-closed.png"
          }
          alt="Menu"
          height="45px"
          onClick={(event) => setMenu(!isMenuOpen)}
        />
      </div>
      {isMenuOpen && <MenuItem />}
    </div>
  );
}

export default Menu;
