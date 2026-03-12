import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { cn } from '../../utils/cn';

// ─── Chat logic: rule-based intent matching ───────────────────────────────────

const INTENTS = [
  {
    name: 'greeting',
    keywords: ['hi', 'hello', 'hey', 'help', 'hola', 'howdy', 'sup'],
    response:
      "Hi! \u{1F44B} I'm the LUXE Assistant. I can help you find products, place orders, and answer questions. What can I help you with?",
    hasQuickActions: true,
  },
  {
    name: 'product_count',
    keywords: [
      'how many products',
      'what do you sell',
      'product count',
      'what products',
      'browse products',
      'catalog',
      'inventory',
      'what do you have',
    ],
    response:
      'We currently have 20 premium products across 5 categories: Electronics (4), Clothing (4), Accessories (4), Home & Garden (4), and Sports & Outdoors (4). Browse our full catalog at /shop!',
  },
  {
    name: 'how_to_order',
    keywords: [
      'how to order',
      'how to buy',
      'place order',
      'purchase',
      'ordering',
      'how do i order',
      'how do i buy',
      'checkout process',
    ],
    response:
      "Here's how to order from LUXE:\n\n1. Browse products at /shop\n2. Select your preferred size/color\n3. Add to cart\n4. Click checkout\n5. Enter your shipping info\n6. Complete payment\n\nFree shipping on orders over $75!",
  },
  {
    name: 'shipping',
    keywords: [
      'shipping',
      'delivery',
      'how long',
      'when arrive',
      'ship',
      'deliver',
      'tracking',
      'transit',
    ],
    response:
      'We offer free shipping on orders over $75! Standard delivery takes 3-5 business days. Express delivery (2-day) is available at checkout for an additional fee. You\'ll receive a tracking number via email once your order ships.',
  },
  {
    name: 'returns',
    keywords: [
      'return',
      'refund',
      'exchange',
      'money back',
      'send back',
      'return policy',
    ],
    response:
      "We have a hassle-free 30-day return policy. Simply contact us and we'll provide a prepaid shipping label. Full refund within 5-7 business days after we receive your item. Exchanges are also available!",
  },
  {
    name: 'electronics',
    keywords: ['electronics', 'tech', 'gadget', 'device', 'audio', 'speaker'],
    response:
      'Our Electronics collection features 4 premium products including cutting-edge audio, displays, and smart home devices. Check them out at /shop/electronics!',
  },
  {
    name: 'clothing',
    keywords: [
      'clothing',
      'clothes',
      'shirt',
      'pants',
      'jacket',
      'fashion',
      'wear',
      'apparel',
    ],
    response:
      'Our Clothing collection has 4 curated essentials with quality fabrics and timeless designs. Browse the latest at /shop/clothing!',
  },
  {
    name: 'accessories',
    keywords: [
      'accessories',
      'accessory',
      'watch',
      'wallet',
      'bag',
      'sunglasses',
      'jewelry',
    ],
    response:
      'Our Accessories collection includes 4 handcrafted items \u2014 wallets, watches, bags, and sunglasses built to last. Explore them at /shop/accessories!',
  },
  {
    name: 'home',
    keywords: [
      'home',
      'garden',
      'decor',
      'kitchen',
      'furniture',
      'plant',
      'indoor',
    ],
    response:
      'Our Home & Garden collection has 4 artisan-crafted products including decor, kitchen essentials, and indoor garden kits. Transform your space at /shop/home!',
  },
  {
    name: 'sports',
    keywords: [
      'sports',
      'outdoors',
      'fitness',
      'yoga',
      'camping',
      'hiking',
      'adventure',
      'exercise',
      'gym',
    ],
    response:
      'Our Sports & Outdoors collection features 4 trail-tested products \u2014 footwear, hydration gear, yoga essentials, and ultralight camping gear. Gear up at /shop/sports!',
  },
  {
    name: 'deals',
    keywords: [
      'sale',
      'discount',
      'deals',
      'price',
      'cheap',
      'affordable',
      'coupon',
      'promo',
      'offer',
    ],
    response:
      'Check out our sale items with up to 40% off! Visit /collections for curated deals. Use code WELCOME for 10% off your first order.',
  },
  {
    name: 'contact',
    keywords: [
      'contact',
      'talk to human',
      'support',
      'phone',
      'email',
      'agent',
      'representative',
      'real person',
    ],
    response:
      "You can reach our team at /contact, email support@luxestore.com, or call 1-800-LUXE. We're available 24/7!",
  },
  {
    name: 'payment',
    keywords: [
      'payment',
      'pay',
      'credit card',
      'paypal',
      'apple pay',
      'google pay',
      'visa',
      'mastercard',
    ],
    response:
      'We accept all major credit cards, PayPal, Apple Pay, and Google Pay. All transactions are secured with 256-bit SSL encryption.',
  },
  {
    name: 'sizing',
    keywords: [
      'size',
      'sizing',
      'fit',
      'what size',
      'size guide',
      'measurements',
      'too small',
      'too big',
    ],
    response:
      "We recommend checking the size guide on each product page. If you're between sizes, we suggest going one size up. Free returns if it doesn't fit!",
  },
];

