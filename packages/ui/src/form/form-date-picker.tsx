'use client';

import { InputHTMLAttributes } from 'react';
import { FieldValues } from 'react-hook-form';
import { Calendar28 } from '../common/date-picker';
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from './form';
import { FormElementProps } from './form-types';

interface FormDatePickerProps<T extends FieldValues> extends FormElementProps<T> {
    inputMode?: InputHTMLAttributes<HTMLInputElement>['inputMode'];
    showValidity?: boolean;
    className?: string;
    labelClassName?: string;
    step?: string;
    disabled?: boolean;
}

export const FormDatePicker = <T extends FieldValues>(props: FormDatePickerProps<T>) => {
    return (
        <FormField
            control={props.form.control}
            name={props.name}
            rules={{
                onChange: props.onChange,
                onBlur: props.onBlur,
                validate: props.validate,
            }}
            render={({ field }) => {
                return (
                    <FormItem className={props.className}>
                        {props.label && (
                            <FormLabel className="gap-1">
                                {props.label}
                                <span className="text-destructive">{props.optional ? '' : ' *'}</span>
                            </FormLabel>
                        )}

                        <div className="relative w-full">
                            <FormControl>
                                <Calendar28 value={field.value} onChange={field.onChange} disabled={props.disabled} />
                            </FormControl>
                        </div>
                        {props.description && <FormDescription>{props.description}</FormDescription>}
                    </FormItem>
                );
            }}
        />
    );
};
FormDatePicker.displayName = 'FormDatePicker';
