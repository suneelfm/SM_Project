import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./Dark-Light.css";
import Calculator from "./pages/Calculator/Calculator";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import HealthRecords from "./pages/HealthRecords/HealthRecords";
import Home from "./pages/Home/Home";
import Layout from "./pages/Layout/Layout";
import OfficialRecords from "./pages/OfficialRecords/OfficialRecords";
import OtherRecords from "./pages/OtherRecords/OtherRecords";
import PersonalRecords from "./pages/PersonalRecors/PersonalRecords";
import Profile from "./pages/Profile/Profile";
import Settings from "./pages/Settings/Settings";
import ToDoList from "./pages/ToDoList/ToDoList";
import { getPersonalRecords } from "./Redux/Actions/getPersonalRecords";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPersonalRecords());
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="todolist" element={<ToDoList />} />
          <Route path="calculator" element={<Calculator />} />
          <Route path="details/personalrecords" element={<PersonalRecords />} />
          <Route path="details/officialrecords" element={<OfficialRecords />} />
          <Route path="details/healthrecords" element={<HealthRecords />} />
          <Route path="otherrecords" element={<OtherRecords />} />
          <Route path="settings" element={<Settings />} />
          <Route path="settings/profile" element={<Profile />} />
          <Route path="settings/changepassword" element={<ChangePassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
