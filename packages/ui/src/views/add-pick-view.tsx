'use client';

import { z } from 'zod';
import { Button } from '../common/button';
import { Heading1 } from '../common/text-styles';
import { Form } from '../form/form';
import { FormInput } from '../form/form-input';
import { FormViewProps } from '../form/form-types';
import { GridContainer, VerticalLayout } from '../layouts/layouts';
import { FormDatePicker } from '../form/form-date-picker';

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
                    <VerticalLayout variant="normal">
                        <Heading1>Add Pick</Heading1>
                        <VerticalLayout>
                            <FormInput name="artistName" label="Artist Name" form={form} />
                            <FormInput name="bandName" label="Band Name" form={form} />
                            <FormInput name="location" label="Location" form={form} />
                            <FormInput name="eventName" label="Event Name" form={form} optional />
                            <FormDatePicker name="date" label="Date" form={form} />
                            <FormInput name="description" label="Description" form={form} optional />
                        </VerticalLayout>

                        <Button type="submit" className="w-full sm:w-fit sm:self-end">
                            Add Pick
                        </Button>
                    </VerticalLayout>
                </form>
            </Form>
        </GridContainer>
    );
}
