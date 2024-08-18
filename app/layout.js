import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs';
import "./globals.css";
import LandingPage from '@/components/LandingPage';

export const metadata = {
  title: "Mongo TODOs",
  description: "Next.js, MongoDB, Tailwind",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <nav className="flex justify-between items-center p-4 bg-gray-100">
            <div className="text-xl font-bold">Mongo TODOs</div>
            <SignedOut>
              <div className="flex space-x-4">
                <SignInButton mode="modal">
                  <button className="bg-black text-white font-semibold py-2 px-4 rounded-full hover:bg-gray-800 transition duration-300 ease-in-out">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="bg-white text-black font-semibold py-2 px-4 rounded-full border border-black hover:bg-gray-100 transition duration-300 ease-in-out">
                    Sign Up
                  </button>
                </SignUpButton>
              </div>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </nav>
          <SignedIn>
            {children}
          </SignedIn>
          <SignedOut>
            <div className="landing-page">
              <LandingPage/>
            </div>
          </SignedOut>
        </body>
      </html>
    </ClerkProvider>
  );
}
