import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Package,
  MapPin,
  Settings,
  Mail,
  Phone,
  Bell,
  Smartphone,
  MessageSquare,
  Trash2,
  Plus,
  Edit3,
  AlertTriangle,
} from 'lucide-react';
import { cn } from '../utils/cn';
import { setPageSEO } from '../utils/seo';
import OrderHistory from '../components/account/OrderHistory';

const TABS = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'orders', label: 'Orders', icon: Package },
  { id: 'addresses', label: 'Addresses', icon: MapPin },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const MOCK_USER = {
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  phone: '+1 (555) 987-6543',
};

const MOCK_ADDRESSES = [
  {
    id: 'addr_1',
    label: 'Home',
    name: 'Alex Johnson',
    street: '123 Main Street, Apt 4B',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    country: 'United States',
    isDefault: true,
  },
  {
    id: 'addr_2',
    label: 'Office',
    name: 'Alex Johnson',
    street: '456 Corporate Blvd, Suite 800',
    city: 'Brooklyn',
    state: 'NY',
    zip: '11201',
    country: 'United States',
    isDefault: false,
  },
];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState(MOCK_USER);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
  });
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  useEffect(() => {
    setPageSEO({
      title: 'My Account',
      description: 'Manage your LUXE account, view orders, update addresses, and more.',
      canonical: 'https://luxestore.com/account',
    });
  }, []);

  const updateProfile = (field, value) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleNotification = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // ── Tab content renderer ───────────────────────────────────────
  const renderTabContent = () => {
    switch (activeTab) {
      // ── Profile ─────────────────────────────────────────────────
      case 'profile':
        return (
          <motion.div
            key="profile"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* User info card */}
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-full bg-bg-secondary flex items-center justify-center">
                <span className="font-display text-2xl font-bold text-text-muted">
                  {profileData.name
                    .split(' ')
                    .map((w) => w[0])
                    .join('')
                    .toUpperCase()}
                </span>
              </div>
              <div>
                <h2 className="font-display text-xl font-semibold">
                  {profileData.name}
                </h2>
                <p className="text-sm text-text-secondary font-body">
                  {profileData.email}
                </p>
              </div>
            </div>

            {/* Edit profile form */}
            <div className="border border-border rounded-xl p-6 space-y-5">
              <h3 className="font-display text-lg font-semibold">Edit Profile</h3>

              <div>
                <label className="block text-sm font-body font-medium text-text-secondary mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
                  />
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => updateProfile('name', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-white text-sm font-body focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-body font-medium text-text-secondary mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
                  />
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => updateProfile('email', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-white text-sm font-body focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-body font-medium text-text-secondary mb-1.5">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
                  />
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => updateProfile('phone', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-white text-sm font-body focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
              </div>

              <button className="bg-primary text-white px-6 py-3 rounded-lg font-body font-medium text-sm hover:opacity-90 transition-opacity">
                Save Changes
              </button>
            </div>
          </motion.div>
        );

      // ── Orders ──────────────────────────────────────────────────
      case 'orders':
        return (
          <motion.div
            key="orders"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <OrderHistory />
          </motion.div>
        );

      // ── Addresses ───────────────────────────────────────────────
      case 'addresses':
        return (
          <motion.div
            key="addresses"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold">
                Saved Addresses
              </h2>
              <button className="flex items-center gap-2 text-sm font-body font-medium text-accent hover:underline">
                <Plus size={16} />
                Add New Address
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {MOCK_ADDRESSES.map((address) => (
                <div
                  key={address.id}
                  className={cn(
                    'border rounded-xl p-5 relative',
                    address.isDefault ? 'border-accent' : 'border-border'
                  )}
                >
                  {address.isDefault && (
                    <span className="absolute top-3 right-3 text-xs font-mono font-medium text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                      Default
                    </span>
                  )}
                  <h3 className="font-body font-semibold text-sm mb-2">
                    {address.label}
                  </h3>
                  <div className="text-sm text-text-secondary font-body space-y-0.5">
                    <p>{address.name}</p>
                    <p>{address.street}</p>
                    <p>
                      {address.city}, {address.state} {address.zip}
                    </p>
                    <p>{address.country}</p>
                  </div>
                  <div className="flex items-center gap-3 mt-4 pt-3 border-t border-border">
                    <button className="flex items-center gap-1.5 text-xs font-body text-text-secondary hover:text-primary transition-colors">
                      <Edit3 size={13} />
                      Edit
                    </button>
                    <button className="flex items-center gap-1.5 text-xs font-body text-text-secondary hover:text-error transition-colors">
                      <Trash2 size={13} />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );

      // ── Settings ────────────────────────────────────────────────
      case 'settings':
        return (
          <motion.div
            key="settings"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Notification preferences */}
            <div className="border border-border rounded-xl p-6 space-y-5">
              <h3 className="font-display text-lg font-semibold">
                Notification Preferences
              </h3>

              {[
                {
                  key: 'email',
                  label: 'Email Notifications',
                  description: 'Receive order updates and promotions via email',
                  icon: Mail,
                },
                {
                  key: 'sms',
                  label: 'SMS Notifications',
                  description: 'Get text alerts for shipping and delivery',
                  icon: Smartphone,
                },
                {
                  key: 'push',
                  label: 'Push Notifications',
                  description: 'Browser notifications for flash sales and restocks',
                  icon: Bell,
                },
              ].map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between py-2"
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={18} className="text-text-muted" />
                    <div>
                      <p className="text-sm font-body font-medium text-primary">
                        {item.label}
                      </p>
                      <p className="text-xs text-text-muted font-body">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleNotification(item.key)}
                    className={cn(
                      'relative w-11 h-6 rounded-full transition-colors',
                      notifications[item.key] ? 'bg-accent' : 'bg-border'
                    )}
                    aria-label={`Toggle ${item.label}`}
                  >
                    <motion.div
                      layout
                      className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm"
                      style={{
                        left: notifications[item.key] ? '22px' : '2px',
                      }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  </button>
                </div>
              ))}
            </div>

            {/* Change password */}
            <div className="border border-border rounded-xl p-6 space-y-5">
              <h3 className="font-display text-lg font-semibold">
                Change Password
              </h3>

              <div>
                <label className="block text-sm font-body font-medium text-text-secondary mb-1.5">
                  Current Password
                </label>
                <input
                  type="password"
                  value={passwords.current}
                  onChange={(e) =>
                    setPasswords((prev) => ({ ...prev, current: e.target.value }))
                  }
                  placeholder="Enter current password"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-white text-sm font-body focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-body font-medium text-text-secondary mb-1.5">
                  New Password
                </label>
                <input
                  type="password"
                  value={passwords.new}
                  onChange={(e) =>
                    setPasswords((prev) => ({ ...prev, new: e.target.value }))
                  }
                  placeholder="Enter new password"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-white text-sm font-body focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-body font-medium text-text-secondary mb-1.5">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={passwords.confirm}
                  onChange={(e) =>
                    setPasswords((prev) => ({ ...prev, confirm: e.target.value }))
                  }
                  placeholder="Confirm new password"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-white text-sm font-body focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              <button className="bg-primary text-white px-6 py-3 rounded-lg font-body font-medium text-sm hover:opacity-90 transition-opacity">
                Update Password
              </button>
            </div>

            {/* Delete account */}
            <div className="border border-error/30 rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-2">
                <AlertTriangle size={18} className="text-error" />
                <h3 className="font-display text-lg font-semibold text-error">
                  Danger Zone
                </h3>
              </div>
              <p className="text-sm text-text-secondary font-body">
                Once you delete your account, there is no going back. All your
                data, order history, and saved addresses will be permanently
                removed.
              </p>
              <button className="border border-error text-error px-6 py-3 rounded-lg font-body font-medium text-sm hover:bg-error hover:text-white transition-colors">
                Delete Account
              </button>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="font-display text-3xl mb-8">My Account</h1>

        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8">
          {/* ── Tab navigation ───────────────────────────────────── */}
          <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-body font-medium whitespace-nowrap transition-colors',
                    activeTab === tab.id
                      ? 'bg-primary text-white'
                      : 'text-text-secondary hover:bg-bg-secondary hover:text-primary'
                  )}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* ── Tab content ──────────────────────────────────────── */}
          <div className="min-w-0">
            <AnimatePresence mode="wait">{renderTabContent()}</AnimatePresence>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
