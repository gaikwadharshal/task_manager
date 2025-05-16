import { useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

const TaskList = ({ tasks, onTaskChange }) => {
  const [editingId, setEditingId] = useState(null);
  const [editedTask, setEditedTask] = useState({ title: "", description: "", status: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState("all");
  const tasksPerPage = 2;

  // Filter tasks based on filterStatus
  const filteredTasks = tasks.filter(task => 
    filterStatus === "all" ? true : task.status === filterStatus
  );

  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
  const paginatedTasks = filteredTasks.slice((currentPage - 1) * tasksPerPage, currentPage * tasksPerPage);

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      toast.success("Task deleted successfully!");
      onTaskChange();
    } catch (error) {
      toast.error("Failed to delete task. Please try again.");
    }
  };

  const startEditing = (task) => {
    setEditingId(task._id);
    setEditedTask({ title: task.title, description: task.description, status: task.status });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditedTask({ title: "", description: "", status: "" });
  };

  const updateTask = async (id) => {
    try {
      await API.put(`/tasks/${id}`, editedTask);
      toast.success("Task updated successfully!");
      cancelEdit();
      onTaskChange();
    } catch (error) {
      toast.error("Failed to update task. Please try again.");
    }
  };

  // Reset to first page when filter changes
  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-4">
      {/* Filter dropdown */}
      <div className="mb-4">
        <label htmlFor="filter" className="mr-2 font-semibold">Filter by status:</label>
        <select
          id="filter"
          value={filterStatus}
          onChange={handleFilterChange}
          className="px-3 py-2 border rounded"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {paginatedTasks.map((task, index) => (
        <div key={task._id} className="p-4 bg-white shadow rounded">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-500 font-semibold">{(currentPage - 1) * tasksPerPage + index + 1}</span>
          </div>

          {editingId === task._id ? (
            <div className="space-y-2">
              <input
                type="text"
                value={editedTask.title}
                onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              />
              <textarea
                value={editedTask.description}
                onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              />
              <select
                value={editedTask.status}
                onChange={(e) => setEditedTask({ ...editedTask, status: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="pending">Pending</option>
                <option value="in progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              <div className="flex gap-2 mt-2">
                <button
                  className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                  onClick={() => updateTask(task._id)}
                >
                  Save
                </button>
                <button
                  className="bg-gray-300 text-black px-4 py-1 rounded hover:bg-gray-400"
                  onClick={cancelEdit}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <h3 className="text-xl font-semibold">{task.title}</h3>
              <p>{task.description}</p>
              <p className="text-sm text-gray-500">Status: {task.status}</p>
              <div className="flex gap-2 mt-2">
                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  onClick={() => startEditing(task)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  onClick={() => deleteTask(task._id)}
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TaskList;
