import React from 'react';

const TextInput = ({
    type = 'text',
    value,
    onChange,
    placeholder,
    label,
    required = false,
    error = null,
    id = 'text-input'
}) => {
    return (
        <div className="w-full">
            <label htmlFor={id} className="mb-2 text-xs font-medium text-txt-rgba md:text-base">
                {label}{required && <span className='text-red-500'> *</span>}
            </label>
            <input
                id={id}
                type={type}
                className="w-full h-10 pl-4 border rounded-lg bg-input-rgba border-brdr-rgba text-brdr-rgba md:h-12"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            {error && (
                <p className="mt-1 text-xs text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
};

export default TextInput;
