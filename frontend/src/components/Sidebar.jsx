import { useAuth } from "../context/AuthContext";

const Sidebar = ({ active, setActive }) => {
  const { user } = useAuth();

  return (
    <aside className="w-64 bg-white h-screen shadow-md p-6 flex flex-col" aria-label="Sidebar Navigation">
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-1">Welcome</h2>
        <p className="text-gray-700 font-medium">{user ? user.name : ""}</p>
      </div>

      <nav>
        <ul className="flex flex-col space-y-4">
          {[
            { id: "add", label: "Add Task" },
            { id: "view", label: "View Tasks" },
          ].map(({ id, label }) => (
            <li key={id}>
              <button
                type="button"
                aria-pressed={active === id}
                onClick={() => setActive(id)}
                className={`w-full text-left px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  active === id
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-blue-100"
                }`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
