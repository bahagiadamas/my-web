import { useState, useEffect, useRef } from "react";

export default function Alert({
  children,
  status = "info",
  duration = 3000,
  onClose,
}) {
  const [showClass, setShowClass] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const timerRef = useRef(null);

  const TRANSITION_DURATION = 300;

  useEffect(() => {
    if (status) {
      setShouldRender(true);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      const showTimer = setTimeout(() => {
        setShowClass(true);
      }, 50);

      timerRef.current = setTimeout(() => {
        setShowClass(false);
        const hideTimer = setTimeout(() => {
          if (onClose) {
            onClose();
          }
          setShouldRender(false);
        }, TRANSITION_DURATION);

        return () => clearTimeout(hideTimer);
      }, duration);

      return () => clearTimeout(showTimer);
    } else {
      setShowClass(false);
      setShouldRender(false);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    }
  }, [status, duration, onClose]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const alertClasses = `alert alert-${status} fixed bottom-4 left-1/2 z-5 -translate-x-1/2 ${
    showClass ? "show" : ""
  }`;

  if (!shouldRender) {
    return null;
  }

  return (
    <div role="alert" className={alertClasses}>
      {status === "info" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="h-6 w-6 shrink-0 stroke-current"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      )}
      {status === "warning" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      )}
      {status === "success" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      )}
      {status === "error" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      )}
      {children}
    </div>
  );
}
