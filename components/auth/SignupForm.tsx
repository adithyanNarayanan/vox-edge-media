"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import {
    validateEmail,
    validatePassword,
    validateDisplayName,
    validatePhoneNumber,
    validateConfirmPassword,
    getPasswordStrength
} from "@/lib/validation";

const ResendOtpButton = ({ email, onResend }: { email: string, onResend: (email: string) => Promise<any> }) => {
    const [timeLeft, setTimeLeft] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const [isResending, setIsResending] = useState(false);

    useEffect(() => {
        if (timeLeft > 0) {
            const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timerId);
        } else {
            setCanResend(true);
        }
    }, [timeLeft]);

    const handleResend = async () => {
        setIsResending(true);
        try {
            const devOTP = await onResend(email);
            toast.success("OTP resent successfully!");
            if (devOTP) toast.info(`Development OTP: ${devOTP}`);

            // Reset timer
            setCanResend(false);
            setTimeLeft(60);
        } catch (error) {
            toast.error("Failed to resend OTP");
        } finally {
            setIsResending(false);
        }
    };

    return (
        <Button
            variant="ghost"
            size="sm"
            className="w-full text-zinc-400 hover:text-white hover:bg-zinc-800"
            onClick={handleResend}
            disabled={!canResend || isResending}
            type="button"
        >
            {isResending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : canResend ? (
                "Resend Code"
            ) : (
                `Resend in ${timeLeft}s`
            )}
        </Button>
    );
};

export default function SignupForm() {
    const { sendEmailOTP, verifyEmailOTP, logout } = useAuth();
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [showOtpModal, setShowOtpModal] = useState(false);

    // Form States
    const [formData, setFormData] = useState({
        displayName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: ""
    });
    const [otp, setOtp] = useState("");
    const [countryCode, setCountryCode] = useState("+91"); // Default to India

    // Validation States
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    // ✅ REMOVED: Real-time email availability checking (causes "Failed to fetch" errors)
    // Email will now be checked only when user clicks the Submit button

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });

        // Clear error when user starts typing
        if (errors[id]) {
            setErrors({ ...errors, [id]: "" });
        }
    };

    const handleBlur = (field: string) => {
        setTouched({ ...touched, [field]: true });
        validateField(field, formData[field as keyof typeof formData]);
    };

    const validateField = (field: string, value: string) => {
        let validation;

        switch (field) {
            case "displayName":
                validation = validateDisplayName(value);
                break;
            case "email":
                validation = validateEmail(value);
                break;
            case "phoneNumber":
                validation = validatePhoneNumber(value);
                break;
            case "password":
                validation = validatePassword(value);
                break;
            case "confirmPassword":
                validation = validateConfirmPassword(formData.password, value);
                break;
            default:
                return;
        }

        if (!validation.isValid) {
            setErrors({ ...errors, [field]: validation.error || "" });
        }
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        // Mark all fields as touched
        setTouched({
            displayName: true,
            email: true,
            phoneNumber: true,
            password: true,
            confirmPassword: true
        });

        // Validate all fields
        const validations = {
            displayName: validateDisplayName(formData.displayName),
            email: validateEmail(formData.email),
            phoneNumber: validatePhoneNumber(formData.phoneNumber),
            password: validatePassword(formData.password),
            confirmPassword: validateConfirmPassword(formData.password, formData.confirmPassword)
        };

        // Collect all errors
        const newErrors: Record<string, string> = {};
        Object.entries(validations).forEach(([field, validation]) => {
            if (!validation.isValid && validation.error) {
                newErrors[field] = validation.error;
            }
        });

        // If there are any errors, show them and stop
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            // Show first error as toast
            const firstError = Object.values(newErrors)[0];
            toast.error(firstError);
            return;
        }

        setIsLoading(true);
        try {
            // ✅ STEP 1: Check if email is already in use
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';
            console.log("🔍 Checking email availability...");
            console.log("📡 API URL for email check:", API_URL);
            console.log("🔗 Full endpoint for email check:", `${API_URL}/api/auth/check-email`);

            let emailCheckResponse;
            try {
                emailCheckResponse = await fetch(`${API_URL}/api/auth/check-email`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: formData.email })
                });
            } catch (fetchError) {
                console.error("❌ Fetch failed:", fetchError);
                // If fetch fails, it means the backend is not reachable
                // Skip the email check and proceed directly to OTP
                console.warn("⚠️ Backend not reachable, proceeding without email check");
                toast.warning("Cannot verify email availability. Proceeding anyway...");

                // Skip to OTP sending
                const devOTP = await sendEmailOTP(formData.email);
                setShowOtpModal(true);
                toast.success(`OTP sent to ${formData.email}`);
                if (devOTP) {
                    toast.info(`Development OTP: ${devOTP}`);
                }
                return;
            }

            const emailCheckData = await emailCheckResponse.json();

            // If email is already registered, show error and DON'T send OTP
            if (emailCheckData.success && !emailCheckData.available) {
                console.log("❌ Email already exists");
                setErrors({ ...errors, email: "This email already exists" });
                toast.error("This email already exists. Use another email to sign up.");
                return; // ❌ STOP HERE - Don't show OTP modal
            }

            console.log("✅ Email available, sending OTP...");

            // ✅ STEP 2: Email is available, send OTP
            const devOTP = await sendEmailOTP(formData.email);
            setShowOtpModal(true); // ← OTP modal only shows if email is NOT registered
            toast.success(`OTP sent to ${formData.email}`);

            if (devOTP) {
                toast.info(`Development OTP: ${devOTP}`);
            }
        } catch (error: any) {
            console.error("❌ Signup error:", error);
            toast.error(error.message || "Failed to send OTP");
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        if (!otp || otp.length !== 6) {
            toast.error("Please enter a valid 6-digit OTP");
            return;
        }

        setIsLoading(true);
        try {
            // Combine country code with phone number
            const fullPhoneNumber = `${countryCode} ${formData.phoneNumber}`;

            // Verify OTP and create account
            console.log("Verifying OTP and creating account...");
            await verifyEmailOTP(
                formData.email,
                otp,
                formData.displayName,
                fullPhoneNumber,
                formData.password
            );

            // ✅ OTP verified successfully and account created!
            console.log("✅ OTP verified successfully! Account created.");

            // Close the OTP modal
            setShowOtpModal(false);

            // Show success message
            toast.success("🎉 OTP Verified! Account created successfully!");
            toast.info("Redirecting to login page...");

            // Clear session and redirect after a brief delay so user can see the success message
            setTimeout(() => {
                logout(); // Clear session to force login
                router.push("/login");
            }, 1500);

        } catch (error: any) {
            // ❌ OTP verification failed or account creation failed
            console.error("❌ OTP Verification Error:", error);

            // Keep modal open so user can try again
            setShowOtpModal(true);

            // Show specific error message
            if (error.message?.includes("Invalid OTP")) {
                toast.error("❌ Incorrect OTP. Please check and try again.");
            } else if (error.message?.includes("expired")) {
                toast.error("❌ OTP has expired. Please request a new one.");
            } else if (error.message?.includes("already")) {
                toast.error("❌ " + error.message);
            } else {
                toast.error(error.message || "❌ OTP verification failed. Please try again.");
            }

            // Clear the OTP input so user can enter again
            setOtp("");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Card className="w-full max-w-lg mx-auto border-0 shadow-2xl bg-white/5 backdrop-blur-xl ring-1 ring-white/10 sm:rounded-2xl dark:bg-zinc-900/60">
                <CardHeader className="space-y-1 pb-6 text-center">
                    <CardTitle className="text-3xl font-bold tracking-tight text-white">Create an account</CardTitle>
                    <CardDescription className="text-zinc-400">
                        Enter your details below to start your journey
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <form onSubmit={handleSignup} className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="displayName" className="text-zinc-300">Full Name</Label>
                            <div className="relative">
                                <Input
                                    id="displayName"
                                    placeholder="John Doe"
                                    value={formData.displayName}
                                    onChange={handleChange}
                                    onBlur={() => handleBlur("displayName")}
                                    disabled={isLoading}
                                    required
                                    className={`h-11 bg-zinc-800/50 border-zinc-700/50 text-white placeholder:text-zinc-500 focus:border-indigo-500 focus:ring-indigo-500/20 transition-all duration-200 ${touched.displayName && errors.displayName ? 'border-red-500 focus:border-red-500' : ''
                                        } ${touched.displayName && !errors.displayName && formData.displayName ? 'border-green-500/50' : ''}`}
                                />
                                {touched.displayName && !errors.displayName && formData.displayName && (
                                    <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
                                )}
                            </div>
                            {touched.displayName && errors.displayName && (
                                <p className="text-xs text-red-400 flex items-center gap-1">
                                    <XCircle className="h-3 w-3" /> {errors.displayName}
                                </p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email" className="text-zinc-300">Email</Label>
                            <div className="relative">
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    onBlur={() => handleBlur("email")}
                                    disabled={isLoading}
                                    required
                                    className={`h-11 bg-zinc-800/50 border-zinc-700/50 text-white placeholder:text-zinc-500 focus:border-indigo-500 focus:ring-indigo-500/20 transition-all duration-200 ${touched.email && errors.email ? 'border-red-500 focus:border-red-500' : ''
                                        } ${touched.email && !errors.email && formData.email ? 'border-green-500/50' : ''}`}
                                />
                                {touched.email && !errors.email && formData.email && (
                                    <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
                                )}
                            </div>
                            {touched.email && errors.email && (
                                <p className="text-xs text-red-400 flex items-center gap-1">
                                    <XCircle className="h-3 w-3" /> {errors.email}
                                </p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="phoneNumber" className="text-zinc-300">Phone Number</Label>
                            <div className="relative flex gap-2">
                                {/* Country Code Selector */}
                                <select
                                    value={countryCode}
                                    onChange={(e) => setCountryCode(e.target.value)}
                                    disabled={isLoading}
                                    className="h-11 px-3 bg-zinc-800/50 border border-zinc-700/50 text-white rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all duration-200 cursor-pointer"
                                    style={{ width: '110px' }}
                                >
                                    <option value="+91">🇮🇳 +91</option>
                                    <option value="+1">🇺🇸 +1</option>
                                    <option value="+44">🇬🇧 +44</option>
                                    <option value="+971">🇦🇪 +971</option>
                                    <option value="+65">🇸🇬 +65</option>
                                    <option value="+61">🇦🇺 +61</option>
                                    <option value="+81">🇯🇵 +81</option>
                                    <option value="+86">🇨🇳 +86</option>
                                    <option value="+33">🇫🇷 +33</option>
                                    <option value="+49">🇩🇪 +49</option>
                                    <option value="+92">🇵🇰 +92</option>
                                    <option value="+880">🇧🇩 +880</option>
                                    <option value="+94">🇱🇰 +94</option>
                                    <option value="+60">🇲🇾 +60</option>
                                    <option value="+62">🇮🇩 +62</option>
                                    <option value="+63">🇵🇭 +63</option>
                                    <option value="+66">🇹🇭 +66</option>
                                    <option value="+84">🇻🇳 +84</option>
                                    <option value="+27">🇿🇦 +27</option>
                                    <option value="+234">🇳🇬 +234</option>
                                </select>

                                {/* Phone Number Input */}
                                <div className="relative flex-1">
                                    <Input
                                        id="phoneNumber"
                                        type="tel"
                                        placeholder="9999999999"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        onBlur={() => handleBlur("phoneNumber")}
                                        disabled={isLoading}
                                        required
                                        className={`h-11 bg-zinc-800/50 border-zinc-700/50 text-white placeholder:text-zinc-500 focus:border-indigo-500 focus:ring-indigo-500/20 transition-all duration-200 ${touched.phoneNumber && errors.phoneNumber ? 'border-red-500 focus:border-red-500' : ''
                                            } ${touched.phoneNumber && !errors.phoneNumber && formData.phoneNumber ? 'border-green-500/50' : ''}`}
                                    />
                                    {touched.phoneNumber && !errors.phoneNumber && formData.phoneNumber && (
                                        <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
                                    )}
                                </div>
                            </div>
                            {touched.phoneNumber && errors.phoneNumber && (
                                <p className="text-xs text-red-400 flex items-center gap-1">
                                    <XCircle className="h-3 w-3" /> {errors.phoneNumber}
                                </p>
                            )}
                            <p className="text-xs text-zinc-500">
                                Selected: {countryCode}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="password" className="text-zinc-300">Password</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        onBlur={() => handleBlur("password")}
                                        disabled={isLoading}
                                        required
                                        className={`h-11 bg-zinc-800/50 border-zinc-700/50 text-white placeholder:text-zinc-500 focus:border-indigo-500 focus:ring-indigo-500/20 transition-all duration-200 ${touched.password && errors.password ? 'border-red-500 focus:border-red-500' : ''
                                            } ${touched.password && !errors.password && formData.password ? 'border-green-500/50' : ''}`}
                                    />
                                </div>
                                {touched.password && errors.password && (
                                    <p className="text-xs text-red-400 flex items-center gap-1">
                                        <XCircle className="h-3 w-3" /> {errors.password}
                                    </p>
                                )}
                                {formData.password && !errors.password && (
                                    <div className="space-y-1">
                                        <div className="flex gap-1">
                                            {[1, 2, 3, 4, 5, 6].map((i) => {
                                                const { score } = getPasswordStrength(formData.password);
                                                return (
                                                    <div
                                                        key={i}
                                                        className={`h-1 flex-1 rounded-full transition-colors ${i <= score
                                                            ? score <= 2
                                                                ? 'bg-red-500'
                                                                : score <= 4
                                                                    ? 'bg-yellow-500'
                                                                    : 'bg-green-500'
                                                            : 'bg-zinc-700'
                                                            }`}
                                                    />
                                                );
                                            })}
                                        </div>
                                        <p className={`text-xs ${getPasswordStrength(formData.password).strength === 'weak' ? 'text-red-400' :
                                            getPasswordStrength(formData.password).strength === 'medium' ? 'text-yellow-400' :
                                                'text-green-400'
                                            }`}>
                                            {getPasswordStrength(formData.password).strength === 'weak' && 'Weak password'}
                                            {getPasswordStrength(formData.password).strength === 'medium' && 'Medium strength'}
                                            {getPasswordStrength(formData.password).strength === 'strong' && 'Strong password'}
                                        </p>
                                    </div>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="confirmPassword" className="text-zinc-300">Confirm</Label>
                                <div className="relative">
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        onBlur={() => handleBlur("confirmPassword")}
                                        disabled={isLoading}
                                        required
                                        className={`h-11 bg-zinc-800/50 border-zinc-700/50 text-white placeholder:text-zinc-500 focus:border-indigo-500 focus:ring-indigo-500/20 transition-all duration-200 ${touched.confirmPassword && errors.confirmPassword ? 'border-red-500 focus:border-red-500' : ''
                                            } ${touched.confirmPassword && !errors.confirmPassword && formData.confirmPassword ? 'border-green-500/50' : ''}`}
                                    />
                                    {touched.confirmPassword && !errors.confirmPassword && formData.confirmPassword && (
                                        <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
                                    )}
                                </div>
                                {touched.confirmPassword && errors.confirmPassword && (
                                    <p className="text-xs text-red-400 flex items-center gap-1">
                                        <XCircle className="h-3 w-3" /> {errors.confirmPassword}
                                    </p>
                                )}
                            </div>
                        </div>

                        <Button
                            className="w-full h-11 bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-all duration-200 shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Create Account
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col gap-4 border-t border-zinc-800/50 pt-6">
                    <div className="text-sm text-zinc-400 text-center w-full">
                        Already have an account?{" "}
                        <Link
                            aria-label="Sign in"
                            href="/login"
                            className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors hover:underline underline-offset-4"
                        >
                            Sign in
                        </Link>
                    </div>
                </CardFooter>
            </Card>

            <Dialog open={showOtpModal} onOpenChange={setShowOtpModal}>
                <DialogContent className="sm:max-w-md bg-zinc-900 border-zinc-800 text-white">
                    <DialogHeader>
                        <DialogTitle>Verify Email Address</DialogTitle>
                        <DialogDescription className="text-zinc-400">
                            Enter the 6-digit code sent to {formData.email}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col items-center justify-center space-y-4 py-4">
                        <InputOTP
                            maxLength={6}
                            value={otp}
                            onChange={(value) => setOtp(value)}
                            disabled={isLoading}
                        >
                            <InputOTPGroup>
                                <InputOTPSlot index={0} className="border-zinc-700 bg-zinc-800 text-white" />
                                <InputOTPSlot index={1} className="border-zinc-700 bg-zinc-800 text-white" />
                                <InputOTPSlot index={2} className="border-zinc-700 bg-zinc-800 text-white" />
                                <InputOTPSlot index={3} className="border-zinc-700 bg-zinc-800 text-white" />
                                <InputOTPSlot index={4} className="border-zinc-700 bg-zinc-800 text-white" />
                                <InputOTPSlot index={5} className="border-zinc-700 bg-zinc-800 text-white" />
                            </InputOTPGroup>
                        </InputOTP>

                        <div className="flex flex-col gap-2 w-full">
                            <Button
                                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white"
                                onClick={handleVerifyOtp}
                                disabled={isLoading || otp.length !== 6}
                            >
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Verify & Complete Signup
                            </Button>

                            <ResendOtpButton
                                email={formData.email}
                                onResend={sendEmailOTP}
                            />
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
