import { EyeCloseSvg, EyeOpenSvg } from '@/helpers/svg';
import { useState } from 'react';

interface InputFieldProps {
  name: string;
  label: string;
  type?: 'text' | 'password';
  placeholder: string;
  errors?: string | any;
  register: any;
  maxLength?: number;
}

const InputField = ({ label, name, type = 'text', placeholder, errors, register, maxLength }: InputFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : 'text';

  return (
    <div className="relative mt-1">
      <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900 capitalize">
        {label}
      </label>

      <div className="relative">
        <input
          id={name}
          type={inputType}
          placeholder={placeholder}
          maxLength={maxLength}
          className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#2B2B2B] sm:text-sm sm:leading-6"
          {...register(name)}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer"
          >
            {showPassword ? <EyeOpenSvg /> : <EyeCloseSvg />}
          </button>
        )}
      </div>

      {errors && <p className="text-xs text-red-500 absolute -bottom-5 normal-case">{errors}</p>}
    </div>
  );
};

export default InputField;
