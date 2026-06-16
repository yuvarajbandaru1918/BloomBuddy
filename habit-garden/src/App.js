import { useState, useEffect } from "react";
import Login from "./components/Login";
import UserProfile from "./components/UserProfile";
import HabitForm from "./components/HabitForm";
import HabitCard from "./components/HabitCard";
import Garden from "./components/Garden";
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [showCongrats, setShowCongrats] = useState(false);

  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem("habits");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem("currentUser");
    if (user) {
      setCurrentUser(user);
      setLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  const addHabit = (name) => {
    const newHabit = {
      id: Date.now(),
      name,
      streak: 0,
    };

    setHabits([...habits, newHabit]);
  };

  const completeHabit = (id) => {
    setHabits(
      habits.map((habit) => {
        if (habit.id === id) {
          const newStreak = habit.streak + 1;

          if (newStreak === 30) {
            setShowCongrats(true);
          }

          return {
            ...habit,
            streak: newStreak,
          };
        }

        return habit;
      })
    );
  };

  const deleteHabit = (id) => {
    setHabits(
      habits.filter((habit) => habit.id !== id)
    );
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setCurrentUser("");
  };

  const handleLogin = () => {
    const user = localStorage.getItem("currentUser");
    setCurrentUser(user);
    setLoggedIn(true);
  };

  if (!loggedIn) {
    return (
      <Login
        onLogin={handleLogin}
      />
    );
  }

  return (
    <div className="app">

      <UserProfile 
        currentUser={currentUser} 
        onLogout={handleLogout}
      />

      {showCongrats && (
        <div className="popup">
          <h2>🎉 Congratulations!</h2>

          <p>
            You achieved a 30-day streak!
            Your garden is blooming beautifully
            🌸🌳
          </p>

          <button
            onClick={() =>
              setShowCongrats(false)
            }
          >
            Continue Growing 🌱
          </button>
        </div>
      )}

      <h1>🌸 BloomBuddy</h1>

      <HabitForm addHabit={addHabit} />

      <Garden habits={habits} />

      {habits.map((habit) => (
        <HabitCard
          key={habit.id}
          habit={habit}
          completeHabit={completeHabit}
          deleteHabit={deleteHabit}
        />
      ))}
    </div>
  );
}

export default App;
