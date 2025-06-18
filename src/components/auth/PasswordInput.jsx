import React, { useState } from 'react';

const PasswordInput = ({
    value,
    onChange,
    placeholder = 'Enter your password',
    label = 'Password',
    required = false,
    error = null,
    id = 'password'
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    return (
        <div className="w-full">
            <label htmlFor={id} className="mb-2 text-xs font-medium text-txt-rgba md:text-base">
                {label}{required && <span className='text-red-500'> *</span>}
            </label>
            <div className="relative w-full mb-1">
                <input
                    id={id}
                    type={showPassword ? 'text' : 'password'}
                    className="w-full h-10 pl-4 pr-10 border rounded-lg bg-input-rgba border-brdr-rgba text-brdr-rgba md:h-12"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute flex items-center justify-center w-8 h-8 text-gray-500 right-2 top-1/2 transform -translate-y-1/2"
                >
                    {showPassword ? (
                        <img src="/hide.png" alt="Hide" className="w-5 h-5" />
                    ) : (
                        <span className="text-xs">Show</span>
                    )}
                </button>
            </div>
            {error && (
                <p className="mt-1 text-xs text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
};

export default PasswordInput;
