import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./DropdowList.module.css";

function DropdownList({ title, icon, pages }) {
  const [isOpen, setIsOpen] = useState(true);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
  };

  return (
    <>
      <a
        to={"#"}
        className={`nav-link myCustomHighlightClass`}
        onClick={toggleDropdown}
        style={{ cursor: "pointer" }}
      >
        <i className={icon} />
        <p>{title} </p>
      </a>
      <div
        style={{
          height: height,
          transition: "height 0.5s",
          overflow: "hidden",
        }}
      >
        <ul ref={contentRef} className={`${styles.dropdownList} `}>
          {pages.map((page, index) => (
            <li key={index}>
              <NavLink to={`${page.path}`} className={`${styles.navLink}`}>
                <p>{page.name}</p>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default DropdownList;

/*
<li>
            <NavLink to={"#"} className={`${styles.navLink}`}>
              <p>Strona Główna</p>
            </NavLink>
          </li>
          <li>
            <NavLink to={"#"} className={`${styles.navLink}`}>
              <p>Footer</p>
            </NavLink>
          </li>
          <li>
            <NavLink to={"#"} className={`${styles.navLink}`}>
              <p>Footer</p>
            </NavLink>
          </li>
          <li>
            <NavLink to={"#"} className={`${styles.navLink}`}>
              <p>Footer</p>
            </NavLink>
          </li> */

/**${isOpen ? "" : styles.hidden} */
/*
  <li>
        <NavLink to={"#"} className="nav-link">
          <i className={"nc-icon nc-alien-33"} />
          <p>Strona Główna</p>
        </NavLink>
      </li>
      <li>
        <NavLink to={"#"} className="nav-link">
          <i className={"nc-icon nc-alien-33"} />
          <p>Footer</p>
        </NavLink>
      </li> */

/*<>
      <a to={"#"} className="nav-link" onClick={toggleList}>
        <i className={"nc-icon nc-alien-33"} />
        <p>Strona </p>
      </a>
      <div>
        <ul
          className={`${styles.dropdownList} ${isHidden ? "" : styles.hidden}`}
        >
          <li>
            <NavLink to={"#"} className="nav-link">
              <p>Strona Główna</p>
            </NavLink>
          </li>
          <li>
            <NavLink to={"#"} className="nav-link">
              <p>Footer</p>
            </NavLink>
          </li>
        </ul>
      </div>
    </> */
