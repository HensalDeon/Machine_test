import logo from "../../img/logo.svg";
import LogoSearch from "../LogoSearch/LogoSearch";
import "./Navbar.scss";
function Navbar() {
    return (
        <nav>
            <div className="nav-cont">
                <img src={logo} />
                <LogoSearch/>
            </div>
            <i className="fas fa-sign-out-alt"> LogOut</i>
        </nav>
    );
}

export default Navbar;
