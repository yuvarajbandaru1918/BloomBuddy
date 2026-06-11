function HabitCard({
  habit,
  completeHabit,
  deleteHabit,
}) {
  return (
    <div className="habit-card">
      <h3>{habit.name}</h3>

      <p>🔥 Streak: {habit.streak}</p>

      <button
        onClick={() => completeHabit(habit.id)}
      >
        Complete
      </button>

      <button
        onClick={() => deleteHabit(habit.id)}
      >
        Delete
      </button>
    </div>
  );
}

export default HabitCard;