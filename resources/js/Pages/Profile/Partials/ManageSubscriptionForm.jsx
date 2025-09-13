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

        if (!subscription) return;

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

    const { status } = subscription;

    const renderActions = () => {
        switch (status) {
            case "pending":
                return (
                    <p className="text-sm text-yellow-600">
                        Your subscription is pending. Please complete the payment to activate it.
                    </p>
                );

            case "active":
                return (
                    <div className="flex gap-3">
                        <SecondaryButton onClick={() => openModal("pause")}>
                            Pause Subscription
                        </SecondaryButton>
                        <DangerButton onClick={() => openModal("cancel")}>
                            Cancel Permanently
                        </DangerButton>
                    </div>
                );

            case "paused":
                return (
                    <SecondaryButton onClick={() => openModal("resume")}>
                        Resume Subscription
                    </SecondaryButton>
                );

            case "cancelled":
                return (
                    <p className="text-sm text-red-600">
                        Your subscription has been cancelled.
                    </p>
                );

            case "failed":
                return (
                    <p className="text-sm text-red-600">
                        Payment failed. Please retry or create a new subscription.
                    </p>
                );

            case "expired":
                return (
                    <p className="text-sm text-gray-600">
                        Your subscription has expired. Please purchase a new plan.
                    </p>
                );

            case "pending_cancel":
                return (
                    <p className="text-sm text-orange-600">
                        Cancellation requested. Waiting for confirmation.
                    </p>
                );

            case "pending_pause":
                return (
                    <p className="text-sm text-orange-600">
                        Pause requested. Waiting for confirmation.
                    </p>
                );

            case "pending_resume":
                return (
                    <p className="text-sm text-orange-600">
                        Resume requested. Waiting for confirmation.
                    </p>
                );

            default:
                return (
                    <p className="text-sm text-gray-600">
                        Unknown subscription status.
                    </p>
                );
        }
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium">Manage Subscription</h2>
                <p className="mt-1 text-sm text-inherit">
                    Control your subscription status. You can pause, resume, or cancel it permanently.
                </p>
            </header>

            {renderActions()}

            {/* Confirmation Modal */}
            <Modal show={showModal} onClose={closeModal}>
                <form onSubmit={handleSubmit} className="p-6">
                    <h2 className="text-lg font-medium text-gray-950">
                        {action === "cancel" && "Cancel Subscription?"}
                        {action === "pause" && "Pause Subscription?"}
                        {action === "resume" && "Resume Subscription?"}
                    </h2>

                    <p className="mt-1 text-sm text-inherit">
                        {action === "cancel" &&
                            "Once canceled, your subscription will end permanently."}
                        {action === "pause" &&
                            "Pausing will stop billing until you resume."}
                        {action === "resume" &&
                            "Your subscription will be reactivated and billing will continue."}
                    </p>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton type="button" onClick={closeModal}>
                            Close
                        </SecondaryButton>
                        <DangerButton className="ml-3" disabled={processing}>
                            {action === "cancel" && "Cancel"}
                            {action === "pause" && "Pause"}
                            {action === "resume" && "Resume"}
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}