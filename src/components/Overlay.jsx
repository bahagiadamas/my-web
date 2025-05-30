export default function Overlay({ className = "", onClick }) {
  return (
    <div
      id="overlay"
      className={`bg-black/60 ${className}`}
      onClick={onClick}
    ></div>
  );
}
