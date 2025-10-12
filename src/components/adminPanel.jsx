import React, { useEffect, useState } from "react";
import Dashboard from "./adminComps/Dashboard";
import Employees from "./adminComps/Employees";
import QRGeneration from "./adminComps/QRGeneration";



function AdminPanel() {
  useEffect(() => {
    document.title = "IDEAL TRADERS | ADMIN PANEL";
  }, []);
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  // Render active tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "employees":
        return <Employees />;
      case "qr":
        return <QRGeneration />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      <div className="w-screen p-5 border-b border-gray-300 shadow-lg">
        <h1 className="text-lg font-bold">Admin Panel</h1>
      </div>
      <div>
        <div className="flex space-x-4 mt-4 p-4 bg-white border-b border-gray-300">
          <button
            className={`px-4 py-2 text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              activeTab === "dashboard"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => handleTabClick("dashboard")}
          >
            Dashboard
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              activeTab === "employees"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => handleTabClick("employees")}
          >
            Employees
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              activeTab === "review"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => handleTabClick("review")}
          >
            Reviews
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              activeTab === "qr"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => handleTabClick("qr")}
          >
            QR Generation
          </button>
        </div>
        {/* Render tab content */}
        {renderTabContent()}
      </div>
    </>
  );
}

export default AdminPanel;
