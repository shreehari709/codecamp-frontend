import {
  useEffect,
  useState
} from "react";

import {
  getLeetcodeStats
} from "../../services/leetcodeService";

const LeetcodeStats = ({
  username
}) => {

  const [stats,
    setStats] =
    useState(null);

  useEffect(() => {

    const load =
      async () => {

        const data =
          await getLeetcodeStats(
            username
          );

        setStats(data);
      };

    load();

  }, [username]);

  if (!stats)
    return <p>Loading...</p>;

  return (
    <div      className="
              bg-linear-to-br
              from-teal-900
              via-teal-800
              to-emerald-900
              p-8
              text-white
              rounded-xl
            
    ">

      <h2 className="
        text-xl
        font-bold
        mb-5
      ">
        LeetCode Stats
      </h2>

      <div className="
        grid
        md:grid-cols-4
        gap-4
      ">

        <div>
          <p>Solved</p>

          <h3 className="
            text-2xl
            font-bold
          ">
            {
              stats.solved
                ?.solvedProblem
            }
          </h3>
        </div>

        <div>
          <p>Easy</p>

          <h3 className="
            text-2xl
            font-bold
          ">
            {
              stats.solved
                ?.easySolved
            }
          </h3>
        </div>

        <div>
          <p>Medium</p>

          <h3 className="
            text-2xl
            font-bold
          ">
            {
              stats.solved
                ?.mediumSolved
            }
          </h3>
        </div>

        <div>
          <p>Hard</p>

          <h3 className="
            text-2xl
            font-bold
          ">
            {
              stats.solved
                ?.hardSolved
            }
          </h3>
        </div>

      </div>

    </div>
  );
};

export default LeetcodeStats;