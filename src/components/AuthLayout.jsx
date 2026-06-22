const AuthLayout = ({
  children,
  title,
  subtitle
}) => {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">

      <div className="w-full max-w-md">

        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-blue-500">
            CodeCamp
          </h1>

          <p className="text-slate-400 mt-2">
            Coding Classroom Management
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">

          <h2 className="text-2xl font-bold text-white mb-2">
            {title}
          </h2>

          <p className="text-slate-400 mb-6">
            {subtitle}
          </p>

          {children}
        </div>

      </div>
    </div>
  );
};

export default AuthLayout;