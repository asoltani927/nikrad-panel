"use client";

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react";
import { sendOtp as sendOtpAction } from "../actions/post-otp.action";
import { verifyOtp as verifyOtpAction } from "../actions/post-verify.action";
import { fetchUserInfo } from "../actions/fetch-user-info.action";
import { logoutUser } from "@/actions/logout.action";

interface User {
    id: string;
    fullName: string;
    username: string;
    telephoneNumbers: {
        value?: string,
        targets: string[],
    }[];
}

interface AuthContextType {
    user: User | null;
    isLoggedIn: boolean;   // 👈 add this

    loading: boolean;
    error: string | null;
    success: boolean;
    sendOtp: (phone: string) => Promise<boolean>;
    verifyOtp: (phone: string, code: string) => Promise<boolean>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    // Send OTP
    const sendOtp = useCallback(async (phone: string) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const res = await sendOtpAction({ phone });

            if (!res.success) {
                throw new Error(res.message || "Failed to send OTP");
            }

            setSuccess(true);
            return true;
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Unexpected error sending OTP");
            return false;
        } finally {
            setLoading(false);
        }
    }, []);

    // Verify OTP & fetch user info
    const verifyOtp = useCallback(async (phone: string, code: string) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const res = await verifyOtpAction({ phone, code, type: "login" });
            if (!res.success) {
                throw new Error(res.message || "OTP verification failed");
            }
            // Fetch user info after successful OTP
            const userInfo = await fetchUserInfo();
            setUser(userInfo);
            setSuccess(true);

            return true;
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Unexpected error verifying OTP");
            return false;
        } finally {
            setLoading(false);
        }
    }, []);

    const logout = useCallback(async () => {
        try {
            await logoutUser();        // clear cookie
        } catch (err) {
            console.error(err);
        } finally {
            setUser(null);             // clear state
            setSuccess(false);
            setError(null);
        }
    }, []);

    // inside AuthProvider, after your useState declarations
    useEffect(() => {
        let isMounted = true; // avoid state updates if unmounted

        const initializeUser = async () => {
            setLoading(true);
            try {
                const userInfo = await fetchUserInfo(); // fetches from backend using cookie
                console.log(userInfo)
                if (isMounted && userInfo) {
                    setUser(userInfo);
                    setSuccess(true);
                }
            } catch (err: unknown) {
                if (isMounted) {
                    setError(err instanceof Error ? err.message : "Failed to fetch user");
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        initializeUser();

        return () => {
            isMounted = false;
        };
    }, []);

    const isLoggedIn = !!user;

    return (
        <AuthContext.Provider
            value={{ user, isLoggedIn, loading, error, success, sendOtp, verifyOtp, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
}

// Hook to use auth context
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
}
