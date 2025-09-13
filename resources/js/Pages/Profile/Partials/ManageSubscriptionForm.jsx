import { useState } from "react";
import DangerButton from "@/Components/Buttons/DangerButton";
import SecondaryButton from "@/Components/Buttons/SecondaryButton";
import Modal from "@/Components/Modal";
import { useForm } from "@inertiajs/react";

export default function ManageSubscriptionForm({ className, subscription }) {
    const [action, setAction] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const { post, processing } = useForm();

    const openModal = (selectedAction) => {
        setAction(selectedAction);
        setShowModal(true);
    };

    const closeModal = () => {
        setAction(null);
        setShowModal(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!subscription) return; // prevent errors

        let routeName = null;
        if (action === "cancel") routeName = "subscription.cancel";
        if (action === "pause") routeName = "subscription.pause";
        if (action === "resume") routeName = "subscription.resume";

        if (!routeName) return;

        post(route(routeName, { id: subscription.id }), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
        });
    };

    // If no subscription
    if (!subscription) {
        return (
            <section className={`space-y-6 ${className}`}>
                <header>
                    <h2 className="text-lg font-medium">Manage Subscription</h2>
                    <p className="mt-1 text-sm text-inherit">
                        You don’t have an active subscription yet.
                    </p>
                </header>
            </section>
        );
    }

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium">Manage Subscription</h2>
                <p className="mt-1 text-sm text-inherit">
                    Control your subscription status. You can pause, resume, or cancel it permanently.
                </p>
            </header>

            <div className="flex gap-3">
                {subscription.status === "active" && (
                    <>
                        <SecondaryButton onClick={() => openModal("pause")}>
                            Deactivate (Pause)
                        </SecondaryButton>
                        <DangerButton onClick={() => openModal("cancel")}>
                            Cancel Permanently
                        </DangerButton>
                    </>
                )}

                {subscription.status === "paused" && (
                    <SecondaryButton onClick={() => openModal("resume")}>
                        Reactivate
                    </SecondaryButton>
                )}
            </div>

            {/* Confirmation Modal */}
            <Modal show={showModal} onClose={closeModal}>
                <form onSubmit={handleSubmit} className="p-6">
                    <h2 className="text-lg font-medium text-gray-950">
                        {action === "cancel" && "Cancel Subscription?"}
                        {action === "pause" && "Pause Subscription?"}
                        {action === "resume" && "Reactivate Subscription?"}
                    </h2>

                    <p className="mt-1 text-sm text-inherit">
                        {action === "cancel" &&
                            "Once canceled, your subscription will end permanently."}
                        {action === "pause" &&
                            "You can pause your subscription. You will not be billed until resumed."}
                        {action === "resume" &&
                            "Your subscription will be reactivated and billing will continue."}
                    </p>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Close</SecondaryButton>
                        <DangerButton className="ml-3" disabled={processing}>
                            {action === "cancel" && "Cancel"}
                            {action === "pause" && "Pause"}
                            {action === "resume" && "Reactivate"}
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}