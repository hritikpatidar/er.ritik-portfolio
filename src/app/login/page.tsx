"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Mail, Lock } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();

    const [step, setStep] = useState<"login" | "otp">("login");
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);

    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    const handleSendOtp = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setStep("otp");
    };

    const handleOtpChange = (value: string, index: number) => {
        if (!/^[0-9]?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 overflow-hidden px-6">

            {/* Background Glow Effects */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-400 opacity-20 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-400 opacity-20 rounded-full blur-3xl" />

            {/* Back Button */}
            <motion.button
                whileHover={{ x: -4 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/")}
                className="absolute top-6 left-6 px-4 py-2 cursor-pointer rounded-full bg-white/40 text-gray-800 dark:text-gray-200 dark:bg-gray-800/50 backdrop-blur-lg border border-gray-300 dark:border-gray-700 shadow-md text-sm font-medium hover:text-blue-600 transition"
            >
                ← Back
            </motion.button>

            {/* Card */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative w-full max-w-md backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 border border-white/30 dark:border-gray-700 rounded-3xl shadow-2xl p-10"
            >
                <AnimatePresence mode="wait">

                    {/* LOGIN */}
                    {step === "login" && (
                        <motion.div
                            key="login"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                        >
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                Welcome Back
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-8">
                                Enter your email or phone to continue
                            </p>

                            <form onSubmit={handleSendOtp} className="space-y-6">

                                {/* Input with icon */}
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Email or Phone"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 rounded-xl text-gray-800 dark:text-gray-200 bg-white/80 dark:bg-gray-800/80 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                    />
                                </div>

                                <motion.button
                                    whileTap={{ scale: 0.96 }}
                                    whileHover={{ scale: 1.02 }}
                                    type="submit"
                                    className="w-full bg-gradient-to-r cursor-pointer from-blue-600 to-purple-600 hover:opacity-90 text-white py-3 rounded-xl font-medium shadow-lg transition"
                                >
                                    Send OTP
                                </motion.button>
                            </form>
                        </motion.div>
                    )}

                    {/* OTP */}
                    {step === "otp" && (
                        <motion.div
                            key="otp"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center"
                        >
                            <Lock className="mx-auto mb-4 text-blue-600" size={32} />

                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                Verify OTP
                            </h2>

                            <p className="text-gray-600 dark:text-gray-400 mb-8">
                                Code sent to <br />
                                <span className="text-blue-600 font-medium">{email}</span>
                            </p>

                            <div className="flex justify-center mb-8">
                                <div className="grid grid-cols-6 gap-2 sm:gap-3 w-full max-w-xs sm:max-w-sm">
                                    {otp.map((digit, index) => (
                                        <input
                                            key={index}
                                            ref={(el: any) => (inputsRef.current[index] = el)}
                                            maxLength={1}
                                            value={digit}
                                            inputMode="numeric"
                                            pattern="[0-9]*"
                                            onChange={(e) => handleOtpChange(e.target.value, index)}
                                            onKeyDown={(e) => handleKeyDown(e, index)}
                                            className="
                                            aspect-square
                                            w-full
                                            text-center
                                            text-lg sm:text-xl
                                            font-bold
                                            rounded-xl
                                            bg-white/80 dark:bg-gray-800/80
                                            border border-gray-300 dark:border-gray-700
                                            text-gray-900 dark:text-white
                                            focus:ring-2 focus:ring-blue-500
                                            outline-none
                                            transition
                                            "
                                        />
                                    ))}
                                </div>
                            </div>


                            <motion.button
                                whileTap={{ scale: 0.96 }}
                                whileHover={{ scale: 1.02 }}
                                className="w-full bg-gradient-to-r cursor-pointer from-blue-600 to-purple-600 hover:opacity-90 text-white py-3 rounded-xl font-medium shadow-lg transition"
                                onClick={() => router.push("/dashboard")}
                            >
                                Verify & Login
                            </motion.button>

                            <button
                                onClick={() => setStep("login")}
                                className="mt-4 text-sm text-blue-600 hover:underline cursor-pointer"
                            >
                                Change Email / Phone
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
