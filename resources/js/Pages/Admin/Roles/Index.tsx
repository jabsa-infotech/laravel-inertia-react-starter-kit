import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { PageProps, Permission, Role } from '@/types'
import { Link, useForm } from '@inertiajs/react'
import { Pencil, Trash } from '@/icons/HeroIcons'
import SearchBox from '@/Components/SearchBox'
import { can } from '@/utils/toolkit'

interface RoleListProps extends PageProps {
    roles?: Role[]
    role?: Role,
    allPermissions?: Permission[]
}

function Index({ auth, roles, role, allPermissions, flash, query }: RoleListProps) {

    function handleDelete(id: number | undefined): void {
        if (confirm('Are you sure you want to delete this role?')) {
            if (id) {
                useForm().delete(route('admin.roles.destroy', id));
            }
        }
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Roles</h2>}
        >
            <>
                <div className="flex items-center justify-between mb-3">
                    <SearchBox />
                    <Link href={route('admin.roles.create')} className="px-4 py-2 text-white rounded bg-primary hover:bg-primary/50">Create Role</Link>
                </div>

                <div className="flex justify-center max-w-full p-4 mx-auto overflow-x-auto bg-white rounded-lg shadow-md lg:max-w-7xl">
                    <table className="w-full table-auto">
                        <thead className="text-gray-700 bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-center border-b">
                                    SL No.
                                </th>
                                <th className="px-4 py-2 border-btext-center">
                                    Roles
                                </th>
                                <th className="px-4 py-2 text-center border-b">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {roles?.map(
                                (role: Role, index) => (
                                    <tr
                                        key={role.id}
                                        className="transition-colors duration-200 border-b hover:bg-gray-50"
                                    >
                                        <td className="px-4 py-2 text-center border-b">
                                            {++index}
                                        </td>
                                        <td className="px-4 py-2 text-center border-b">
                                            {role.name}
                                        </td>
                                        {/* <td>{role.description}</td> */}
                                        <td className="flex items-center justify-center gap-2 px-4 py-2 text-center">
                                            {can("edit roles") && (
                                                <Link
                                                    href={route(
                                                        "admin.roles.edit",
                                                        role.id
                                                    )}
                                                    className="mr-2 btn btn-primary btn-xs"
                                                >
                                                    <Pencil />
                                                </Link>
                                            )}

                                            {can("delete roles") && (
                                                <button
                                                    onClick={() =>
                                                        handleDelete(
                                                            role.id
                                                        )
                                                    }
                                                >
                                                    <Trash color="red" />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            </>
        </AuthenticatedLayout>
    )
}

export default Index
