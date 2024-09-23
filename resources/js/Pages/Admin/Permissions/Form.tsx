import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { PageProps, Permission } from '@/types'
import { useForm } from '@inertiajs/react';
import React, { FormEvent } from 'react'

interface PermissionFormProps extends PageProps {
    permission?: Permission
}
function Form({ permission }: PermissionFormProps) {
    const { data, setData, post, errors, reset } = useForm({
        name: permission?.name ?? '',
    })
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (permission) {
            post(route('admin.permissions.update', permission.id), {
                onSuccess: () => reset()
            })
        } else {
            post(route('admin.permissions.store'), {
                onSuccess: () => reset()
            })
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className='mb-4'>
                <div className="flex items-center gap-3">
                    <div className="">
                        <InputLabel htmlFor="name">New Permission</InputLabel>

                        <div className="flex items-center gap-2">
                            <TextInput id='name' name='name' type='text' placeholder='view students' onChange={(e) => setData('name', e.target.value)} />
                            <PrimaryButton type='submit'>Save</PrimaryButton>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Form
