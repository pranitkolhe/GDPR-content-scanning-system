import { useSignUp, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {

  const { isLoaded, signUp, setActive } = useSignUp();
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1=form, 2=otp
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [otpCode, setOtpCode] = useState("");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });

  // Redirect if already logged in
  useEffect(() => {
    if (isSignedIn) {
      navigate("/auth-redirect");
    }
  }, [isSignedIn, navigate]);

  // ─────────────────────────────────────────────
  // STEP 1 → CREATE ACCOUNT
  // ─────────────────────────────────────────────
  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!form.role) {
      setError("Please select a role");
      return;
    }

    if (!isLoaded) return;

    try {

      setLoading(true);
      setError("");

      // Create Clerk user
      await signUp.create({
        firstName: form.firstName,
        lastName: form.lastName,
        emailAddress: form.email,
        password: form.password,
      });

      // Send OTP
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setStep(2);

    } catch (err) {

      console.error(err);

      setError(
        err.errors?.[0]?.message ||
        "Registration failed"
      );

    } finally {
      setLoading(false);
    }
  };

  // ─────────────────────────────────────────────
  // STEP 2 → VERIFY OTP + SAVE ROLE
  // ─────────────────────────────────────────────
  const handleVerifyOtp = async (e) => {

    e.preventDefault();

    if (!isLoaded) return;

    try {

      setLoading(true);
      setError("");

      const result =
        await signUp.attemptEmailAddressVerification({
          code: otpCode,
        });

      if (result.status === "complete") {

        // Activate session
        await setActive({
          session: result.createdSessionId,
        });

        // Get Clerk user
        const clerkUser = window.Clerk?.user;

        if (!clerkUser) {
          setError("User not found");
          return;
        }

        // Save role in metadata
        await clerkUser.update({
          unsafeMetadata: {
            role: form.role,
          },
        });

        // Reload updated metadata
        await clerkUser.reload();

        console.log(
          "UPDATED USER:",
          clerkUser.unsafeMetadata
        );

        // Redirect by role
        if (form.role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/analyst-dashboard");
        }

      } else {
        setError("Verification failed");
      }

    } catch (err) {

      console.error(err);

      setError(
        err.errors?.[0]?.message ||
        "Invalid OTP"
      );

    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">

      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">

        <div className="absolute -top-20 -right-20 w-96 h-96 bg-purple-200 opacity-30 rounded-full blur-3xl" />

        <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-violet-300 opacity-20 rounded-full blur-3xl" />

        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(rgba(109,40,217,0.15) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />

      </div>

      <div className="relative z-10 w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">

          <div className="inline-flex items-center gap-2 mb-4">
            <span className="bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-md">
              GDPR
            </span>

            <span className="font-black text-xl text-slate-900">
              Scanner
            </span>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center justify-center gap-2 mb-4">

            {[1, 2].map((s) => (

              <div
                key={s}
                className="flex items-center gap-2"
              >

                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                    step === s
                      ? "bg-purple-600 text-white"
                      : step > s
                      ? "bg-green-500 text-white"
                      : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {step > s ? (
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    s
                  )}
                </div>

              </div>
            ))}

          </div>

          <h1 className="text-2xl font-black text-slate-900 tracking-tight">

            {step === 1 && "Create Account"}

            {step === 2 && "Verify Email"}

          </h1>

          <p className="text-slate-500 text-sm mt-1">

            {step === 1 &&
              "Fill in your details to register"}

            {step === 2 &&
              `OTP sent to ${form.email}`}

          </p>

        </div>

        {/* ───────────────────────────── */}
        {/* STEP 1 → REGISTER */}
        {/* ───────────────────────────── */}

        {step === 1 && (

          <div className="bg-white rounded-2xl border border-slate-100 shadow-xl p-6">

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              {/* First + Last Name */}
              <div className="grid grid-cols-2 gap-3">

                <div>

                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                    First Name
                  </label>

                  <input
                    className="border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400 p-2.5 rounded-xl w-full text-sm"
                    placeholder="First Name"
                    value={form.firstName}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        firstName: e.target.value,
                      })
                    }
                  />

                </div>

                <div>

                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                    Last Name
                  </label>

                  <input
                    className="border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400 p-2.5 rounded-xl w-full text-sm"
                    placeholder="Surname"
                    value={form.lastName}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        lastName: e.target.value,
                      })
                    }
                  />

                </div>

              </div>

              {/* Email */}
              <div>

                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                  Email Address
                </label>

                <input
                  type="email"
                  required
                  className="border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400 p-2.5 rounded-xl w-full text-sm"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value,
                    })
                  }
                />

              </div>

              {/* Password */}
              <div>

                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                  Password
                </label>

                <input
                  type="password"
                  required
                  className="border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400 p-2.5 rounded-xl w-full text-sm"
                  placeholder="Minimum 8 characters"
                  value={form.password}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      password: e.target.value,
                    })
                  }
                />

              </div>

              {/* Role Selection */}
              <div>

                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                  Select Role
                </label>

                <div className="grid grid-cols-2 gap-3">

                  {/* Admin */}
                  <button
                    type="button"
                    onClick={() =>
                      setForm({
                        ...form,
                        role: "admin",
                      })
                    }
                    className={`p-3 rounded-xl border-2 transition-all duration-200 text-left ${
                      form.role === "admin"
                        ? "border-purple-500 bg-purple-50"
                        : "border-slate-200 hover:border-purple-300"
                    }`}
                  >
                    <p className="text-xs font-black text-slate-900">
                      Admin
                    </p>

                    <p className="text-xs text-slate-400 mt-1">
                      Full access
                    </p>
                  </button>

                  {/* Analyst */}
                  <button
                    type="button"
                    onClick={() =>
                      setForm({
                        ...form,
                        role: "analyst",
                      })
                    }
                    className={`p-3 rounded-xl border-2 transition-all duration-200 text-left ${
                      form.role === "analyst"
                        ? "border-blue-500 bg-blue-50"
                        : "border-slate-200 hover:border-blue-300"
                    }`}
                  >
                    <p className="text-xs font-black text-slate-900">
                      Analyst
                    </p>

                    <p className="text-xs text-slate-400 mt-1">
                      View only
                    </p>
                  </button>

                </div>

              </div>

              {/* Error */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-xs font-medium px-3 py-2 rounded-xl">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading || !form.role}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all"
              >
                {loading
                  ? "Creating account..."
                  : "Continue →"}
              </button>

            </form>

          </div>
        )}

        {/* ───────────────────────────── */}
        {/* STEP 2 → OTP */}
        {/* ───────────────────────────── */}

        {step === 2 && (

          <div className="bg-white rounded-2xl border border-slate-100 shadow-xl p-6">

            <form
              onSubmit={handleVerifyOtp}
              className="space-y-4"
            >

              <div>

                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                  Enter OTP
                </label>

                <input
                  type="text"
                  maxLength={6}
                  required
                  className="border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400 p-3 rounded-xl w-full text-center text-xl font-black tracking-widest"
                  placeholder="000000"
                  value={otpCode}
                  onChange={(e) =>
                    setOtpCode(
                      e.target.value.replace(/\D/g, "")
                    )
                  }
                />

              </div>

              {/* Error */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-xs font-medium px-3 py-2 rounded-xl">
                  {error}
                </div>
              )}

              {/* Verify */}
              <button
                type="submit"
                disabled={loading || otpCode.length < 6}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all"
              >
                {loading
                  ? "Verifying..."
                  : "Verify OTP →"}
              </button>

            </form>

          </div>
        )}

      </div>

    </div>
  );
}