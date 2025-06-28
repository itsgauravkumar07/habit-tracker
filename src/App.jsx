import { useEffect, useState } from "react";
import Header from "./Components/Header";
import HabitForm from "./Components/HabitForm";
import HabitItem from "./Components/HabitItem";

function App() {
  const [newHabit, setNewHabit] = useState("");
  const [habitList, setHabitList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editHabit, setEditHabit] = useState("");
  const [theme, setTheme] = useState("light");
  const [error, setError] = useState("");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    const loadHabit = localStorage.getItem("habitList");
    if (loadHabit) setHabitList(JSON.parse(loadHabit));
  }, []);

  const readInput = (e) => setNewHabit(e.target.value);

  const addHabit = () => {
    if (newHabit.trim() === "") {
      setError("Please enter a habit.");
      return;
    }
    setError("");
    const updateList = [
      ...habitList,
      {
        name: newHabit,
        completed: false,
        streak: 0,
        lastCompleteDate: new Date().toDateString(),
      },
    ];
    setHabitList(updateList);
    localStorage.setItem("habitList", JSON.stringify(updateList));
    setNewHabit("");
  };

  const deleteHabit = (index) => {
    const updated = habitList.filter((_, i) => i !== index);
    setHabitList(updated);
    localStorage.setItem("habitList", JSON.stringify(updated));
  };

  const toggleComplete = (index) => {
    const updatedList = [...habitList];
    updatedList[index].completed = !updatedList[index].completed;

    const habit = updatedList[index];
    const today = new Date().toDateString();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayDate = yesterday.toDateString();

    habit.lastCompleteDate === yesterdayDate
      ? (habit.streak += 1)
      : (habit.streak = 1);

    habit.lastCompleteDate = today;

    setHabitList(updatedList);
    localStorage.setItem("habitList", JSON.stringify(updatedList));
  };

  const startEditing = (index, name) => {
    setEditIndex(index);
    setEditHabit(name);
  };

  const saveHabit = () => {
    const updated = [...habitList];
    updated[editIndex].name = editHabit;
    setHabitList(updated);
    localStorage.setItem("habitList", JSON.stringify(updated));
    setEditIndex(null);
    setEditHabit("");
  };

  const clearAll = () => {
    setHabitList([]);
    localStorage.setItem("habitList", JSON.stringify([]));
  };

  const themeChanger = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div
      className={`min-h-screen px-4 py-6 ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-white"
      }`}
    >
      <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-4 rounded shadow">
        <Header theme={theme} onThemeChange={themeChanger} />
        <HabitForm
          newHabit={newHabit}
          readInput={readInput}
          addHabit={addHabit}
          error={error}
        />
        <ul>
          {habitList.map((habit, index) => (
            <HabitItem
              key={index}
              habit={habit}
              index={index}
              editIndex={editIndex}
              editHabit={editHabit}
              toggleComplete={toggleComplete}
              startEditing={startEditing}
              saveHabit={saveHabit}
              setEditHabit={setEditHabit}
              deleteHabit={deleteHabit}
            />
          ))}
        </ul>
        <button
          onClick={clearAll}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Clear All
        </button>
      </div>
    </div>
  );
}

export default App;
