import { createContext, useContext, useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";

const ErrorContext = createContext();

export function ErrorProvider({ children }) {
  const [errors, setErrors] = useState([]);

  const addError = (message) => {
    if (!message) return;
    const id = Date.now();
    setErrors((prev) => [...prev, { id, message }]);

    // auto-remove after 3s
    setTimeout(() => removeError(id), 3000);
  };

  const removeError = (id) => {
    setErrors((prev) => prev.filter((err) => err.id !== id));
  };

  // 🔥 Auto-catch error from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const error = params.get("error");

    if (error) {
      addError(error);

      // clean URL so error doesn’t re-trigger on refresh
      params.delete("error");
      const newUrl =
        window.location.pathname +
        (params.toString() ? `?${params.toString()}` : "");
      window.history.replaceState({}, "", newUrl);
    }
  }, []);

  return (
    <ErrorContext.Provider value={{ addError }}>
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
        <AnimatePresence>
          {errors.map((err) => (
            <motion.div
              key={err.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
              className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-4"
            >
              {err.message}
              <XMarkIcon
                width={18}
                height={18}
                className="cursor-pointer"
                onClick={() => removeError(err.id)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {children}
    </ErrorContext.Provider>
  );
}

export function useError() {
  return useContext(ErrorContext);
}