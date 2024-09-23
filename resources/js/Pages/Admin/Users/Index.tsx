import SearchBox from '@/Components/SearchBox'
import { ChevronRight } from '@/icons/HeroIcons'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { PageProps, User } from '@/types'
import { Head, Link } from '@inertiajs/react'
import React from 'react'

interface UserListProps extends PageProps {
    users?: User[],
}
function Index({ auth, users }: UserListProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Users</h2>}>
            <Head title="Users" />

            <div className="flex items-center justify-between mx-auto mt-10 mb-3 max-w-7xl">
                <SearchBox />
                <div>
                    <Link href={route('admin.users.create')} className="px-4 py-2 text-white rounded bg-primary hover:bg-primary/50">Create User</Link>
                </div>
            </div>
            <div className="flex justify-center p-4 mx-auto bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 max-w-7xl rounde-xl">
                <table className='w-full'>
                    <thead>
                        <tr>
                            <td className='py-2'>#</td>
                            <td>User</td>
                            <td>Username</td>
                            <td>Roles</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user, index) => (
                            <tr key={user.id} className='border-b border-gray-200 rounded-lg cursor-pointer dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700/50' onClick={() => window.location.href = route('admin.users.edit', user.id)}>
                                <td className='px-4 py-2'>{++index}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td className='flex flex-wrap items-center gap-2'>
                                    {user.roles?.map((role) => (
                                        <span key={role.id} className='px-2 py-1 bg-gray-200 rounded'>{role.name}</span>
                                    ))}
                                </td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <ChevronRight />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    )
}

export default Index
