import React from 'react';

const Button = ({
    children,
    type = 'button',
    disabled = false,
    isLoading = false,
    className = '',
    onClick = () => { },
}) => {
    const baseClasses = "h-10 w-full rounded-lg font-medium text-white shadow-lg md:h-12 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50";
    const loadingClasses = "cursor-not-allowed bg-gray-400";
    const enabledClasses = "cursor-pointer bg-blue-rgba hover:bg-blue-600";

    const buttonClasses = `${baseClasses} ${disabled || isLoading ? loadingClasses : enabledClasses} ${className}`;

    return (
        <button
            type={type}
            disabled={disabled || isLoading}
            className={buttonClasses}
            onClick={onClick}
        >
            {isLoading ? (
                <span className="flex items-center justify-center">
                    <svg
                        className="w-5 h-5 mr-2 text-white animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                    Loading...
                </span>
            ) : (
                children
            )}
        </button>
    );
};

export default Button;
