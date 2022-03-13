import { useState } from "react";
import "./Menu.scss";

function Menu(props) {
  const [isMenuOpen, setMenu] = useState(false);
  return (
    <div className="flip-menu">
      <img
        src={isMenuOpen ? "./images/book-open.png" : "./images/book-closed.png"}
        height="45px"
        onClick={(event) =>setMenu(!isMenuOpen)}
      />
    </div>
  );
}

export default Menu;
