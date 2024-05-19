import { useState } from "react";

export default function Profile() {
  const [tasks, setTasks] = useState(tasksPlaceholder);

  const totalTasks = tasks.length;
  const completedTasksCount = tasks.filter((task) => task.complete).length;

  const toggleComplete = (index) => {
    const newTasks = [...tasks];
    newTasks[index].complete = !newTasks[index].complete;
    setTasks(newTasks);
  };

  const calculatePercentage = () => {
    const percentage = (completedTasksCount / totalTasks) * 100;
    return percentage;
  };

  //   console.log(tasks.length);
  //   console.log(completedTasksCount);

  return (
    <>
      <div className="flex max-md:flex-col m-5 md:m-20 items-center justify-center bg-white gap-5">
        <div className="w-full max-w-md p-8 bg-white border-4 border-black">
          <div className="text-center">
            <h1 className="text-wrap">Luan Nguyen</h1>
            <h3 className="m-3">Current Ranking: #1</h3>
            <p className="text-3xl m-3">🚀 🌱 🥇 💻</p>
          </div>

          <progress
            max={totalTasks}
            value={completedTasksCount}
            className="w-full"
          ></progress>

          <div className="flex flex-row justify-between">
            <p className="">{calculatePercentage()}%</p>
            <p className="text-right">Level 1/10</p>
          </div>

          <div className="w-100 border-4 border-black p-5 mt-5">
            <h3 className="text-2xl">Tasks:</h3>
            {tasks.map((task, index) => (
              <Checkbox
                key={index}
                task={task.task}
                complete={task.complete}
                toggleComplete={() => toggleComplete(index)}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5 max-md:flex-row">
          <div className="w-full max-w-md p-5 bg-white border-4 border-black max-md:my-2 my-10">
            <h3 className="font-bold text-xl">Current Perks:</h3>
            {currentPerks.map((perk) => (
              <p>○ {perk.perk}</p>
            ))}
          </div>
          <div className="w-full max-w-md p-5 bg-white border-4 border-black max-md:my-2 my-10">
            <h3 className="font-bold text-xl">Next Level:</h3>
            {nextPerks.map((perk) => (
              <p>○ {perk.perk}</p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function Checkbox({ task, complete, toggleComplete }) {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        checked={complete}
        className="w-5 mr-4"
        onChange={toggleComplete}
      ></input>
      <p>{task}</p>
    </div>
  );
}

const currentPerks = [
  {
    perk: "Certification",
  },
  {
    perk: "Access to Slack",
  },
  {
    perk: "...",
  },
];

const nextPerks = [
  {
    perk: "Networking",
  },
  {
    perk: "...",
  },
  {
    perk: "...",
  },
];

const tasksPlaceholder = [
  {
    task: "Attend One of Our Events.",
    complete: true,
  },
  {
    task: "Subscribe to the Newsletter",
    complete: false,
  },
  {
    task: "Introduce Yourself in Discord.",
    complete: true,
  },
  {
    task: "Register for the Hackathon.",
    complete: false,
  },
  {
    task: "We can put more tasks",
    complete: false,
  },
];
