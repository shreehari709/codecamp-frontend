const StatCard = ({
  title,
  value
}) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">

      <h4 className="text-slate-400 text-sm">
        {title}
      </h4>

      <h2 className="text-3xl font-bold text-white mt-2">
        {value}
      </h2>

    </div>
  );
};

export default StatCard;