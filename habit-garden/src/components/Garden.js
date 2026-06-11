function getPlant(streak) {
  if (streak >= 30) return "🌳";
  if (streak >= 15) return "🌷";
  if (streak >= 7) return "🌿";
  if (streak >= 3) return "🌱";

  return "🌰";
}

function getCreature(streak) {
  if (streak >= 30) return "✨🦋";
  if (streak >= 15) return "🦋";
  if (streak >= 7) return "🐝";
  return "";
}

function Garden({ habits }) {
  return (
    <div className="garden">
      <h2>🌸 My Garden</h2>

      <div className="plants">
        {habits.map((habit) => (
          <div key={habit.id}>
            
            <div className="plant">
              {getPlant(habit.streak)}
            </div>

            <div className="creature">
              {getCreature(habit.streak)}
            </div>

            <p>{habit.name}</p>

            <p>🔥 {habit.streak} Day Streak</p>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Garden;