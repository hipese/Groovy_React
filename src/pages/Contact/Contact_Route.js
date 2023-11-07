import { Route, Routes } from "react-router-dom";
import Contact from "./Contact";
import Contact_Favorite from "./Contact_Favorite";
import Contact_Group from "./Contact_Group";
import Contact_External from "./Contact_External";


const Contact_Route = () => {

    return (
        <Routes>
            <Route path="/" element={<Contact />} />
            <Route path="/favorite" element={<Contact_Favorite />} />
            <Route path="/groupcontact" element={<Contact_Group />} />
            <Route path="/externalcontact" element={<Contact_External />} />
        </Routes>
    )
}

export default Contact_Route;