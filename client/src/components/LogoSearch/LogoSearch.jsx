import { UilSearch } from "@iconscout/react-unicons";
import "./LogoSearch.scss";
const LogoSearch = () => {
    return (
        <div className="LogoSearch">
                <div className="Search">
                    <input type="text" placeholder=" #Explore" />
                    <div className="s-icon">
                        <UilSearch />
                    </div>
                </div>
        </div>
    );
};


export default LogoSearch;
