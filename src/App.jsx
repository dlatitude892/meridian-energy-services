import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ContentProvider } from "./lib/ContentContext";
import { LoadingScreen } from "./components/LoadingScreen";
import { Layout } from "./components/Layout";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Services from "./pages/Services.jsx";
import ServiceDetail from "./pages/ServiceDetail.jsx";
import GlobalOperations from "./pages/GlobalOperations.jsx";
import Projects from "./pages/Projects.jsx";
import ProjectDetail from "./pages/ProjectDetail.jsx";
import News from "./pages/News.jsx";
import NewsDetail from "./pages/NewsDetail.jsx";
import People from "./pages/People.jsx";
import Gallery from "./pages/Gallery.jsx";
import Careers from "./pages/Careers.jsx";
import JobDetail from "./pages/JobDetail.jsx";
import Contact from "./pages/Contact.jsx";
import Sustainability from "./pages/Sustainability.jsx";
import Safety from "./pages/Safety.jsx";
import Partners from "./pages/Partners.jsx";
import Legal from "./pages/Legal.jsx";
import NotFound from "./pages/NotFound.jsx";

import StaffLogin from "./pages/StaffLogin.jsx";
import StaffDashboard from "./pages/StaffDashboard.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

export default function App() {
  const [showLoader, setShowLoader] = useState(true);

  return (
    <ContentProvider>
      {showLoader && <LoadingScreen onDone={() => setShowLoader(false)} />}
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/global-operations" element={<GlobalOperations />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:id" element={<NewsDetail />} />
            <Route path="/people" element={<People />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/careers/:id" element={<JobDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/sustainability" element={<Sustainability />} />
            <Route path="/safety" element={<Safety />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/privacy-policy" element={<Legal type="privacy" />} />
            <Route path="/terms" element={<Legal type="terms" />} />
            <Route path="/cookie-policy" element={<Legal type="cookies" />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route path="/staff/login" element={<StaffLogin />} />
          <Route path="/staff" element={<StaffDashboard />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </ContentProvider>
  );
}
