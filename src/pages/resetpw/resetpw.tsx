import React from 'react';
import Link from 'next/link';

interface PasswordResetFormProps {
  onResetPassword: (email: string) => void;
}

const PasswordResetForm: React.FC<PasswordResetFormProps> = ({ onResetPassword }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    onResetPassword(email);
  };

  return (
    <div className="flex flex-col items-center h-full w-full">
      <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-base-content">
        Reset Your Password
      </h2>
      <div>
        <p className="text-center mt-1">
          Or{' '}
          <Link href="/signup/signup" className="text-secondary font-medium hover:cursor-pointer hover:underline">
            register
          </Link>{' '}
          if you do not have an account.
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center space-y-2 w-full pt-4 pb-8"
      >
        <div className="form-control w-full max-w-md">
          <label htmlFor="email" className="label font-medium pb-1">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name="email" className="input input-bordered w-full max-w-md" />
        </div>
        <div className="w-full max-w-md pt-2">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-5 w-full max-w-md border border-blue-700 rounded"
          >
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordResetForm;
