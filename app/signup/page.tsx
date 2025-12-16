import SignupForm from "@/components/auth/SignupForm";

export default function SignupPage() {
    return (
        <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="relative hidden h-full flex-col bg-zinc-900 p-10 text-white dark:border-r lg:flex border-r border-zinc-800">
                <div className="absolute inset-0 bg-zinc-900">
                    <img
                        src="/signup-bg.png"
                        alt="Workspace"
                        className="h-full w-full object-cover opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />
                </div>
                <div className="relative z-20 flex items-center text-lg font-medium">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-6 w-6 text-purple-500"
                    >
                        <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                    </svg>
                    Vox Edge Media
                </div>
                <div className="relative z-20 mt-auto">
                    <blockquote className="space-y-2">
                        <p className="text-xl font-light italic text-zinc-200">
                            &ldquo;Join the community of creators who are shaping the future of media. Vox Edge is the place to be.&rdquo;
                        </p>
                        <footer className="text-sm font-semibold text-purple-400">Alex Chen</footer>
                    </blockquote>
                </div>
            </div>
            <div className="p-4 lg:p-8 h-full flex items-center justify-center bg-black">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-900/20 via-zinc-900/0 to-zinc-900/0 pointer-events-none" />
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[500px] relative z-10">
                    <SignupForm />
                    <p className="px-8 text-center text-sm text-zinc-500">
                        By clicking continue, you agree to our{" "}
                        <a href="/terms" className="underline underline-offset-4 hover:text-purple-400 transition-colors">
                            Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="/privacy" className="underline underline-offset-4 hover:text-purple-400 transition-colors">
                            Privacy Policy
                        </a>
                        .
                    </p>
                </div>
            </div>
        </div>
    );
}
