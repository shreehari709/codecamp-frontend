import { useState } from "react";
import toast from "react-hot-toast";
import { submitTask } from "../services/taskService";

const TaskCard = ({
  task,
  submission
}) => {

  const [link, setLink] =
    useState("");

  const handleSubmit =
    async () => {

      try {

        await submitTask({
          taskId: task._id,
          solutionLink: link
        });

        toast.success(
          "Task Submitted"
        );

        setLink("");

      } catch {

        toast.error(
          "Submission Failed"
        );

      }
    };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">

      <h2 className="text-white font-semibold text-lg">
        {task.title}
      </h2>

      <p className="text-slate-400 mt-2">
        {task.platform}
      </p>

      <a
        href={task.questionLink}
        target="_blank"
        rel="noreferrer"
        className="text-blue-500 block mt-3"
      >
        Open Problem
      </a>

      {/* Status Badge */}

      {submission && (
        <div
          className={`
            mt-4 px-3 py-2 rounded-lg text-white font-medium

            ${
              submission.status === "approved"
                ? "bg-green-600"
                : submission.status === "rejected"
                ? "bg-red-600"
                : "bg-yellow-600"
            }
          `}
        >
          Status: {submission.status}
        </div>
      )}

      {/* Hide form if already submitted */}

      {!submission && (
        <>
          <input
            value={link}
            onChange={(e) =>
              setLink(e.target.value)
            }
            placeholder="Solution Link"
            className="w-full mt-4 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white"
          />

          <button
            onClick={handleSubmit}
            className="mt-4 bg-green-600 px-4 py-2 rounded-lg"
          >
            Submit
          </button>
        </>
      )}

    </div>
  );
};

export default TaskCard;