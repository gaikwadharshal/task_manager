import { useEffect, useState } from "react";
import API from "../services/api";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState("add"); // default to "Add Task"

  const fetchTasks = async () => {
    try {
      const { data } = await API.get("/tasks");
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <Sidebar active={activeTab} setActive={setActiveTab} />

      {/* Main content */}
      <main className="flex-1 p-10 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Task Manager Dashboard</h1>

        {activeTab === "add" && (
          <div className="mb-8">
            <TaskForm onTaskAdded={fetchTasks} />
          </div>
        )}

        {activeTab === "view" && (
          <TaskList tasks={tasks} onTaskChange={fetchTasks} />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
