import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/Inputs/InputError';
import InputLabel from '@/Components/Inputs/InputLabel';
import SelectInput from '@/Components/Inputs/SelectInput';
import DatePicker from '@/Components/Inputs/DatePicker';
import PrimaryButton from '@/Components/Buttons/PrimaryButton';
import TextInput from '@/Components/Inputs/TextInput';
import { XMarkIcon } from '@heroicons/react/24/solid'
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function TaskForm(props, className = "max-w-xl") {
    const task = usePage().props.task ?? {};
    const { data, setData, post, patch, errors, processing, recentlySuccessful } = useForm({
        title: task.title || '',
        description: task.description || '',
        due_date: task.due_date || '',
        status_id: task.status_id || '',
        task_priority_id: task.task_priority_id || '',
    });

    const submit = (e) => {
        e.preventDefault();
        task.id ? patch(route('tasks.update', task.id)) : post(route('tasks.store'));
    };

    return (
        <AuthenticatedLayout auth={props.auth} errors={props.errors}>
            <section className={className}>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <div className='flex justify-between items-center'>
                            <h2 className="text-lg font-medium text-gray-900">
                                {task.id ? 'Edit Task' : 'Create New Task'}
                            </h2>
                            <Link href={route('tasks.index')}>
                                <XMarkIcon className='h-8 w-8'/>
                            </Link>
                        </div>
                        <form onSubmit={submit} className="mt-6 space-y-6">
                            <div>
                                <InputLabel htmlFor="title" value="Title" />
                                <TextInput
                                    id="title"
                                    type="text"
                                    className="mt-1 block w-full"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    required
                                    autoComplete="title"
                                />
                                <InputError className="mt-2" message={errors.title} />
                            </div>

                            <div>
                                <InputLabel htmlFor="description" value="Description" />
                                <textarea
                                    id="description"
                                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    required
                                    autoComplete="description"
                                />
                                <InputError className="mt-2" message={errors.description} />
                            </div>

                            <div className='grid grid-cols-3 gap-1'>
                                <div>
                                    <DatePicker
                                        value={data.due_date}
                                        onChange={(value) => setData('due_date', value)}
                                        required
                                        className="mt-1 block w-full"
                                    />
                                    <InputError className="mt-2" message={errors.due_date} />
                                </div>
                                <div>
                                    <SelectInput
                                        id="status_id"
                                        label={'Status'}
                                        value={data.status_id}
                                        onChange={(e) => setData('status_id', e.target.value)}
                                        options={props.statuses}
                                        required
                                        className="mt-1 block w-full"
                                    />
                                    <InputError className="mt-2" message={errors.status_id} />
                                </div>
                                <div>
                                    <SelectInput
                                        id="task_priority_id"
                                        label={'Task Priority'}
                                        value={data.task_priority_id}
                                        onChange={(e) => setData('task_priority_id', e.target.value)}
                                        options={props.taskPriorities}  
                                        required
                                        className="mt-1 block w-full"
                                    />
                                    <InputError className="mt-2" message={errors.task_priority_id} />
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <PrimaryButton disabled={processing}>Save</PrimaryButton>

                                <Transition
                                    show={recentlySuccessful}
                                    enterFrom="opacity-0"
                                    leaveTo="opacity-0"
                                    className="transition ease-in-out"
                                >
                                    <p className="text-sm text-gray-600">Saved.</p>
                                </Transition>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </AuthenticatedLayout>
    );
}
