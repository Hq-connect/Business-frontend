import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import OnboardingPage from "./pages/OnboardingPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import Layout from "./components/landing/Layout";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/onboard" element={<OnboardingPage />} />
        <Route path="/services/:serviceId" element={<ServiceDetailPage />} />
      </Route>
    </Routes>
  );
}

export default App;