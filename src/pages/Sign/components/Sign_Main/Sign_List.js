import { Route, Routes } from "react-router-dom";
import Sign_Main from "./Sign_Main";
import Sign_Wait from "./Sign_Wait";
import Sign_Write from "./Sign_Wirte";
import Sign_Complete from "./Sign_Complete";

const Sign_List = () => {
  return (
    <Routes>
      <Route path="/" element={<Sign_Main />} />
      <Route path="/wait" element={<Sign_Wait />} />
      <Route path="/write" element={<Sign_Write />} />
      <Route path="/progress" element={<Sign_Progress />} />
      <Route path="/complete" element={<Sign_Complete />} />
    </Routes>
  );
};

export default Sign_List;