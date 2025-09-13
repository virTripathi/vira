import { Button } from "@material-tailwind/react";
import useSubscription from "../../hooks/useSubscription";
import { Link } from "@inertiajs/react";

export default function PricingSection({ className }) {
    const { subscribe } = useSubscription();
    return (
        <section className={className}>
            <section className="overflow-hidden bg-white pb-12 pt-20 dark:bg-black lg:pb-[90px] lg:pt-[120px]">
                <div className="container mx-auto">
                    <div className="-mx-4 flex flex-wrap">
                        <div className="w-full px-4">
                            <div className="mx-auto mb-[60px] max-w-[510px] text-center">
                                <h2 className="mb-3 text-3xl font-bold leading-[1.208] text-dark dark:text-white sm:text-4xl md:text-[40px]">
                                    Our Pricing Plan
                                </h2>
                                <p className="text-base text-body-color dark:text-dark-6">
                                    There are many variations of passages of
                                    Lorem Ipsum available but the majority have
                                    suffered alteration in some form.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="-mx-4 flex flex-wrap justify-center">
                        <div className="-mx-4 flex flex-wrap">
                            <PricingCard
                                type="Monthly"
                                price="₹199"
                                subscription="month"
                                description="Billed monthly. Billing starts after 14 days."
                                onSelect={() => subscribe("monthly")}
                                buttonText="Start Monthly Plan"
                            >
                                <List>
                                    Create daily/weekly/monthly reminders
                                </List>
                                <List>
                                    Integrate Google Calendar to schedule
                                    meetings & book time slots
                                </List>
                                <List>Get weather information</List>
                            </PricingCard>

                            <PricingCard
                                type="Yearly"
                                price="₹1999"
                                subscription="year"
                                description="Save 15% with yearly billing. Billing starts after 14 days."
                                buttonText="Start Yearly Plan"
                                onSelect={() => subscribe("yearly")}
                                active
                                badge="Best Value"
                            >
                                <List>
                                    Create daily/weekly/monthly reminders
                                </List>
                                <List>
                                    Integrate Google Calendar to schedule
                                    meetings & book time slots
                                </List>
                                <List>Get weather information</List>
                            </PricingCard>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    );
}

const PricingCard = ({
    children,
    description,
    price,
    type,
    subscription,
    buttonText,
    active,
    badge,
    onSelect
}) => {
    return (
        <div className="relative mx-auto w-4/5 px-4 md:w-1/2 lg:w-1/3" id="pricing">
            <div
                className={`relative mb-10 overflow-hidden rounded-[10px] border border-stroke bg-white px-8 py-10 shadow-pricing dark:border-gray-100 dark:bg-black sm:p-12 lg:px-6 lg:py-10 xl:p-[50px] ${
                    active ? "ring-2 ring-purple-500" : ""
                }`}
            >
                {badge && (
                    <span className="absolute top-4 right-4 bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                        {badge}
                    </span>
                )}

                <span className="mb-3 block text-lg font-semibold text-primary">
                    {type}
                </span>

                <h2 className="mb-5 text-[42px] font-bold text-dark dark:text-white">
                    {price}
                    <span className="text-base font-medium text-body-color dark:text-dark-6">
                        / {subscription}
                    </span>
                </h2>

                <p className="mb-8 border-b border-stroke pb-8 text-base text-body-color dark:border-gray-100 dark:text-dark-6">
                    {description}
                </p>

                <div className="mb-9 flex flex-col gap-[14px]">{children}</div>
                <div className="flex flex-col justify-center items-center">
                    <Button
                    onClick={onSelect}
                    className="rounded-xl bg-purple-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 focus:outline-none focus:ring active:bg-purple-500 sm:w-auto text-center"
                >
                    {buttonText}
                </Button>
                </div>
            </div>
        </div>
    );
};

const List = ({ children }) => {
    return (
        <p className="text-base text-body-color dark:text-dark-6">{children}</p>
    );
};
