import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import Header from "./components/Header";
import Home from "./pages/Home";
import Appliance from "./pages/Appliance";
import Book from "./pages/Book";
import Bookings from "./pages/Bookings";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";
import NotAuthorized from "./pages/NotAuthorized";

function CustomerOnly({ children }) {
  return <>{children}</>;
}

function AdminOnly() {
  return (
    <>
      <SignedIn>
        <Admin />
      </SignedIn>
      <SignedOut>
        <Navigate to="/admin/login" replace />
      </SignedOut>
    </>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
            </>
          }
        />
        <Route
          path="/services/:id"
          element={
            <>
              <Header />
              <Appliance />
            </>
          }
        />
        <Route
          path="/book"
          element={
            <>
              <Header />
              <CustomerOnly>
                <Book />
              </CustomerOnly>
            </>
          }
        />
        <Route
          path="/bookings"
          element={
            <>
              <Header />
              <CustomerOnly>
                <Bookings />
              </CustomerOnly>
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminOnly />} />
        <Route path="/not-authorized" element={<NotAuthorized />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
