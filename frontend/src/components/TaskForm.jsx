import { useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

const TaskForm = ({ onTaskAdded }) => {
  const [form, setForm] = useState({ title: "", description: "", status: "pending" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/tasks", form);
      toast.success("Task added successfully!");
      setForm({ title: "", description: "", status: "pending" });
      onTaskAdded();
    } catch (error) {
      toast.error("Failed to add task. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-xl shadow space-y-4">
      <input
        type="text"
        placeholder="Title"
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <textarea
        placeholder="Description"
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <select
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
      >
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
