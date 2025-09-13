import { router } from "@inertiajs/react";
import { useError } from "@/Contexts/ErrorProvider";

export default function useSubscription() {
  const { setError } = useError();

  const subscribe = (plan) => {
    router.post("/create-subscription", { plan }, {
      onError: (err) => {
        setError("Unable to create subscription. Please try again later.");
      }
    });
  };

  return { subscribe };
}