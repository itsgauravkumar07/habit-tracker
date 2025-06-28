// components/HabitForm.jsx
const HabitForm = ({ newHabit, readInput, addHabit, error }) => {
  return (
    <div>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newHabit}
          onChange={readInput}
          placeholder="Enter a new habit"
          className="flex-1 px-4 py-2 rounded border dark:border-gray-700 border-gray-300 bg-white dark:bg-gray-800 text-sm outline-none"
        />
        <button
          onClick={addHabit}
          className="px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded"
        >
          Add
        </button>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default HabitForm;
