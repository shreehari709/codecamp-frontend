const InputField = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder
}) => {
  return (
    <div className="mb-4">

      <label className="block text-sm text-slate-300 mb-2">
        {label}
      </label>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none focus:border-blue-500"
      />

    </div>
  );
};

export default InputField;