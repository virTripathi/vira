import { Button } from "@material-tailwind/react";
export default function PricingSection({ className }) {
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
                                type="Personal"
                                price="$59"
                                subscription="year"
                                description="Perfect for using in a personal website or a client project."
                                buttonText="Choose Personal"
                            >
                                <List>1 User</List>
                                <List>All UI components</List>
                                <List>Lifetime access</List>
                                <List>Free updates</List>
                                <List>Use on 1 (one) project</List>
                                <List>3 Months support</List>
                            </PricingCard>
                            <PricingCard
                                type="Business"
                                price="$199"
                                subscription="year"
                                description="Perfect for using in a personal website or a client project."
                                buttonText="Choose Business"
                                active
                            >
                                <List>5 User</List>
                                <List>All UI components</List>
                                <List>Lifetime access</List>
                                <List>Free updates</List>
                                <List>Use on31 (Three) project</List>
                                <List>4 Months support</List>
                            </PricingCard>
                            <PricingCard
                                type="Professional"
                                price="$256"
                                subscription="year"
                                description="Perfect for using in a personal website or a client project."
                                buttonText="Choose Professional"
                            >
                                <List>Unlimited User</List>
                                <List>All UI components</List>
                                <List>Lifetime access</List>
                                <List>Free updates</List>
                                <List>Unlimited project</List>
                                <List>12 Months support</List>
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
}) => {
    return (
        <>
            <div className="relative mx-auto w-4/5 px-4 md:w-1/2 lg:w-1/3">
                <div className="mb-10 overflow-hidden rounded-[10px] border border-stroke bg-white px-8 py-10 shadow-pricing dark:border-gray-100 dark:bg-black sm:p-12 lg:px-6 lg:py-10 xl:p-[50px]">
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
                    <div className="mb-9 flex flex-col gap-[14px]">
                        {children}
                    </div>
                    <a
                                className="block w-full rounded-xl bg-purple-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 focus:outline-none focus:ring active:bg-purple-500 sm:w-auto text-center"
                                href="#"
                            >
                                {buttonText}
                            </a>
                    <div>
                        <span className="absolute right-4 top-7 z-0">
                            <svg
                                width={77}
                                height={172}
                                viewBox="0 0 77 172"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle
                                    cx={86}
                                    cy={86}
                                    r={86}
                                    fill="url(#paint0_linear)"
                                />
                                <defs>
                                    <linearGradient
                                        id="paint0_linear"
                                        x1={86}
                                        y1={0}
                                        x2={86}
                                        y2={172}
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <stop
                                            stopColor="#3056D3"
                                            stopOpacity="0.09"
                                        />
                                        <stop
                                            offset={1}
                                            stopColor="#C4C4C4"
                                            stopOpacity={0}
                                        />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </span>
                        <span className="absolute right-8 top-4 z-0">
                            <svg
                                width={41}
                                height={89}
                                viewBox="0 0 41 89"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle
                                    cx="38.9138"
                                    cy="87.4849"
                                    r="1.42021"
                                    transform="rotate(180 38.9138 87.4849)"
                                    className="fill-purple-500"
                                />
                                <circle
                                    cx="38.9138"
                                    cy="74.9871"
                                    r="1.42021"
                                    transform="rotate(180 38.9138 74.9871)"
                                    className="fill-purple-500"
                                />
                                <circle
                                    cx="38.9138"
                                    cy="62.4892"
                                    r="1.42021"
                                    transform="rotate(180 38.9138 62.4892)"
                                    className="fill-purple-500"
                                />
                                <circle
                                    cx="38.9138"
                                    cy="38.3457"
                                    r="1.42021"
                                    transform="rotate(180 38.9138 38.3457)"
                                    className="fill-purple-500"
                                />
                                <circle
                                    cx="38.9138"
                                    cy="13.634"
                                    r="1.42021"
                                    transform="rotate(180 38.9138 13.634)"
                                    className="fill-purple-500"
                                />
                                <circle
                                    cx="38.9138"
                                    cy="50.2754"
                                    r="1.42021"
                                    transform="rotate(180 38.9138 50.2754)"
                                    className="fill-purple-500"
                                />
                                <circle
                                    cx="38.9138"
                                    cy="26.1319"
                                    r="1.42021"
                                    transform="rotate(180 38.9138 26.1319)"
                                    className="fill-purple-500"
                                />
                                <circle
                                    cx="38.9138"
                                    cy="1.42021"
                                    r="1.42021"
                                    transform="rotate(180 38.9138 1.42021)"
                                    className="fill-purple-500"
                                />
                                <circle
                                    cx="26.4157"
                                    cy="87.4849"
                                    r="1.42021"
                                    transform="rotate(180 26.4157 87.4849)"
                                    className="fill-purple-500"
                                />
                                <circle
                                    cx="26.4157"
                                    cy="74.9871"
                                    r="1.42021"
                                    transform="rotate(180 26.4157 74.9871)"
                                    className="fill-purple-500"
                                />
                                <circle
                                    cx="26.4157"
                                    cy="62.4892"
                                    r="1.42021"
                                    transform="rotate(180 26.4157 62.4892)"
                                    className="fill-purple-500"
                                />
                                <circle
                                    cx="26.4157"
                                    cy="38.3457"
                                    r="1.42021"
                                    transform="rotate(180 26.4157 38.3457)"
                                    className="fill-purple-500"
                                />
                                <circle
                                    cx="26.4157"
                                    cy="13.634"
                                    r="1.42021"
                                    transform="rotate(180 26.4157 13.634)"
                                    className="fill-purple-500"
                                />
                                <circle
                                    cx="26.4157"
                                    cy="50.2754"
                                    r="1.42021"
                                    transform="rotate(180 26.4157 50.2754)"
                                    className="fill-purple-500"
                                />
                                <circle
                                    cx="26.4157"
                                    cy="26.1319"
                                    r="1.42021"
                                    transform="rotate(180 26.4157 26.1319)"
                                    className="fill-purple-500"
                                />
                                <circle
                                    cx="26.4157"
                                    cy="1.4202"
                                    r="1.42021"
                                    transform="rotate(180 26.4157 1.4202)"
                                    className="fill-purple-500"
                                />
                                <circle
                                    cx="13.9177"
                                    cy="87.4849"
                                    r="1.42021"
                                    transform="rotate(180 13.9177 87.4849)"
                                    className="fill-purple-500"
                                />
                                <circle
                                    cx="13.9177"
                                    cy="74.9871"
                                    r="1.42021"
                                    transform="rotate(180 13.9177 74.9871)"
                                    className="fill-purple-500"
                                />
                                <circle
                                    cx="13.9177"
                                    cy="62.4892"
                                    r="1.42021"
                                    transform="rotate(180 13.9177 62.4892)"
                                    className="fill-purple-500"
                                />
                                <circle
                                    cx="13.9177"
                                    cy="38.3457"
                                    r="1.42021"
                                    transform="rotate(180 13.9177 38.3457)"
                                    className="fill-purple-500"
                                />
                                <circle
                                    cx="13.9177"
                                    cy="13.634"
                                    r="1.42021"
                                    transform="rotate(180 13.9177 13.634)"
                                    className="fill-purple-500"
                                />
                                <circle
                                    cx="13.9177"
                                    cy="50.2754"
                                    r="1.42021"
                                    transform="rotate(180 13.9177 50.2754)"
                                    className="fill-purple-500"
                                />
                                <circle
                                    cx="13.9177"
                                    cy="26.1319"
                                    r="1.42021"
                                    transform="rotate(180 13.9177 26.1319)"
                                    className="fill-purple-500"
                                />
                                <circle
                                    cx="13.9177"
                                    cy="1.42019"
                                    r="1.42021"
                                    transform="rotate(180 13.9177 1.42019)"
                                    className="fill-purple-500"
                                />
                                <circle
                                    cx="1.41963"
                                    cy="87.4849"
                                    r="1.42021"
                                    transform="rotate(180 1.41963 87.4849)"
                                    className="fill-purple-500"
                                />
                                <circle
                                    cx="1.41963"
                                    cy="74.9871"
                                    r="1.42021"
                                    transform="rotate(180 1.41963 74.9871)"
                                    className="fill-purple-500"
                                />
                                <circle
                                    cx="1.41963"
                                    cy="62.4892"
                                    r="1.42021"
                                    transform="rotate(180 1.41963 62.4892)"
                                    className="fill-purple-500"
                                />
                                <circle
                                    cx="1.41963"
                                    cy="38.3457"
                                    r="1.42021"
                                    transform="rotate(180 1.41963 38.3457)"
                                    className="fill-purple-500"
                                />
                                <circle
                                    cx="1.41963"
                                    cy="13.634"
                                    r="1.42021"
                                    transform="rotate(180 1.41963 13.634)"
                                    className="fill-purple-500"
                                />
                                <circle
                                    cx="1.41963"
                                    cy="50.2754"
                                    r="1.42021"
                                    transform="rotate(180 1.41963 50.2754)"
                                    className="fill-purple-500"
                                />
                                <circle
                                    cx="1.41963"
                                    cy="26.1319"
                                    r="1.42021"
                                    transform="rotate(180 1.41963 26.1319)"
                                    className="fill-purple-500"
                                />
                                <circle
                                    cx="1.41963"
                                    cy="1.4202"
                                    r="1.42021"
                                    transform="rotate(180 1.41963 1.4202)"
                                    className="fill-purple-500"
                                />
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

const List = ({ children }) => {
    return (
        <p className="text-base text-body-color dark:text-dark-6">{children}</p>
    );
};
