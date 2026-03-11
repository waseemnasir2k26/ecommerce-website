import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react';
import { cn } from '../../utils/cn';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginForm({ onSubmit }) {
  const [form, setForm] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear field error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    setSubmitError('');
  };

  const validate = () => {
    const newErrors = {};

    if (!form.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!EMAIL_REGEX.test(form.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!form.password) {
      newErrors.password = 'Password is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitSuccess('');

    if (!validate()) return;

    setLoading(true);
    try {
      if (onSubmit) {
        await onSubmit(form);
      }
      setSubmitSuccess('Login successful! Redirecting...');
    } catch (err) {
      setSubmitError(
        err?.message || 'Invalid email or password. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="bg-white rounded-2xl border border-border p-8">
        <div className="text-center mb-8">
          <h2 className="font-display text-2xl font-bold text-primary">
            Welcome Back
          </h2>
          <p className="font-body text-sm text-text-secondary mt-2">
            Sign in to your account to continue
          </p>
        </div>

        {/* Error banner */}
        {submitError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 p-3 mb-6 rounded-lg bg-error/10 border border-error/20"
          >
            <AlertCircle size={16} className="text-error shrink-0" />
            <p className="font-body text-sm text-error">{submitError}</p>
          </motion.div>
        )}

        {/* Success banner */}
        {submitSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 p-3 mb-6 rounded-lg bg-green-50 border border-green-200"
          >
            <p className="font-body text-sm text-green-700">{submitSuccess}</p>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="font-body text-sm font-medium text-primary">
              Email
            </label>
            <div className="relative">
              <Mail
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={cn(
                  'w-full font-body rounded-lg pl-11 pr-4 py-3 border bg-white text-primary',
                  'placeholder:text-text-muted outline-none transition-all duration-200',
                  errors.email
                    ? 'border-error focus:border-error focus:ring-2 focus:ring-error/20'
                    : 'border-border focus:border-accent focus:ring-2 focus:ring-accent/20'
                )}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-error font-body">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label className="font-body text-sm font-medium text-primary">
              Password
            </label>
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
              />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={cn(
                  'w-full font-body rounded-lg pl-11 pr-11 py-3 border bg-white text-primary',
                  'placeholder:text-text-muted outline-none transition-all duration-200',
                  errors.password
                    ? 'border-error focus:border-error focus:ring-2 focus:ring-error/20'
                    : 'border-border focus:border-accent focus:ring-2 focus:ring-accent/20'
                )}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-error font-body">{errors.password}</p>
            )}
          </div>

          {/* Remember me + Forgot password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="rememberMe"
                checked={form.rememberMe}
                onChange={handleChange}
                className="w-4 h-4 rounded border-border text-accent focus:ring-accent/20 cursor-pointer"
              />
              <span className="font-body text-sm text-text-secondary">
                Remember me
              </span>
            </label>
            <Link
              to="/account/forgot-password"
              className="font-body text-sm text-accent hover:text-accent-dark transition-colors"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={cn(
              'w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg',
              'font-body font-medium text-sm transition-all duration-200',
              'bg-primary text-white hover:bg-primary-light',
              loading && 'opacity-50 cursor-not-allowed'
            )}
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <svg
                  className="animate-spin h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Signing in...
              </span>
            ) : (
              <>
                <LogIn size={16} />
                Login
              </>
            )}
          </button>
        </form>

        {/* Register link */}
        <p className="font-body text-sm text-text-secondary text-center mt-6">
          Don't have an account?{' '}
          <Link
            to="/account/register"
            className="text-accent hover:text-accent-dark font-medium transition-colors"
          >
            Register
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
