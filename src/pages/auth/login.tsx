import Link from 'next/link';
import { useSession, signIn, getProviders } from 'next-auth/react';
import { useRouter } from 'next/router';
import type { GetServerSidePropsContext, InferGetServerSidePropsType, GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next"
import type { Session } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]";
import LoginForm from '@/components/LoginForm';
import { AppProviders } from 'next-auth/providers/index';

interface LoginProps {
  providers: AppProviders
}

export const getServerSideProps = async (context:GetServerSidePropsContext) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  
  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();
  
  return {
    props: { providers: providers ?? [] },
  }
}

const Login = ({providers}:LoginProps) => {
  const router = useRouter();
  const { data: session } = useSession();
  if (session) router.push('/');

  return (
    <div className="bg-base-100 bg-opacity-20 w-3/4 h-max p-10 mt-8 rounded-lg">
      <div className="flex flex-col items-center h-full w-full">
        <h2 className=" mb-4 text-center text-3xl font-bold tracking-tight text-base-content">
          Login to your account
        </h2>
        <div>
          <p className="text-center mb-1">
            Or{' '}
            <Link href="/signup/signup" className="text-slate-900 hover:text-blue-700 font-semibold hover:cursor-pointer hover:underline">
              register
            </Link>{' '}
            if you do not have an account.
          </p>
          <p className="text-center mb-1">
            Click {' '}
            <Link href="/resetpw/resetpw" className=" text-slate-900 hover:text-blue-700 font-semibold hover:cursor-pointer hover:underline">
              here
            </Link>{' '}
            if you need to reset your password.
          </p>
        </div>

        <LoginForm/>

        <p className='text-sm mb-2'>Sign In With An Existing Account:</p>
        {providers &&
          Object.values(providers).map(provider => {
            if (provider.name !== "Credentials") {
              return (
                <div key={provider.name} className='btn btn-outline hover:bg-blue-400 hover:border-blue-400 mb-1'>
                <button onClick={() => signIn(provider.id)} >
                  Sign in with{' '} {provider.name}
                </button>
              </div>
              )
            }
          })}
      </div>
    </div>
  );
};

export default Login;