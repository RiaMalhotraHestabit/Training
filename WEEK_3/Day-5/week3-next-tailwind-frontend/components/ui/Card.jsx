export default function Card({
  title,
  children,
  footer,
  variant = "default",
}) {
  const variants = {
    default: "bg-white border-gray-200 text-gray-800",
    primary: "bg-blue-600 text-white border-blue-600",
    warning: "bg-yellow-500 text-white border-yellow-500",
    success: "bg-green-600 text-white border-green-600",
    danger: "bg-red-600 text-white border-red-600",
  };

  return (
    <div
      className={`rounded-lg shadow-sm border ${variants[variant]}`}
    >
      {title && (
        <div className="px-4 py-3 font-medium">
          {title}
        </div>
      )}

      {children && (
        <div className="px-4 py-4 text-sm">
          {children}
        </div>
      )}

      {footer && (
        <div className="px-4 py-3 border-t border-white/20 text-xs flex justify-between items-center">
          <span>{footer}</span>
          <span>›</span>
        </div>
      )}
    </div>
  );
}
