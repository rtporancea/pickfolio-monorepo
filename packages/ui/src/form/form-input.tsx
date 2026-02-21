'use client';

import { FieldValues } from 'react-hook-form';
import { Input } from '../common/input';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './form';
import { FormElementProps } from './form-types';

export const FormInput = <T extends FieldValues>(props: FormElementProps<T>) => (
    <FormField
        control={props.form.control}
        name={props.name}
        rules={{
            onChange: props.onChange,
            onBlur: props.onBlur,
            validate: props.validate,
        }}
        render={({ field, fieldState }) => {
            const isValid = fieldState.isTouched && !fieldState.invalid && !fieldState.isValidating;

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
                            <Input
                                {...field}
                                type={props.type}
                                disabled={props.disabled}
                                placeholder={props.placeholder}
                            />
                        </FormControl>
                    </div>

                    {props.description && <FormDescription>{props.description}</FormDescription>}

                    <FormMessage />
                </FormItem>
            );
        }}
    />
);

FormInput.displayName = 'FormInput';
