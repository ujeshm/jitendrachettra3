'use client';

import InputField from '@/components/shared-components/form/InputField';
import { setCookie } from '@/helpers/helpers';
import { LOGIN_PASSWORD, LOGIN_USERNAME } from '@/utils/getEnvs';
// import useApiMutation from '@/lib/react-query/useReactMutation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export type SigninFormFieldsTypes = {
  username: string;
  password: string;
};

const signinValidationSchema = yup.object({
  username: yup.string().trim().required('Username is required.'),
  password: yup.string().trim().required('Password is required.'),
});
const LoginComponent = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormFieldsTypes>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {},
    resolver: yupResolver(signinValidationSchema),
  });

  const onSubmit = handleSubmit(async (input) => {
    if (input.username === LOGIN_USERNAME && input.password === LOGIN_PASSWORD) {
      setCookie('lmcVotersUser', 'test', { expires: 1 });
      router.push('/');
    } else {
      alert('Invalid credentials');
    }
  });

  return (
    <div className="bg-gray-50 relative" suppressHydrationWarning>
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white shadow-lg rounded-xl  px-10 py-20">
            <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">Sign in to your account</h2>

            <form onSubmit={onSubmit} className="space-y-6">
              {/* Username */}

              <InputField
                name={'username'}
                label={'username'}
                type={'username'}
                placeholder={'Enter your username'}
                errors={errors?.username?.message}
                register={register}
              />
              {/* Password */}
              <InputField
                name={'password'}
                label={'password'}
                type={'password'}
                placeholder={'Enter your password'}
                errors={errors?.password?.message}
                register={register}
              />

              {/* Submit */}
              <div className="mt-4">
                <button
                  type="submit"
                  disabled={false}
                  className="flex w-full items-center justify-center gap-3 rounded-xl  px-3 py-2 text-sm font-medium text-white bg-[#2B2B2B] hover:bg-[#252525] disabled:opacity-70 cursor-pointer"
                >
                  {/* {isLoading && (
                  <svg className="h-5 w-5 animate-spin text-white" viewBox="0 0 100 101" fill="none">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591" fill="currentColor" />
                  </svg>
                  )} */}
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
