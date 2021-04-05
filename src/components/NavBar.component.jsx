//import { Link } from "react-router-dom";

const NavBar = () => {
  const navStyle = {
    display: "flex",
    alignItems: "center",
    background: "wheat",
    borderBottom: "1px solid black",
    height: "50px",
  };

  const styleItem = {
    marginLeft: "50rem",
  };

  return (
    <div style={navStyle}>
      <div style={styleItem}>Race Ready App</div>
      {/* <Link style={styleItem} to="/">
        Home
      </Link>
      <Link to="/products">Products</Link> */}
    </div>
  );
};

export default NavBar;
