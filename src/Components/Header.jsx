// components/Header.jsx
const Header = ({ theme, onThemeChange }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Habit Tracker</h1>
      <button
        onClick={onThemeChange}
        className="text-sm px-3 py-1 rounded border dark:border-gray-700 border-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-black dark:text-white"
      >
        {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
      </button>
    </div>
  );
};

export default Header;
