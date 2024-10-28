import FeatureSection from '@/Components/Sections/FeatureSection';
export default function HeroSection({className, features}) {
    return (
        <>
            <section className={className}>
                <div className="mx-auto max-w-screen-xl px-4 py-24 lg:py-32 lg:flex lg:items-center">
                    <div className="mx-auto max-w-xl text-center">
                        <h1 className="text-3xl font-extrabold text-black dark:text-purple-300 sm:text-5xl">
                            All Your Tasks
                            <strong className="font-extrabold text-purple-700 dark:text-purple-400 block">
                                Perfectly Timed.
                            </strong>
                        </h1>

                        <p className="mt-4 text-gray-700 dark:text-gray-300 sm:text-xl/relaxed">
                            Use voice or text to schedule your tasks exactly how you want. With smart reminders and AI-driven precision, you’ll always be on time and in control.
                        </p>

                        <div className="mt-8 flex flex-wrap justify-center gap-4">
                            <a
                                className="block w-full rounded-xl bg-purple-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 focus:outline-none focus:ring active:bg-purple-500 sm:w-auto"
                                href="#"
                            >
                                Get Started
                            </a>

                            <a
                                className="block w-full rounded-xl px-12 py-3 text-sm font-medium text-purple-600 dark:text-purple-400 shadow hover:text-purple-700 dark:hover:text-purple-500 focus:outline-none focus:ring active:text-purple-500 sm:w-auto"
                                href="#"
                            >
                                Learn More
                            </a>
                        </div>
                    </div>
                </div>
                <FeatureSection features={features}/>
            </section>
        </>
    );
}
