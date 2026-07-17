const DashboardCard = ({
  title,
  value
}) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">

      <p className="text-slate-400">
        {title}
      </p>

      <h2 className="text-3xl font-bold text-white mt-2">
        {value}
      </h2>

    </div>
  );
};

export default DashboardCard;