import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage, Head } from "@inertiajs/react";

export default function PaymentFailed() {
    const { error, auth, errors } = usePage().props;

    return (
        <AuthenticatedLayout auth={auth} errors={errors}>
            <Head title="Payment Failed" />
            <div className="flex h-screen flex-col items-center justify-center">
                <h1 className="text-2xl font-bold text-red-600">
                    ❌ Payment Failed
                </h1>
                <p className="mt-2 text-gray-700">
                    {error || "Something went wrong with your payment."}
                </p>
                <a
                    href="/pricing"
                    className="mt-6 rounded bg-red-600 px-4 py-2 text-white"
                >
                    Try Again
                </a>
            </div>
        </AuthenticatedLayout>
    );
}