const QUICK_ACTIONS = [
  { label: 'Browse Products', action: 'how many products' },
  { label: 'How to Order', action: 'how to order' },
  { label: 'Shipping Info', action: 'shipping' },
  { label: 'Returns & Refunds', action: 'return policy' },
];

const DEFAULT_RESPONSE = {
  text: "I'm not sure I understood that. Here are some things I can help with:",
  hasQuickActions: true,
};

function matchIntent(input) {
  const lower = input.toLowerCase().trim();

  for (const intent of INTENTS) {
    for (const keyword of intent.keywords) {
      if (lower.includes(keyword)) {
        return intent;
      }
    }
  }

  return null;
}

function createMessage(sender, text, quickActions = null) {
  return {
    id: Date.now() + Math.random(),
    sender,
    text,
    timestamp: new Date(),
    quickActions,
  };
}

// ─── Typing indicator component ───────────────────────────────────────────────

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 mb-3">
      <div className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
        <Sparkles size={14} className="text-accent" />
      </div>
      <div className="bg-bg-secondary rounded-2xl rounded-bl-md px-4 py-3">
        <div className="flex gap-1.5 items-center h-4">
          <span className="w-2 h-2 rounded-full bg-text-muted animate-bounce [animation-delay:0ms]" />
          <span className="w-2 h-2 rounded-full bg-text-muted animate-bounce [animation-delay:150ms]" />
          <span className="w-2 h-2 rounded-full bg-text-muted animate-bounce [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}

// ─── Single message bubble ────────────────────────────────────────────────────

function MessageBubble({ message, onQuickAction }) {
  const isBot = message.sender === 'bot';
  const timeStr = message.timestamp.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className={cn('flex items-end gap-2 mb-3', !isBot && 'flex-row-reverse')}>
      {isBot && (
        <div className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
          <Sparkles size={14} className="text-accent" />
        </div>
      )}
      <div className="flex flex-col gap-1 max-w-[80%]">
        <div
          className={cn(
            'rounded-2xl px-4 py-2.5 font-body text-sm leading-relaxed whitespace-pre-line',
            isBot
              ? 'bg-bg-secondary text-primary rounded-bl-md'
              : 'bg-accent text-white rounded-br-md'
          )}
        >
          {message.text}
        </div>

        {message.quickActions && (
          <div className="flex flex-wrap gap-1.5 mt-1">
            {message.quickActions.map((qa) => (
              <button
                key={qa.label}
                onClick={() => onQuickAction(qa.action)}
                className={cn(
                  'px-3 py-1.5 rounded-full text-xs font-body font-medium',
                  'bg-white border border-border text-primary',
                  'hover:border-accent hover:text-accent transition-all duration-200',
                  'cursor-pointer'
                )}
              >
                {qa.label}
              </button>
            ))}
          </div>
        )}

        <span
          className={cn(
            'font-mono text-[10px] text-text-muted',
            !isBot && 'text-right'
          )}
        >
          {timeStr}
        </span>
      </div>
    </div>
  );
}

