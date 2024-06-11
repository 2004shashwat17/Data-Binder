import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Table} from "../components/Table";
import {Addstudent} from "../components/Addstudent";

export const AllRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Table/>} />
        <Route path="/Add" element={<Addstudent />} />
      </Routes>
    </Router>
  );
};
