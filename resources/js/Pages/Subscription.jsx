import { useEffect } from "react";
import { Head, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Subscription() {
    const { razorpay_key, subscription_id, plan, auth, errors } =
        usePage().props;

    useEffect(() => {
        console.log(razorpay_key, subscription_id);
        if (!razorpay_key || !subscription_id) return;

        const options = {
            key: razorpay_key,
            subscription_id: subscription_id,
            name: "MyApp Subscriptions",
            description: "Subscription for " + plan,
            handler: function (response) {
                window.location.href =
                    "/payment/success?payment_id=" +
                    response.razorpay_payment_id +
                    "&subscription_id=" +
                    response.razorpay_subscription_id;
            },
            modal: {
                ondismiss: function () {
                    window.location.href =
                        "/#pricing";
                },
            },
            theme: { color: "#9c27b0" },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    }, [razorpay_key, subscription_id, plan]);

    return (
        <>
            <AuthenticatedLayout
                auth={auth}
                errors={errors}
                showFloatingAction={false}
            >
                <div className="flex h-screen items-center justify-center">
                    <p className="text-lg font-semibold">
                        Redirecting to Razorpay Checkout…
                    </p>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
