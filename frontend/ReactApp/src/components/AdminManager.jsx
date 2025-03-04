import { useState, useEffect } from "react";

const AdminManager = () => {
  const [admins, setAdmins] = useState([]); // State to store all admins
  const [pendingAdmins, setPendingAdmins] = useState([]); // State to store pending admins

  // Fetch all admins from the backend
  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/admins");
      const data = await response.json();
      if (response.ok) {
        setAdmins(data);
        // Filter pending admins
        setPendingAdmins(data.filter((admin) => !admin.isApproved));
      } else {
        console.error("Failed to fetch admins:", data.message);
      }
    } catch (err) {
      console.error("Error fetching admins:", err);
    }
  };

  // Handle approve button click
  const handleApprove = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/auth/admins/${id}/approve`, {
        method: "PUT",
      });
      const data = await response.json();
      if (response.ok) {
        // Update the state
        fetchAdmins(); // Refresh the list
      } else {
        console.error("Failed to approve admin:", data.message);
      }
    } catch (err) {
      console.error("Error approving admin:", err);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Admin Details</h2>

      {/* Pending Admins Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Pending Admins</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left">First Name</th>
              <th className="p-3 text-left">Last Name</th>
              <th className="p-3 text-left">Username</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingAdmins.map((admin) => (
              <tr key={admin._id} className="border-b hover:bg-gray-100">
                <td className="p-3">{admin.firstName}</td>
                <td className="p-3">{admin.lastName}</td>
                <td className="p-3">{admin.username}</td>
                <td className="p-3">{admin.email}</td>
                <td className="p-3">
                  <button
                    onClick={() => handleApprove(admin._id)}
                    className="text-green-500 hover:text-green-700"
                  >
                    Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Approved Admins Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Approved Admins</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left">First Name</th>
              <th className="p-3 text-left">Last Name</th>
              <th className="p-3 text-left">Username</th>
              <th className="p-3 text-left">Email</th>
            </tr>
          </thead>
          <tbody>
            {admins
              .filter((admin) => admin.isApproved)
              .map((admin) => (
                <tr key={admin._id} className="border-b hover:bg-gray-100">
                  <td className="p-3">{admin.firstName}</td>
                  <td className="p-3">{admin.lastName}</td>
                  <td className="p-3">{admin.username}</td>
                  <td className="p-3">{admin.email}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminManager;