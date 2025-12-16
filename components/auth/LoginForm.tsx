"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { validateEmail } from "@/lib/validation";

export default function LoginForm() {
    const { login } = useAuth();
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Validation States
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const [touched, setTouched] = useState<{ email?: boolean; password?: boolean }>({});

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        if (errors.email) {
            setErrors({ ...errors, email: undefined });
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        if (errors.password) {
            setErrors({ ...errors, password: undefined });
        }
    };

    const handleEmailBlur = () => {
        setTouched({ ...touched, email: true });
        const validation = validateEmail(email);
        if (!validation.isValid) {
            setErrors({ ...errors, email: validation.error });
        }
    };

    const handlePasswordBlur = () => {
        setTouched({ ...touched, password: true });
        if (!password) {
            setErrors({ ...errors, password: "Password is required" });
        } else if (password.length < 6) {
            setErrors({ ...errors, password: "Password must be at least 6 characters" });
        }
    };

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        // Mark all fields as touched
        setTouched({ email: true, password: true });

        // Validate email
        const emailValidation = validateEmail(email);
        const newErrors: { email?: string; password?: string } = {};

        if (!emailValidation.isValid) {
            newErrors.email = emailValidation.error;
        }

        // Validate password
        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        // If there are errors, show them and stop
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            const firstError = Object.values(newErrors)[0];
            toast.error(firstError);
            return;
        }

        setIsLoading(true);
        try {
            const user = await login(email, password);
            toast.success("Logged in successfully!");

            if (user && user.role === 'admin') {
                router.push("/admin");
            } else {
                router.push("/");
            }
        } catch (error: any) {
            console.error(error);
            toast.error(error.message || "Invalid email or password");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-lg mx-auto border-0 shadow-2xl bg-white/5 backdrop-blur-xl ring-1 ring-white/10 sm:rounded-2xl dark:bg-zinc-900/60">
            <CardHeader className="space-y-1 pb-6 text-center">
                <CardTitle className="text-3xl font-bold tracking-tight text-white">Welcome back</CardTitle>
                <CardDescription className="text-zinc-400">
                    Enter your credentials to access your account
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <form onSubmit={handleEmailLogin} className="space-y-4">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-zinc-300">Email</Label>
                            <div className="relative">
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={handleEmailChange}
                                    onBlur={handleEmailBlur}
                                    disabled={isLoading}
                                    required
                                    className={`h-11 bg-zinc-800/50 border-zinc-700/50 text-white placeholder:text-zinc-500 focus:border-indigo-500 focus:ring-indigo-500/20 transition-all duration-200 ${touched.email && errors.email ? 'border-red-500 focus:border-red-500' : ''
                                        } ${touched.email && !errors.email && email ? 'border-green-500/50' : ''}`}
                                />
                                {touched.email && !errors.email && email && (
                                    <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
                                )}
                            </div>
                            {touched.email && errors.email && (
                                <p className="text-xs text-red-400 flex items-center gap-1">
                                    <XCircle className="h-3 w-3" /> {errors.email}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-zinc-300">Password</Label>
                                <Link
                                    href="/forgot-password"
                                    className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    onBlur={handlePasswordBlur}
                                    disabled={isLoading}
                                    required
                                    className={`h-11 bg-zinc-800/50 border-zinc-700/50 text-white placeholder:text-zinc-500 focus:border-indigo-500 focus:ring-indigo-500/20 transition-all duration-200 ${touched.password && errors.password ? 'border-red-500 focus:border-red-500' : ''
                                        } ${touched.password && !errors.password && password ? 'border-green-500/50' : ''}`}
                                />
                                {touched.password && !errors.password && password && (
                                    <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
                                )}
                            </div>
                            {touched.password && errors.password && (
                                <p className="text-xs text-red-400 flex items-center gap-1">
                                    <XCircle className="h-3 w-3" /> {errors.password}
                                </p>
                            )}
                        </div>
                        <Button
                            className="w-full h-11 bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-all duration-200 shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Sign In
                        </Button>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 border-t border-zinc-800/50 pt-6">
                <div className="text-sm text-zinc-400 text-center w-full">
                    Don&apos;t have an account?{" "}
                    <Link
                        aria-label="Sign up"
                        href="/signup"
                        className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors hover:underline underline-offset-4"
                    >
                        Create an account
                    </Link>
                </div>
            </CardFooter>
        </Card>
    );
}
