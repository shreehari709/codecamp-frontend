const LeaderboardTable = ({
  users
}) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">

      <table className="w-full">

        <thead>

          <tr className="border-b border-slate-700">

            <th className="p-4">
              Rank
            </th>

            <th>
              Name
            </th>

            <th>
              XP
            </th>

          </tr>

        </thead>

        <tbody>

          {users.map(
            (
              user,
              index
            ) => (
              <tr
                key={
                  user._id
                }
                className="border-b border-slate-800"
              >
                <td className="p-4">
                  #{index + 1}
                </td>

                <td>
                  {user.name}
                </td>

                <td>
                  {user.xp}
                </td>
              </tr>
            )
          )}

        </tbody>

      </table>

    </div>
  );
};

export default LeaderboardTable;