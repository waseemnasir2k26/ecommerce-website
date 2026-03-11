import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Eye, EyeOff, UserPlus, AlertCircle } from 'lucide-react';
import { cn } from '../../utils/cn';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RegisterForm({ onSubmit }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    setSubmitError('');
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = 'Name is required.';
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!EMAIL_REGEX.test(form.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!form.password) {
      newErrors.password = 'Password is required.';
    } else if (form.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters.';
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password.';
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    if (!form.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the Terms & Conditions.';
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
        await onSubmit({
          name: form.name,
          email: form.email,
          password: form.password,
        });
      }
      setSubmitSuccess('Account created successfully! Redirecting...');
    } catch (err) {
      setSubmitError(
        err?.message || 'Something went wrong. Please try again.'
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
            Create Account
          </h2>
          <p className="font-body text-sm text-text-secondary mt-2">
            Join us and start shopping today
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
          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label className="font-body text-sm font-medium text-primary">
              Full Name
            </label>
            <div className="relative">
              <User
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
              />
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                className={cn(
                  'w-full font-body rounded-lg pl-11 pr-4 py-3 border bg-white text-primary',
                  'placeholder:text-text-muted outline-none transition-all duration-200',
                  errors.name
                    ? 'border-error focus:border-error focus:ring-2 focus:ring-error/20'
                    : 'border-border focus:border-accent focus:ring-2 focus:ring-accent/20'
                )}
              />
            </div>
            {errors.name && (
              <p className="text-sm text-error font-body">{errors.name}</p>
            )}
          </div>

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
                placeholder="At least 8 characters"
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

          {/* Confirm Password */}
          <div className="flex flex-col gap-1.5">
            <label className="font-body text-sm font-medium text-primary">
              Confirm Password
            </label>
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
              />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                className={cn(
                  'w-full font-body rounded-lg pl-11 pr-11 py-3 border bg-white text-primary',
                  'placeholder:text-text-muted outline-none transition-all duration-200',
                  errors.confirmPassword
                    ? 'border-error focus:border-error focus:ring-2 focus:ring-error/20'
                    : 'border-border focus:border-accent focus:ring-2 focus:ring-accent/20'
                )}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary transition-colors"
                aria-label={
                  showConfirmPassword ? 'Hide password' : 'Show password'
                }
              >
                {showConfirmPassword ? (
                  <EyeOff size={16} />
                ) : (
                  <Eye size={16} />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-error font-body">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Terms checkbox */}
          <div className="flex flex-col gap-1.5">
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={form.agreeTerms}
                onChange={handleChange}
                className="w-4 h-4 mt-0.5 rounded border-border text-accent focus:ring-accent/20 cursor-pointer"
              />
              <span className="font-body text-sm text-text-secondary">
                I agree to the{' '}
                <Link
                  to="/terms"
                  className="text-accent hover:text-accent-dark transition-colors underline"
                >
                  Terms &amp; Conditions
                </Link>{' '}
                and{' '}
                <Link
                  to="/privacy"
                  className="text-accent hover:text-accent-dark transition-colors underline"
                >
                  Privacy Policy
                </Link>
              </span>
            </label>
            {errors.agreeTerms && (
              <p className="text-sm text-error font-body">
                {errors.agreeTerms}
              </p>
            )}
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
                Creating account...
              </span>
            ) : (
              <>
                <UserPlus size={16} />
                Create Account
              </>
            )}
          </button>
        </form>

        {/* Login link */}
        <p className="font-body text-sm text-text-secondary text-center mt-6">
          Already have an account?{' '}
          <Link
            to="/account/login"
            className="text-accent hover:text-accent-dark font-medium transition-colors"
          >
            Login
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
