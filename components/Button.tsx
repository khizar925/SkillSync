'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'black';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

  const variants = {
    primary:   "bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-600/20 hover:shadow-emerald-600/30 focus:ring-emerald-500 border border-transparent",
    black:     "bg-gray-900 text-white hover:bg-gray-800 shadow-sm hover:shadow-md focus:ring-gray-900 border border-transparent",
    secondary: "bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 focus:ring-gray-200 shadow-sm",
    outline:   "border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 focus:ring-emerald-500",
    ghost:     "text-gray-600 hover:text-gray-900 hover:bg-gray-100/60",
  };

  const sizes = {
    sm: "h-8 px-3.5 text-sm",
    md: "h-10 px-5 text-sm",
    lg: "h-12 px-7 text-base",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
