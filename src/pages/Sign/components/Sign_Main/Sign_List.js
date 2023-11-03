import { Route, Routes } from "react-router-dom";
import Sign_Main from "./Sign_Main";
import Sign_Wait from "./Sign_Wait";
import Sign_Write from "./Sign_Wirte";
import Sign_Complete from "./Sign_Complete";
import Sign_Progress from "./Sign_Progress";

const SignM=()=>{
  return(
    <Sign_Main/>
  );
}
const SignWrt=()=>{
  return(
    <Sign_Write/>
  );
}

const SignWa=()=>{
  return(
    <Sign_Wait/>
  );
}

const SignP=()=>{
  return(
    <Sign_Progress/>
  );
}

const SignC=()=>{
  return(
    <Sign_Complete/>
  );
}

const Sign_List = () => {
  return (
    <Routes>
      <Route path="/" element={<SignM/>} />
      <Route path="/wait" element={<SignWa />} />
      <Route path="/write" element={<Sign_Write />} />
      {/* <Route path="/progress" element={<SignP />} />
      <Route path="/complete" element={<SignC />} /> */}
    </Routes>
  );
};

export default Sign_List;