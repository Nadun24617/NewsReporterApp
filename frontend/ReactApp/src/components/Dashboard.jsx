import { useState } from "react";
import { FaUsers, FaClipboardList, FaCheckCircle, FaStar, FaUserCog } from "react-icons/fa";
import { motion } from "framer-motion";
import AdminManager from "./AdminManager"; // Import the AdminManager component
import Reporters from "./Reporters"; // Import the Reporters component

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: <FaUsers /> },
    { name: "View Existing Reporters", icon: <FaClipboardList /> },
    { name: "Check Received News Reports", icon: <FaCheckCircle /> },
    { name: "Reporters Feedback & Ratings", icon: <FaStar /> },
    { name: "Manage Admins", icon: <FaUserCog /> }, // New menu item for managing admins
  ];

  return (
    <div className="flex h-screen bg-blue-100">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-64 bg-white p-4 shadow-lg"
      >
        <h2 className="text-xl font-bold mb-4">හෙළ NEWS</h2>
        <ul>
          {menuItems.map((item) => (
            <li
              key={item.name}
              className={`flex items-center mt-3 p-3 gap-2 rounded-lg cursor-pointer transition-all duration-300 ${
                activeTab === item.name ? "bg-red-500 text-white" : "hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab(item.name)}
            >
              {item.icon} {item.name}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-1 p-6"
      >
        <h1 className="text-2xl font-semibold">{activeTab}</h1>
        <div className="mt-4 bg-white p-6 shadow-md rounded-lg">
          {/* Render AdminManager component when "Manage Admins" is selected */}
          {activeTab === "Manage Admins" && <AdminManager />}

          {/* Render Reporters component when "View Existing Reporters" is selected */}
          {activeTab === "View Existing Reporters" && <Reporters />}

          {/* Default content for other tabs */}
          {activeTab !== "Manage Admins" && activeTab !== "View Existing Reporters" && (
            <p>Content for {activeTab} will be displayed here.</p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;