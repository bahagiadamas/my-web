export default function Loading({ message = "Loading...", className = "" }) {
  return (
    <div className={`loading-container flex items-center gap-2 ${className}`}>
      <span className="loading loading-spinner loading-lg"></span>
      <p>{message}</p>
    </div>
  );
}
