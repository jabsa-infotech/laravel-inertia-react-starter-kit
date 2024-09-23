import Checkbox from '@/Components/Checkbox';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { PageProps, Permission, Role } from '@/types'
import { router, useForm } from '@inertiajs/react';
import React, { FormEvent } from 'react'

interface RoleFormProps extends PageProps {
    role?: Role
    allPermissions?: Permission[]
}
function Form({ role, allPermissions,auth }: RoleFormProps) {
    const { data, setData, post, errors, reset } = useForm({
        name: role?.name ?? '',
        permissions: role?.permissions?.map((p) => p.id) ?? [],
        _method: role ? 'PUT' : null
    })

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (role) {
            post(route('admin.roles.update', role.id), {
                onSuccess: () => reset()
            })
        } else {
            post(route('admin.roles.store'), {
                onSuccess: () => reset()
            })
        }
    }

    function handleChangePermission(permission: Permission): React.ChangeEventHandler<HTMLInputElement> | undefined {
        return (e) => {
            if (e.target.checked) {
                setData('permissions', [...data.permissions, permission.id]);
            } else {
                setData('permissions', data.permissions.filter((p) => p !== permission.id));
            }
        };
    }

    function handleDelete(event: { preventDefault: () => void; }): void {
        event.preventDefault();
        if (confirm('Are you sure you want to delete this role?')) {
            router.delete(route('admin.roles.destroy', role?.id));
        }
        throw new Error('Function not implemented.');
    }

    return (
        <Authenticated user={auth.user} header={<h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Create User</h2>}>
            <form onSubmit={handleSubmit} className='mb-4'>
                <div className="mb-3">
                    <div>
                        <label htmlFor="name">{role ? 'Edit Role' : 'New Role'}</label>
                    </div>
                    <div className="inline-flex items-center rounded-md shadow-sm">
                        <input id="name" name="name" type="text" placeholder="e.g. view courses" value={data.name} onChange={(e) => setData('name', e.target.value)} />

                        <label>&nbsp;</label>
                    </div>
                    <div className="my-2 row">
                        <div className="grid grid-cols-2 gap-2 p-4 bg-white border md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
                            {allPermissions?.map(permission => (
                                <div key={permission.id}>
                                    <label className='flex items-center gap-2'>
                                        <Checkbox name={`permissions.${permission.id}`} value={permission.id}
                                            checked={data?.permissions?.find(p => p === permission.id) ? true : false}
                                            onChange={handleChangePermission(permission)}
                                        />
                                        {permission.name}
                                    </label>
                                </div>
                            ))}

                            {allPermissions?.length === 0 && (
                                <p className="col-span-3 sm:col-span-5 xl:col-span-6">No permissions found.</p>
                            )}
                        </div>
                    </div>
                    <button type="submit" className='px-4 py-2 text-white bg-green-600'>Save</button>
                </div>
            </form>
            {role &&
                <button type="button" onClick={handleDelete} className='px-4 py-2 text-red-600'>Delete</button>
            }

        </Authenticated>
    )
}

export default Form
