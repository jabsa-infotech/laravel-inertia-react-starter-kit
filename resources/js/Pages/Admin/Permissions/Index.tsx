import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { PageProps } from '@/types'
import { Head, useForm } from '@inertiajs/react'
import React, { FormEvent, useState } from 'react'
import Form from './Form'

interface Permission {
    name: string
}
interface PermissionListProps extends PageProps {
    permissions?: Permission[]
}

function Index({ auth, flash, permissions, query }: PermissionListProps) {

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Permissions</h2>}
        >
            <Head title="Permissions" />
            <div className="p-4 mx-auto text-gray-800 max-w-7xl dark:text-gray-300">

                <Form auth={auth} flash={flash} query={query}/>

                <div className="my-2 row justify-content-end">
                    <div className="flex justify-between">
                        <div className="font-semibold">
                            Available Permissions
                        </div>
                    </div>
                </div>

                <div className="my-2 row">
                    <div className="grid grid-cols-3 gap-2 p-4 bg-white border sm:grid-cols-5 xl:grid-cols-6">
                        {permissions?.map((permission) => (
                            <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-gray-100 border text-gray-800">{permission.name}</span>
                        ))}
                        {permissions?.length === 0 && (
                            <p className="col-span-3 sm:col-span-5 xl:col-span-6">No permissions found.</p>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default Index
