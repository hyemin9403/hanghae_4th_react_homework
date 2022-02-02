import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="navbar">
      <Link to="/" style={{ textDecoration: "none" }}>
        Ham's 단어장
      </Link>
    </nav>
  );
};

export default Nav;
