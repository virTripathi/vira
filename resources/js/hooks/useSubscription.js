import { router } from "@inertiajs/react";
import { useError } from "@/contexts/ErrorContext";

export default function useSubscription() {
  const { addError } = useError();

  const subscribe = (plan) => {
    router.post("/create-subscription", { plan }, {
      onError: () => {
        addError("Unable to create subscription. Please try again later.");
      }
    });
  };

  return { subscribe };
}