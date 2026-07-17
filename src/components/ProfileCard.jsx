const ProfileCard = ({
  user
}) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">

      <h2 className="text-2xl font-bold">

        {user?.name}

      </h2>

      <p className="mt-2 text-slate-400">
        {user?.email}
      </p>

      <p className="mt-2 text-slate-400">
        Role:
        {" "}
        {user?.role}
      </p>

      <p className="mt-2 text-slate-400">
        XP:
        {" "}
        {user?.xp}
      </p>

    </div>
  );
};

export default ProfileCard;