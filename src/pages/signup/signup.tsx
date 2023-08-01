import React from 'react';
import Link from 'next/link'

const RegisterForm: React.FC = () => {
  return (
    <div className="flex flex-col items-center h-full w-full">
      <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-base-content">
        Register for an account
      </h2>
      <p className="text-center mt-1">
        Or{' '}
        <Link href="/login/login" className="text-secondary font-medium hover:cursor-pointer hover:underline">
          sign in
        </Link>{' '}
        if you already have an account.
      </p>
      <form action="?/register" method="POST" className="flex flex-col items-center space-y-2 w-full pt-4">
        <div className="form-control w-full max-w-md">
          <label htmlFor="name" className="label font-medium pb-1">
            <span className="label-text">Name</span>
          </label>
          <input type="text" name="name" className="input input-bordered w-full max-w-md" />
        </div>
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
        <div className="form-control w-full max-w-md">
          <label htmlFor="passwordConfirm" className="label font-medium pb-1">
            <span className="label-text">Confirm Password</span>
          </label>
          <input
            type="password"
            name="passwordConfirm"
            className="input input-bordered w-full max-w-md"
          />
        </div>
        <div className="w-full max-w-md pt-2">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-5 w-full max-w-md border border-blue-700 rounded"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;