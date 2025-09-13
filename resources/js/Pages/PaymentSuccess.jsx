import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage, Head } from "@inertiajs/react";
import { Link } from '@inertiajs/react';

export default function PaymentSuccess() {
    const { payment_id, subscription_id, auth, errors } = usePage().props;

    return (
        <AuthenticatedLayout auth={auth} errors={errors}>
            <Head title="Payment Success" />
            <div className="flex h-screen flex-col items-center justify-center">
                <h1 className="text-2xl font-bold text-purple-600">
                    🎉 Payment Successful!
                </h1>
                <p className="mt-2 text-gray-700">
                    Payment ID: {payment_id}
                </p>
                <p className="text-gray-700">
                    Subscription ID: {subscription_id}
                </p>
                <Link
                    href={route('general-user.dashboard')}
                    className="mt-6 rounded bg-purple-600 px-4 py-2 text-white"
                >
                    Get your AI Assistant
                </Link>
            </div>
        </AuthenticatedLayout>
    );
}