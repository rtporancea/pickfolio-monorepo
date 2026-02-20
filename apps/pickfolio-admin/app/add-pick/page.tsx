'use client';

import { AddPickView, addPickViewFormSchema } from '@pickfolio/ui';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { addPick } from './actions';

export default function AdminHome() {
    const form = useForm<z.infer<typeof addPickViewFormSchema>>({
        resolver: zodResolver(addPickViewFormSchema),
        defaultValues: {
            artistName: '',
            bandName: '',
            location: '',
            eventName: '',
            date: new Date(),
            description: '',
        },
    });
    return (
        <AddPickView
            form={form}
            formSubmitHandler={async (data: z.infer<typeof addPickViewFormSchema>) => {
                await addPick(data);
            }}
        />
    );
}
