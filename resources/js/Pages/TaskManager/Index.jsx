import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Table from '@/Components/Table';
import PrimaryButton from '@/Components/PrimaryButton';
import { Link, router } from '@inertiajs/react';

export default function Index(props) {
    const headers = ["ID", "Title", "Description", "Due Date", "Action"];
    const rows = props.tasks.map(task => ({
        id: task.id,
        title: task.title,
        description: task.description,
        due_date: task.due_date,
    }));

    const handleViewClick = (task) => {
        router.get(route('tasks.show',task.id ));
    };
    const handleEditClick = (task) => {
        router.get(route('tasks.edit',task.id ));
    };
    const handleDeleteClick = (task) => {
        if (confirm("Are you sure you want to delete this task?")) {
            router.delete(route('tasks.destroy', task.id));
        }
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="flex justify-between items-center bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">Tasks</div>
                    <PrimaryButton className="m-6">
                        <Link href={route('tasks.create')}>New</Link>
                    </PrimaryButton>
                </div>
            </div>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <Table
                            headers={headers}
                            rows={rows}
                            actionLabels={[
                                {"View":{
                                    "color":"gray",
                                    "cursor":"pointer"
                                    // "background-color":"yellow",
                                }},
                                {"Edit":{
                                    "color":"gray",
                                    "cursor":"pointer"
                                    // "background-color":"yellow",
                                }},
                                {"Delete":{
                                    "color":"gray",
                                    "cursor":"pointer"
                                    // "background-color":"red",
                                }},
                            ]}
                            onActionClick={[handleViewClick, handleEditClick, handleDeleteClick]}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
