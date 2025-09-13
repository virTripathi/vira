import React, { useEffect, useRef } from "react";

export default function FeatureSection({ features }) {
    const carouselContainerRef = useRef(null);
    const carouselRef = useRef(null);

    useEffect(() => {
        const carousel = carouselRef.current;
        const carouselContainer = carouselContainerRef.current;

        // Clone elements for infinite scrolling
        const cloneCount = Math.min(2, features.length);
        const clonedFeatures = features.slice(0, cloneCount);

        clonedFeatures.forEach((feature) => {
            const clone = document.createElement("div");
            clone.className = "overflow-hidden bg-gray-100 dark:bg-gray-950 shadow-[0_3px_10px_rgb(0,0,0,0.2)] border border-gray-300 dark:border-gray-950 text-black dark:text-white p-4 rounded-lg h-60 w-[calc(100vw - 10rem)]";
            clone.innerHTML = `
                <h4 class="font-bold text-xl mb-2">${feature.title}</h4>
                <p class="text-sm font-light italic tracking-wide text-gray-700 dark:text-gray-200">${feature.subtitle}</p>
            `;
            carousel.appendChild(clone);
        });

        // Set up scrolling
        const scrollSpeed = 50;
        const totalWidth = carousel.scrollWidth;
        let scrollAmount = 0;

        const animateScroll = () => {
            if (scrollAmount >= totalWidth) {
                scrollAmount = 0;
            } else {
                scrollAmount += 1;
            }
            carouselContainer.scrollLeft = scrollAmount;
        };

        const intervalId = setInterval(animateScroll, scrollSpeed);

        return () => clearInterval(intervalId);
    }, [features]);

    return (
        <section className="relative w-full overflow-hidden mb-8">
            <div className="block sm:hidden">
                <div
                    ref={carouselContainerRef}
                    className="flex overflow-hidden"
                    style={{ scrollBehavior: "smooth" }}
                >
                    <div
                        ref={carouselRef}
                        className="flex transition-transform duration-500 ease-in-out gap-4"
                    >
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="overflow-hidden bg-gray-100 dark:bg-gray-950 shadow-[0_3px_10px_rgb(0,0,0,0.2)] border border-gray-300 dark:border-gray-950 text-black dark:text-white p-4 rounded-lg h-60 w-[calc(100vw - 10rem)]"
                            >
                                <h4 className="font-bold text-xl mb-2">{feature.title}</h4>
                                <p className="text-sm font-light italic tracking-wide text-gray-700 dark:text-gray-200">
                                    {feature.subtitle}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="hidden sm:grid lg:grid lg:grid-cols-4 grid-cols-2 gap-6 w-4/5 mx-auto">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="bg-gray-100 dark:bg-gray-950 shadow-[0_3px_10px_rgb(0,0,0,0.2)] border border-gray-300 dark:border-gray-950 text-black dark:text-white w-full p-4 rounded-lg h-48"
                    >
                        <h4 className="font-bold text-2xl mb-4">{feature.title}</h4>
                        <p className="font-light italic tracking-wide text-gray-700 dark:text-gray-200">
                            {feature.subtitle}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
