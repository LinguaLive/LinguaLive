import React from 'react';
import Link from 'next/link'

interface LoginFormProps {
  form?: { notVerified: boolean };
}

const LoginForm: React.FC<LoginFormProps> = ({ form }) => {
  return (
    <div className="flex flex-col items-center h-full w-full">
      <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-base-content">
        Please login to your account
      </h2>
      <div>
      <p className="text-center mt-1">
        Or{' '}
        <Link href="/signup/signup" className="text-primary font-medium hover:cursor-pointer hover:underline">
          register
        </Link>{' '}
        if you do not have an account.
      </p>
      <p className="text-center mt-1">
        Click {' '}
        <Link href="/resetpw/resetpw" className="text-primary font-medium hover:cursor-pointer hover:underline">
          here
        </Link>{' '}
        if you need to reset your password.
      </p>
      </div>
      <form action="?/login" method="POST" className="flex flex-col items-center space-y-2 w-full pt-4 pb-8">
        <div className="form-control w-full max-w-md">
          <label htmlFor="email" className="label font-medium pb-1">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name="email" className="input input-bordered w-full max-w-md" />
        </div>
        <div className="form-control w-full max-w-md">
          <label htmlFor="password" className="label font-medium pb-1">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name="password" className="input input-bordered w-full max-w-md" />
        </div>
        <div className="w-full max-w-md pt-2">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-5 w-full max-w-md border border-blue-700 rounded"
          >
            Login
          </button>
        </div>
        {form?.notVerified && (
          <div className="alert alert-error shadow-lg w-full max-w-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>You must verify your email before logging in.</span>
          </div>
        )}
      </form>
      <form className="flex flex-col items-center space-y-2 w-full pt-4" method="post" action="?/OAuth2">
        <div className="w-full max-w-md pt-2">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-5 w-full max-w-md border border-blue-700 rounded"
          >
            Sign in with Google
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;