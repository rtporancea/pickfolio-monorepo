import { HTMLInputTypeAttribute, ReactNode } from 'react';
import { FieldValues, Path, SubmitHandler, UseFormReturn, FieldPath, RegisterOptions } from 'react-hook-form';

export interface FormElementProps<
    FormFieldValues extends FieldValues = FieldValues,
    FormFieldName extends FieldPath<FormFieldValues> = FieldPath<FormFieldValues>,
> {
    className?: string;
    description?: ReactNode;
    disabled?: boolean;
    optional?: boolean;
    form: UseFormReturn<FormFieldValues>;
    helpText?: string;
    label?: string;
    name: Path<FormFieldValues>;
    placeholder?: string;
    type?: HTMLInputTypeAttribute;
    onChange?: RegisterOptions<FormFieldValues, FormFieldName>['onChange'];
    onBlur?: RegisterOptions<FormFieldValues, FormFieldName>['onBlur'];
    validate?: RegisterOptions<FormFieldValues, FormFieldName>['validate'];
}

export interface FormViewProps<T extends FieldValues> {
    /**
     * The handler for the form submit event.
     *
     * @see https://react-hook-form.com/docs/useform/handlesubmit
     */
    formSubmitHandler: SubmitHandler<T>;
    /**
     * The return of the useForm hook from react-hook-form.
     *
     * @see https://react-hook-form.com/docs/useform
     */
    form: UseFormReturn<T>;
}
