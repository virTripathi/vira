import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/Inputs/InputError';
import InputLabel from '@/Components/Inputs/InputLabel';
import SelectInput from '@/Components/Inputs/SelectInput';
import DatePicker from '@/Components/Inputs/DatePicker';
import PrimaryButton from '@/Components/Buttons/PrimaryButton';
import TextInput from '@/Components/Inputs/TextInput';
import { XMarkIcon } from '@heroicons/react/24/solid';
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
        task_frequency_unit_id: task.task_frequency_unit_id || '',
        task_frequency_unit_value: task.task_frequency_unit_value || '',
        start_time: task.start_time || '',
        end_time: task.end_time || '',
        times: task.times || '',
        user_id: task.user_id || '',
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
                            <h2 className="text-lg font-medium text-gray-950">
                                {task.id ? 'Edit Task' : 'Create New Task'}
                            </h2>
                            <Link href={route('tasks.index')}>
                                <XMarkIcon className='h-8 w-8'/>
                            </Link>
                        </div>

                        <form onSubmit={submit} className="mt-6 space-y-6">
                            {/* Title */}
                            <div>
                                <InputLabel htmlFor="title" value="Title" />
                                <TextInput
                                    id="title"
                                    type="text"
                                    className="mt-1 block w-full"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    required
                                />
                                <InputError className="mt-2" message={errors.title} />
                            </div>

                            {/* Description */}
                            <div>
                                <InputLabel htmlFor="description" value="Description" />
                                <textarea
                                    id="description"
                                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                />
                                <InputError className="mt-2" message={errors.description} />
                            </div>

                            {/* Due Date / Status / Priority */}
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
                                        label="Status"
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
                                        label="Task Priority"
                                        value={data.task_priority_id}
                                        onChange={(e) => setData('task_priority_id', e.target.value)}
                                        options={props.taskPriorities}
                                        className="mt-1 block w-full"
                                    />
                                    <InputError className="mt-2" message={errors.task_priority_id} />
                                </div>
                            </div>

                            {/* Frequency Unit + Value */}
                            <div className="grid grid-cols-2 gap-1">
                                <div>
                                    <SelectInput
                                        id="task_frequency_unit_id"
                                        label="Frequency Unit"
                                        value={data.task_frequency_unit_id}
                                        onChange={(e) => setData('task_frequency_unit_id', e.target.value)}
                                        options={props.frequencyUnits}
                                        className="mt-1 block w-full"
                                    />
                                    <InputError className="mt-2" message={errors.task_frequency_unit_id} />
                                </div>
                                <div>
                                    <InputLabel htmlFor="task_frequency_unit_value" value="Frequency Value" />
                                    <TextInput
                                        id="task_frequency_unit_value"
                                        type="number"
                                        className="mt-1 block w-full"
                                        value={data.task_frequency_unit_value}
                                        onChange={(e) => setData('task_frequency_unit_value', e.target.value)}
                                    />
                                    <InputError className="mt-2" message={errors.task_frequency_unit_value} />
                                </div>
                            </div>

                            {/* Times */}
                            <div className="grid grid-cols-3 gap-1">
                                <div>
                                    <InputLabel htmlFor="start_time" value="Start Time" />
                                    <TextInput
                                        id="start_time"
                                        type="datetime-local"
                                        className="mt-1 block w-full"
                                        value={data.start_time}
                                        onChange={(e) => setData('start_time', e.target.value)}
                                    />
                                    <InputError className="mt-2" message={errors.start_time} />
                                </div>
                                <div>
                                    <InputLabel htmlFor="end_time" value="End Time" />
                                    <TextInput
                                        id="end_time"
                                        type="datetime-local"
                                        className="mt-1 block w-full"
                                        value={data.end_time}
                                        onChange={(e) => setData('end_time', e.target.value)}
                                    />
                                    <InputError className="mt-2" message={errors.end_time} />
                                </div>
                                <div>
                                    <InputLabel htmlFor="times" value="Times" />
                                    <TextInput
                                        id="times"
                                        type="datetime-local"
                                        className="mt-1 block w-full"
                                        value={data.times}
                                        onChange={(e) => setData('times', e.target.value)}
                                    />
                                    <InputError className="mt-2" message={errors.times} />
                                </div>
                            </div>

                            {/* Submit */}
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