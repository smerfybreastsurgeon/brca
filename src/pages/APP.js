import PstagesList from "./pstages/PstagesList";
import CstagesList from "./cstages/CstagesList";
import AddPstageForm1 from "./pstages/AddPstageForm1";
import AddCstageForm from "./cstages/AddCstageForm";
import SinglePstagePage from "./pstages/SinglePstagePage";
import EditCstageForm from "./cstages/EditCstageForm";
import EditPstageForm1 from "./pstages/EditPstageForm1";
import PatientsList from "./patients/PatientsList";
import EditPatient1 from "./patients/EditPatient1";
import AddIHCForm from "./subtypes/AddIHCForm";
import EditIHCForm from "./subtypes/EditIHCForm";
import SingleSubtypePage from "./subtypes/SingleSubtypePage";
import Layout from "../components/Layout";
import { Routes, Route, Navigate } from 'react-router-dom';
import SingleCstagePage from "./cstages/SingleCstagePage";
import SubtypeList from "./subtypes/SubtypeList";
import SinglePatientPage1 from "./patients/SinglePatientPage1";
import SurgeryList from "./surgery/SurgeryList";
import SingleSurgeryPage from "./surgery/SingleSurgeryPage";
import EditSurgForm from "./surgery/EditSurgForm";
import AddSurgForm from "./surgery/AddSurgForm";
import SingleNeoadjuvantPage from "./neoadjuvant/SingleNeoadjuvantPage";
import NeoadjuvantList from "./neoadjuvant/NeoadjuvantList";
import AddNeoadjuvant from "./neoadjuvant/AddNeoadjuvant";
import EditNeoadjuvant from "./neoadjuvant/EditNeoadjuvant";
import AddRecur from "./recurrent/AddRecur";
import EditRecur from "./recurrent/EditRecur";
import SingleRecurPage from "./recurrent/SingleRecurPage";
import RecurList from "./recurrent/RecurList";
import SignUp from "./users/SignUp";
import LogIn from "./users/LogIn";
import Home from "./home/Home";
import { AuthProvider } from "./users/Auth";






function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="home" element={<Home />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<LogIn />} />        
          <Route path="patient">
            <Route index element={<PatientsList />} />
            <Route path=":patientId" element={<SinglePatientPage1 />} />
            <Route path="edit/:patientId" element={<EditPatient1 />} />
            <Route path=":patientId/pstage" element={<PstagesList />} />
          </Route>
          <Route path="pstage">
            <Route index element={<PstagesList />} />
            <Route path="search" element={<AddPstageForm1 />} />
            <Route path="edit/:pstageId" element={<EditPstageForm1 />} />
            <Route path=":patientId" element={<PstagesList />} />
            <Route path="view/:pstageId" element={<SinglePstagePage />} />
          </Route>
          <Route path="subtype">
            <Route index element={<SubtypeList />} />
            <Route path="search/" element={<AddIHCForm />} />
            <Route path="edit/:subtypeId" element={<EditIHCForm />} />
            <Route path=":patientId" element={<SubtypeList />} />
            <Route path="view/:subtypeId" element={<SingleSubtypePage />} />
          </Route>
          <Route path="neoadjuvant">
            <Route index element={<NeoadjuvantList />} />
            <Route path="search/" element={<AddNeoadjuvant />} />
            <Route path="edit/:neoadjuvantId" element={<EditNeoadjuvant />} />
            <Route path=":patientId" element={<NeoadjuvantList />} />
            <Route path="view/:neoadjuvantId" element={<SingleNeoadjuvantPage />} />
          </Route>
          <Route path="surgery">
            <Route index element={<SurgeryList />} />
            <Route path="search/" element={<AddSurgForm />} />
            <Route path="edit/:surgeryId" element={<EditSurgForm />} />
            <Route path=":patientId" element={<SurgeryList />} />
            <Route path="view/:surgeryId" element={<SingleSurgeryPage />} />
          </Route>
          <Route path="recur">
            <Route index element={<RecurList />} />
            <Route path="search/" element={<AddRecur />} />
            <Route path="edit/:recurId" element={<EditRecur />} />
            <Route path=":patientId" element={<RecurList />} />
            <Route path="view/:recurId" element={<SingleRecurPage />} />
          </Route>
          <Route path="cstage">
            <Route index element={<CstagesList />} />
            <Route path="search" element={<AddCstageForm />} />
            <Route path="edit/:cstageId" element={<EditCstageForm />} />
            <Route path=":patientId" element={<CstagesList />} />
            <Route path="view/:cstageId" element={<SingleCstagePage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