// ─── Main ChatWidget component ────────────────────────────────────────────────

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showPulse, setShowPulse] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [hasGreeted, setHasGreeted] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to the bottom when new messages arrive
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  // Stop pulse animation after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowPulse(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  // Initial greeting after 2 seconds (once per session via localStorage)
  useEffect(() => {
    const alreadyGreeted = localStorage.getItem('luxe_chat_greeted');
    if (alreadyGreeted) {
      setHasGreeted(true);
      return;
    }

    const timer = setTimeout(() => {
      const welcomeMsg = createMessage(
        'bot',
        "Hi! \u{1F44B} I'm the LUXE Assistant. I can help you find products, place orders, and answer questions. What can I help you with?",
        QUICK_ACTIONS
      );
      setMessages([welcomeMsg]);
      setUnreadCount(1);
      setHasGreeted(true);
      localStorage.setItem('luxe_chat_greeted', 'true');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // On open, load greeting if returning visitor
  useEffect(() => {
    if (isOpen && hasGreeted && messages.length === 0) {
      const welcomeMsg = createMessage(
        'bot',
        "Welcome back! \u{1F44B} I'm the LUXE Assistant. How can I help you today?",
        QUICK_ACTIONS
      );
      setMessages([welcomeMsg]);
    }
  }, [isOpen, hasGreeted, messages.length]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Bot response logic
  const getBotResponse = useCallback((userText) => {
    const intent = matchIntent(userText);

    if (intent) {
      return createMessage(
        'bot',
        intent.response,
        intent.hasQuickActions ? QUICK_ACTIONS : null
      );
    }

    return createMessage('bot', DEFAULT_RESPONSE.text, QUICK_ACTIONS);
  }, []);

  const sendMessage = useCallback(
    (text) => {
      if (!text.trim()) return;

      const userMsg = createMessage('user', text.trim());
      setMessages((prev) => [...prev, userMsg]);
      setInputValue('');
      setIsTyping(true);

      // Simulate a thinking delay (600-1200ms)
      const delay = 600 + Math.random() * 600;
      setTimeout(() => {
        const botMsg = getBotResponse(text);
        setMessages((prev) => [...prev, botMsg]);
        setIsTyping(false);
        if (!isOpen) {
          setUnreadCount((prev) => prev + 1);
        }
      }, delay);
    },
    [getBotResponse, isOpen]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const handleQuickAction = (action) => {
    sendMessage(action);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  // ─── Framer Motion variants ───────────────────────────────────────────────

  const panelVariants = {
    hidden: {
      opacity: 0,
      scale: 0.75,
      y: 20,
      transformOrigin: 'bottom right',
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transformOrigin: 'bottom right',
      transition: { type: 'spring', damping: 25, stiffness: 350 },
    },
    exit: {
      opacity: 0,
      scale: 0.75,
      y: 20,
      transformOrigin: 'bottom right',
      transition: { duration: 0.2 },
    },
  };

  return (
    <>
      {/* ── Chat panel ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn(
              'fixed z-[45] flex flex-col',
              'bg-white border border-border rounded-2xl shadow-2xl overflow-hidden',
              // Desktop
              'bottom-6 right-6 w-[380px] h-[520px]',
              // Mobile: full screen
              'max-sm:inset-0 max-sm:w-full max-sm:h-full max-sm:rounded-none max-sm:bottom-0 max-sm:right-0'
            )}
          >
            {/* Header */}
            <div className="bg-accent px-5 py-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                  <Sparkles size={18} className="text-white" />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-white leading-tight">
                    LUXE Assistant
                  </h3>
                  <p className="font-body text-[11px] text-white/70">
                    Online &bull; Typically replies instantly
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10 cursor-pointer"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto px-4 py-4 bg-bg">
              {messages.map((msg) => (
                <MessageBubble
                  key={msg.id}
                  message={msg}
                  onQuickAction={handleQuickAction}
                />
              ))}
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <form
              onSubmit={handleSubmit}
              className="flex-shrink-0 border-t border-border bg-white px-4 py-3 flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                className={cn(
                  'flex-1 font-body text-sm text-primary placeholder:text-text-muted',
                  'bg-bg-secondary rounded-xl px-4 py-2.5',
                  'border border-transparent focus:border-accent/30 focus:ring-0',
                  'outline-none transition-all duration-200'
                )}
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className={cn(
                  'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0',
                  'transition-all duration-200 cursor-pointer',
                  inputValue.trim()
                    ? 'bg-accent text-white hover:bg-accent-dark'
                    : 'bg-bg-secondary text-text-muted'
                )}
                aria-label="Send message"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating button ────────────────────────────────────────────────── */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            onClick={() => setIsOpen(true)}
            className={cn(
              'fixed bottom-6 right-6 z-[45]',
              'w-14 h-14 rounded-full',
              'bg-accent hover:bg-accent-dark',
              'flex items-center justify-center',
              'shadow-lg hover:shadow-xl',
              'transition-colors duration-200 cursor-pointer'
            )}
            aria-label="Open chat"
          >
            {/* Pulse ring */}
            {showPulse && (
              <span className="absolute inset-0 rounded-full bg-accent/40 animate-ping" />
            )}

            <MessageCircle size={24} className="text-white relative z-10" />

            {/* Unread badge */}
            {unreadCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={cn(
                  'absolute -top-1 -right-1 z-20',
                  'w-5 h-5 rounded-full',
                  'bg-error text-white',
                  'font-mono text-[10px] font-bold',
                  'flex items-center justify-center'
                )}
              >
                {unreadCount}
              </motion.span>
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
