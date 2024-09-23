import Checkbox from '@/Components/Checkbox'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { PageProps, Role, User } from '@/types'
import { Head, useForm } from '@inertiajs/react'
import React, { FormEvent } from 'react'
interface UserFormProps extends PageProps {
    user?: User,
    allRoles?: Role[]
}
const Form = ({ allRoles, auth, user }: UserFormProps) => {
    const { data, setData, post, errors, reset } = useForm({
        name: user?.name ?? '',
        email: user?.email ?? '',
        password: '',
        password_confirmation: '',

        roles: user?.roles?.map((r) => r.id) ?? [],
        _method: user ? 'PUT' : null
    })

    function handleDelete(event: any): void {
        throw new Error('Function not implemented.')
    }

    function handleChangeRole(role: Role): React.ChangeEventHandler<HTMLInputElement> | undefined {
        return (e) => {
            if (e.target.checked) {
                setData('roles', [...data.roles, role.id]);
            } else {
                setData('roles', data.roles.filter((p) => p !== role.id));
            }
        };
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();

        post(route(user ? 'admin.users.update' : 'admin.users.store', user?.id),
            {
                onSuccess: () => reset()
            }
        )
    }

    return (
        <Authenticated user={auth.user} header={<h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">{user ? 'Edit User' : 'Create User'}</h2>}>
            <Head title={user ? 'Edit User' : 'Create User'} />

            <form onSubmit={handleSubmit} className='mb-4'>
                <div className="mb-3">
                    <div>
                        <InputLabel htmlFor="name" value="Name *" />

                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="block w-full mt-1"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />

                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="email" value="Username *" />

                        <TextInput
                            id="email"
                            type="text"
                            name="email"
                            value={data.email}
                            className="block w-full mt-1"
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password" value="Password" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="block w-full mt-1"
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
                        />

                        <InputError message={errors.password} className="mt-2" />
                        <InputLabel value={user ? 'Keep it blank if you don\'t want to update the password' : ''} className='mt-2 font-thin' />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="block w-full mt-1"
                            autoComplete="new-password"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                        />

                        <InputError message={errors.password_confirmation} className="mt-2" />
                    </div>

                    <div className="my-2 row">
                        <InputLabel htmlFor="roles" value="Roles" />
                        {/* <div> */}
                        <InputError message={errors.roles} className="mt-2" />
                        {/* </div> */}
                        <div className="grid grid-cols-2 gap-2 p-4 bg-white border md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
                            {allRoles?.map(role => (
                                <div key={role.id}>
                                    <label className='flex items-center gap-2'>
                                        <Checkbox name={`roles.${role.id}`} value={role.id}
                                            checked={data?.roles?.find(r => r === role.id) ? true : false}
                                            onChange={handleChangeRole(role)}
                                        />
                                        {role.name}
                                    </label>
                                </div>
                            ))}



                            {allRoles?.length === 0 && (
                                <p className="col-span-3 sm:col-span-5 xl:col-span-6">No roles found.</p>
                            )}
                        </div>
                    </div>
                    <button type="submit" className='px-4 py-2 text-white bg-green-600'>Save</button>
                </div>
            </form>
            {user &&
                <button type="button" onClick={handleDelete} className='px-4 py-2 text-red-600'>Delete</button>
            }
        </Authenticated>
    )
}

export default Form
