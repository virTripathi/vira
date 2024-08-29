import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { XMarkIcon } from '@heroicons/react/24/solid'
import { Link } from '@inertiajs/react';

export default function TaskForm(props, className = "max-w-xl") {
    const task = props.task;
    console.log(task);
    
    return (
        <AuthenticatedLayout auth={props.auth} errors={props.errors}>
            <section className={className}>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <div className='flex justify-between items-center'>
                            <h2 className="text-lg font-medium text-gray-900">
                                {'View Task: '+task.title}
                            </h2>
                            <Link href={route('tasks.index')}>
                                <XMarkIcon className='h-8 w-8'/>
                            </Link>
                        </div>

                        <div>
                        <h3
                                id="description"
                                className="mt-4 border-gray-300 shadow-sm mt-1 block w-full"
                            >Description</h3>
                            <p
                                id="description"
                                className="border-gray-300 shadow-sm mt-1 block w-full"
                            >{task.description}</p>
                        </div>

                        <div className='grid grid-cols-3 gap-1'>
                            <div>
                            <h3
                                id="due_date"
                                className="mt-4 border-gray-300 shadow-sm mt-1 block w-full"
                            >Due Date</h3>
                            <p
                                id="due_date"
                                className="border-gray-300 shadow-sm mt-1 block w-full"
                            >{task.due_date}</p>
                            </div>
                            <div>
                            <h3
                                id="status"
                                className="mt-4 border-gray-300 shadow-sm mt-1 block w-full"
                            >Status</h3>
                            <p
                                id="status"
                                className="border-gray-300 shadow-sm mt-1 block w-full"
                            >{task.status.title}</p>
                            </div>
                            <div>
                            <h3
                                id="priority"
                                className="mt-4 border-gray-300 shadow-sm mt-1 block w-full"
                            >Priority</h3>
                            <p
                                id="priority"
                                className="border-gray-300 shadow-sm mt-1 block w-full"
                            >{task.priority.title}</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </AuthenticatedLayout>
    );
}
