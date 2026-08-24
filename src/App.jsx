import { useState } from "react";
import LandingPage from "./pages/LandingPage";
import OnboardingPage from "./pages/OnboardingPage";

function App() {
  const [currentRoute, setCurrentRoute] = useState(() => {
    return window.location.pathname === "/onboard" ? "onboard" : "landing";
  });

  const navigateToOnboard = () => {
    setCurrentRoute("onboard");
    window.history.pushState({}, "", "/onboard");
  };

  const navigateToLanding = () => {
    setCurrentRoute("landing");
    window.history.pushState({}, "", "/");
  };

  if (currentRoute === "onboard") {
    return <OnboardingPage onBackToHome={navigateToLanding} />;
  }

  return <LandingPage onNavigateOnboard={navigateToOnboard} />;
}

export default App;