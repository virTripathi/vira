import React, { useEffect, useState } from "react";
import { Button, Card, CardHeader,
    CardBody,
    Typography } from "@material-tailwind/react";

export default function UseCaseSection({ useCases, className }) {
    const [currentUseCase, setCurrentUseCase] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentUseCase((prevIndex) => (prevIndex + 1) % useCases.length);
        }, 5000);

        return () => clearInterval(intervalId);
    }, [useCases.length]);

    return (
        <section id="use_cases" className={className}>
            <div className=" mx-auto max-w-screen-xl px-4 py-24 py-32 flex flex-col items-center justify-center">
                <p className="mb-20 text-lg font-md tracking-wide">Use Cases</p> 
                <div className="block flex flex-wrap gap-4 justify-center items-center mb-12">
                    {useCases.map((useCase, index)=>(
                        <Button key="index" onClick={()=>setCurrentUseCase(index)} className={`${index==currentUseCase?"!border-purple-800":""} dark:border-gray-800 dark:text-gray-700 text-gray-700 focus:ring-0 active:ring-0`} variant="outlined">{useCase.title}</Button>
                    ))}
                </div>
                {useCases.map((useCase, index)=>(
                        <Card className={`${index==currentUseCase?'flex':'hidden'} w-full flex-row justify-between overflow-hidden bg-transparent border-gray-100 dark:border-gray-800`}>
                        <CardBody>
                        <Typography variant="h6" color="gray" className="mb-4 uppercase">
                            {useCase.title}
                        </Typography>
                        <Typography variant="h4" className="mb-2 text-gray-800 dark:text-gray-500">
                            {useCase.description}
                        </Typography>
                        <ul className="ps-8 list-disc mb-8">
                            {
                                useCase.points.map((point,idx)=> (
                                    <li key={idx} className="font-normal">
                                        {point}
                                    </li>
                                ))
                            }
                            </ul>
                        
                        <a href="#" className="inline-block">
                            <Button variant="text" className="flex items-center gap-2 hover:bg-purple-100 hover:text-purple-900 dark:hover:bg-purple-100 dark:hover:text-purple-900 dark:text-gray-400">
                            Learn More
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                                className="h-4 w-4"
                            >
                                <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                                />
                            </svg>
                            </Button>
                        </a>
                        </CardBody>
                        <CardHeader
                        shadow={false}
                        floated={false}
                        className="hidden md:block m-0 w-2/5 shrink-0 rounded-r-none"
                        >
                        <img
                            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                            alt="card-image"
                            className="h-full w-full object-cover"
                        />
                        </CardHeader>
                    </Card>
                    ))}
                </div>
        </section>
    );
}
