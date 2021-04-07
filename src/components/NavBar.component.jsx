//import { Link } from "react-router-dom";

const NavBar = () => {
  const navStyle = {
    display: "flex",
    alignItems: "center",
    background: "lightGrey",
    borderBottom: "1px solid black",
    height: "50px",
  };

  const styleItem = {
    marginLeft: "50%",
  };

  return (
    <div style={navStyle}>
      <div style={styleItem}>Race Ready App</div>
    </div>
  );
};

export default NavBar;
