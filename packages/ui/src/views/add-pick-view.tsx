'use client';

import { z } from 'zod';
import { Button } from '../common/button';
import { Heading1 } from '../common/text-styles';
import { Form } from '../form/form';
import { FormInput } from '../form/form-input';
import { FormViewProps } from '../form/form-types';
import { GridContainer, VerticalLayout } from '../layouts/layouts';

export const addPickViewFormSchema = z.object({
    artistName: z.string().trim(),
    bandName: z.string().trim(),
    location: z.string().trim(),
    eventName: z.string().trim().optional(),
    date: z.date(),
    description: z.string().trim().optional(),
});

export type AddPickViewProps = FormViewProps<z.infer<typeof addPickViewFormSchema>>;

export function AddPickView(props: AddPickViewProps) {
    const { formSubmitHandler, form } = props;

    return (
        <GridContainer>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(formSubmitHandler)} className="w-full">
                    <VerticalLayout variant="normal" className="p-6 desktop:p-10 tablet:col-span-1">
                        <Heading1>Add Pick</Heading1>
                        <FormInput name="artistName" label="Artist Name" form={form} />
                        <FormInput name="bandName" label="Band Name" form={form} />
                        <FormInput name="location" label="Location" form={form} />
                        <FormInput name="eventName" label="Event Name" form={form} />
                        <FormInput name="description" label="Description" form={form} />
                    </VerticalLayout>

                    <Button type="submit">Add Pick</Button>
                </form>
            </Form>
        </GridContainer>
    );
}
