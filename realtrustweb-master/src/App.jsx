import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import HomePage from "./Pages/Property/HomePage";
import MainContact from "./Pages/Contact/MainContact";
import ForRent from "./Pages/Rent/ForRent";
import FAQs from "./Pages/FAQs/FAQs";
import Gallery from "./Pages/Gallery/Gallery";
import MainBlog from "./Pages/Blog/MainBlog";
import Login from "./Auth/Login/Login";
import UserProfile from "./Profile/User/UserProfile";
import OwnerProfile from "./Profile/Owner/OwnerProfile";
import ScheduleConfirmation from "./Pages/ScheduleForm/ScheduleConfirmation";
import ForSale from "./Pages/Sale/ForSale";
import Detail from "./Pages/PropertyDetail/Detail";
import AddProperty from "./Profile/Owner/Properties/AddProperty/AddProperty";
import UseOwnerAuth from "./hooks/useOwnerAuth";
import MainFooter from "./Components/Footer/mainFooter";
import UseUserAuth from "./hooks/useUserAuth";
import UpcomingProject from "./Pages/upcomingProjects/upcoming-project";
import PropertyManagement from "./Pages/propertyManagement/property-managent";
import TermsAndCondition from "./Pages/terms_and_condition/TermsAndCondition";

function App() {
  window.scrollTo(0, 0);
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/property" element={<HomePage />} />
        <Route path="/rent" element={<ForRent />} />
        <Route path="/sale" element={<ForSale />} />
        <Route path="/contact" element={<MainContact />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/blog" element={<MainBlog />} />
        <Route path="/upcoming-projects" element={<UpcomingProject />} />
        <Route path="/project-management" element={<PropertyManagement />} />
        {/* Auth */}
        <Route path="/login" element={<Login />} />
        {/* Private route for User */}
        <Route element={<UseUserAuth />}>
          <Route path="/userprofile" element={<UserProfile />} />
        </Route>
        {/* Private route for Owner */}
        <Route element={<UseOwnerAuth />}>
          <Route path="/ownerprofile" element={<OwnerProfile />} />
        </Route>
        <Route
          path="/scheduleconfirmation"
          element={<ScheduleConfirmation />}
        />
        <Route path="/term-and-condition" element={<TermsAndCondition />} />
        <Route path="/property/:slug" element={<Detail />} />
        <Route path="/add-property" element={<AddProperty />} />
      </Routes>
      <MainFooter />
    </Router>
  );
}

export default App;
