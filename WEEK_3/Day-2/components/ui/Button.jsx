export default function Button({
  children,
  variant = "primary",
  onClick,
  type = "button"
}) {
  const base =
  "px-4 py-2 rounded-md text-sm font-medium transition focus:outline-none";


  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${variants[variant]}`}
    >
      {children}
    </button>
  );
}
