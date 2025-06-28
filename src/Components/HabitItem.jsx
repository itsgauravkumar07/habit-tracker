// components/HabitItem.jsx
const HabitItem = ({
  habit,
  index,
  editIndex,
  editHabit,
  toggleComplete,
  startEditing,
  saveHabit,
  setEditHabit,
  deleteHabit,
}) => {
  return (
    <li className="flex justify-between items-center p-4 mb-2 bg-white dark:bg-gray-700 rounded shadow">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={habit.completed}
          onChange={() => toggleComplete(index)}
          className="h-4 w-4"
        />

        {editIndex === index ? (
          <input
            value={editHabit}
            onChange={(e) => setEditHabit(e.target.value)}
            className="text-sm px-2 py-1 border rounded bg-white dark:bg-gray-700 dark:text-white"
          />
        ) : (
          <div>
            <span
              className={`block text-sm font-medium ${
                habit.completed
                  ? "line-through text-gray-400"
                  : "text-gray-900 dark:text-white"
              }`}
            >
              {habit.name}
            </span>
            <span className="text-xs text-gray-500">
              🔥 Streak: {habit.streak} {habit.streak === 1 ? "day" : "days"}
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        {editIndex === index ? (
          <button
            onClick={saveHabit}
            className="text-sm px-3 py-1 bg-green-500 text-white rounded"
          >
            Save
          </button>
        ) : (
          <>
            <button
              onClick={() => startEditing(index, habit.name)}
              className="text-sm px-2 py-1 bg-yellow-500 text-white rounded"
            >
              ✏️
            </button>
            <button
              onClick={() => deleteHabit(index)}
              className="text-sm px-2 py-1 bg-red-500 text-white rounded"
            >
              ❌
            </button>
          </>
        )}
      </div>
    </li>
  );
};

export default HabitItem;
