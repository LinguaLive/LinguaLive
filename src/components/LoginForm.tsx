import { signIn } from 'next-auth/react';
import { FormEventHandler } from 'react';

interface LoginFormProps {
  form?: { notVerified: boolean };
}

const LoginForm: React.FC<LoginFormProps> = ({ form }) => {
  const handleSubmit:FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const emailInput = form[0] as HTMLInputElement;
    const pwInput = form[1] as HTMLInputElement;
    const email = emailInput.value;
    const password = pwInput.value;
    if ((emailInput && email !== '') && (pwInput && password !== '')) {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false
      });
      console.log(res);
      if (res?.status !== 200) {
        
      }
    }
  }
  return (
      <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col items-center w-full pt-4 pb-8">
        <div className="form-control w-2/3 max-w-md mt-1 mb-3">
          <label htmlFor="email" className="label font-medium pb-1">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name="email" className="input input-md input-info max-w-md" />
        </div>

        <div className="form-control w-2/3 max-w-md">
          <label htmlFor="password" className="label font-medium pb-1">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name="password" className="input input-md input-info max-w-md" />
        </div>

        <button
          type="submit"
          className="btn bg-blue-500 hover:bg-blue-600 hover:border-blue-600 w-52 mt-6"
        >
          Login
        </button>

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
  )
}

export default LoginForm;