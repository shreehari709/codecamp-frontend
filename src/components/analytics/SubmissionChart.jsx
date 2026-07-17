import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const SubmissionChart =
({ data }) => {

  return (
    <div className="
      bg-slate-900
      rounded-xl
      p-6
    ">

      <h2 className="
        text-xl
        font-bold
        mb-5
      ">
        Activity Trend
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <LineChart
          data={data}
        >

          <XAxis
            dataKey="date"
          />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="count"
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
};

export default SubmissionChart;