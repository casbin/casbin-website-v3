import { Metadata } from 'next';
import Showcase from '@/components/user/Showcase';

export const metadata: Metadata = {
  title: 'Users',
  description: 'Companies and projects using Casbin',
};

export default function Page() {
  return (
    <div className="w-full min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative isolate pt-14">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#443D80] to-[#6B5B95] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>

        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              Powering Authorization <br />
              <span className="bg-gradient-to-r from-[#443D80] via-[#6B5B95] to-[#443D80] bg-clip-text text-transparent">
                Everywhere
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              From Fortune 500 enterprises to high-growth startups, Casbin is the trusted choice for modern access control. 
              Join the global community of organizations securing their applications with our powerful PERM metamodel.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
        <Showcase />
      </div>
    </div>
  );
}