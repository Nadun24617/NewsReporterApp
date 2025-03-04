import { useState, useEffect } from "react";
import axios from "axios";

const Reporters = () => {
  const [reporters, setReporters] = useState([]);
  const [editingReporter, setEditingReporter] = useState(null); // For editing reporter details
  const [isModalOpen, setIsModalOpen] = useState(false); // For edit modal

  // Fetch all reporters
  useEffect(() => {
    fetchReporters();
  }, []);

  const fetchReporters = async () => {
    try {
      const response = await axios.get("https://634b-2402-d000-813c-173f-5479-6f65-3181-9ba5.ngrok-free.app/api/reporters/reporters");
      setReporters(response.data);
    } catch (error) {
      console.error("Error fetching reporters:", error);
    }
  };

  // Approve a reporter
  const approveReporter = async (id) => {
    try {
      await axios.put(`https://634b-2402-d000-813c-173f-5479-6f65-3181-9ba5.ngrok-free.app/api/reporters/approve/${id}`);
      fetchReporters(); // Refresh the list
    } catch (error) {
      console.error("Error approving reporter:", error);
    }
  };

  // Delete a reporter
  const deleteReporter = async (id) => {
    try {
      await axios.delete(`https://634b-2402-d000-813c-173f-5479-6f65-3181-9ba5.ngrok-free.app/api/reporters/${id}`);
      fetchReporters(); // Refresh the list
    } catch (error) {
      console.error("Error deleting reporter:", error);
    }
  };

  // Open edit modal and set the reporter to edit
  const openEditModal = (reporter) => {
    setEditingReporter(reporter);
    setIsModalOpen(true);
  };

  // Close edit modal
  const closeEditModal = () => {
    setEditingReporter(null);
    setIsModalOpen(false);
  };

  // Handle form submission for editing reporter
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://634b-2402-d000-813c-173f-5479-6f65-3181-9ba5.ngrok-free.app/api/reporters/${editingReporter._id}`, editingReporter);
      fetchReporters(); // Refresh the list
      closeEditModal(); // Close the modal
    } catch (error) {
      console.error("Error updating reporter:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Reporters List</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">First Name</th>
            <th className="border p-2">Last Name</th>
            <th className="border p-2">National ID</th>
            <th className="border p-2">Mobile</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reporters.map((reporter) => (
            <tr key={reporter._id} className="text-center">
              <td className="border p-2">{reporter.firstName}</td>
              <td className="border p-2">{reporter.lastName}</td>
              <td className="border p-2">{reporter.nic}</td>
              <td className="border p-2">{reporter.contactNumber}</td>
              <td className="border p-2">{reporter.email}</td>
              <td className="border p-2">
                {reporter.isApproved ? (
                  <span className="text-green-600">Approved</span>
                ) : (
                  <span className="text-red-600">Pending</span>
                )}
              </td>
              <td className="border p-2">
                {!reporter.isApproved && (
                  <button
                    onClick={() => approveReporter(reporter._id)}
                    className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Approve
                  </button>
                )}
                <button
                  onClick={() => openEditModal(reporter)}
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteReporter(reporter._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Edit Reporter</h3>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">First Name</label>
                <input
                  type="text"
                  value={editingReporter.firstName}
                  onChange={(e) =>
                    setEditingReporter({ ...editingReporter, firstName: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Last Name</label>
                <input
                  type="text"
                  value={editingReporter.lastName}
                  onChange={(e) =>
                    setEditingReporter({ ...editingReporter, lastName: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={editingReporter.email}
                  onChange={(e) =>
                    setEditingReporter({ ...editingReporter, email: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Mobile</label>
                <input
                  type="text"
                  value={editingReporter.contactNumber}
                  onChange={(e) =>
                    setEditingReporter({ ...editingReporter, contactNumber: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reporters;