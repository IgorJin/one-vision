import React from 'react'

export interface FormFieldLabelProps {
    htmlFor: string
    className?: string
}

export const FormFieldLabel: React.FunctionComponent<FormFieldLabelProps> = ({ htmlFor, className, children }) => (
    <label htmlFor={htmlFor} className={className}>
        {children}
    </label>
)