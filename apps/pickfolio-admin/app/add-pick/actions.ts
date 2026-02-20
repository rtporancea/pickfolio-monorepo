'use server';

import { addPickViewFormSchema } from '@pickfolio/ui';
import { z } from 'zod';
import { createPick } from '../../../../packages/server/src/pick-entries-actions';

export async function addPick(formData: z.infer<typeof addPickViewFormSchema>) {
    return createPick({
        ...formData,
        eventName: formData.eventName ?? null,
        description: formData.description ?? null,
    });
}
