export const products = [
  // ── Electronics (4) ──────────────────────────────────────────────
  {
    id: "prod_001",
    name: "Premium Wireless Headphones",
    slug: "premium-wireless-headphones",
    category: "electronics",
    price: 249.99,
    originalPrice: 299.99,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&q=80",
      "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=600&q=80"
    ],
    rating: 4.8,
    reviewCount: 312,
    description:
      "Immerse yourself in studio-quality sound with these premium wireless headphones. Featuring advanced active noise cancellation, 40mm custom drivers, and up to 30 hours of battery life. The plush memory-foam ear cushions and adjustable headband ensure all-day comfort whether you're commuting, working, or relaxing.",
    features: [
      "Active Noise Cancellation with Transparency mode",
      "30-hour battery life with quick charge",
      "Bluetooth 5.3 with multipoint connection",
      "Built-in microphone for crystal-clear calls",
    ],
    sizes: [],
    colors: ["Matte Black", "Silver", "Midnight Blue"],
    inStock: true,
    badge: "Sale",
    createdAt: "2026-01-10",
  },
  {
    id: "prod_002",
    name: "Ultra-Slim 4K Monitor 27\"",
    slug: "ultra-slim-4k-monitor-27",
    category: "electronics",
    price: 599.99,
    originalPrice: null,
    images: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&q=80",
      "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=600&q=80",
      "https://images.unsplash.com/photo-1616763355548-1b11cea010b9?w=600&q=80"
    ],
    rating: 4.6,
    reviewCount: 187,
    description:
      "Elevate your workspace with this stunning 27-inch 4K UHD monitor. The near-borderless IPS display delivers vivid, true-to-life colors with 99% sRGB coverage, while the ergonomic stand offers tilt, swivel, and height adjustment. Perfect for creative professionals and productivity enthusiasts alike.",
    features: [
      "3840 x 2160 UHD resolution at 60Hz",
      "IPS panel with 99% sRGB color accuracy",
      "USB-C with 65W Power Delivery",
      "Built-in KVM switch for dual-PC setups",
    ],
    sizes: [],
    colors: ["Black", "White"],
    inStock: true,
    badge: "Bestseller",
    createdAt: "2025-11-20",
  },
  {
    id: "prod_003",
    name: "Compact Bluetooth Speaker",
    slug: "compact-bluetooth-speaker",
    category: "electronics",
    price: 79.99,
    originalPrice: null,
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80",
      "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=600&q=80",
      "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=600&q=80"
    ],
    rating: 4.4,
    reviewCount: 543,
    description:
      "Take your music anywhere with this rugged, waterproof Bluetooth speaker. Despite its compact size, it delivers surprisingly powerful 360-degree sound with deep bass. The IP67 rating means it can handle rain, dust, mud, and even full submersion, making it the perfect outdoor companion.",
    features: [
      "IP67 waterproof and dustproof rating",
      "12-hour continuous playback",
      "Stereo pairing for immersive sound",
      "Built-in carabiner clip for easy attachment",
    ],
    sizes: [],
    colors: ["Black", "Olive Green", "Coral Red"],
    inStock: true,
    badge: null,
    createdAt: "2026-02-05",
  },
  {
    id: "prod_004",
    name: "Smart Home Hub Pro",
    slug: "smart-home-hub-pro",
    category: "electronics",
    price: 149.99,
    originalPrice: 179.99,
    images: [
      "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=600&q=80",
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&q=80",
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80"
    ],
    rating: 4.2,
    reviewCount: 98,
    description:
      "Centralize your smart home with the Hub Pro. Compatible with Zigbee, Z-Wave, Thread, and Matter devices, it unifies all your smart gadgets into one intuitive app. The built-in voice assistant responds to natural language commands, and the 7-inch touchscreen lets you control everything at a glance.",
    features: [
      "Supports Zigbee, Z-Wave, Thread, and Matter",
      "7-inch HD touchscreen display",
      "Built-in voice assistant",
      "Automated routines and scene control",
    ],
    sizes: [],
    colors: ["Charcoal", "White"],
    inStock: true,
    badge: "Sale",
    createdAt: "2026-01-28",
  },

  // ── Clothing (4) ─────────────────────────────────────────────────
  {
    id: "prod_005",
    name: "Classic Fit Oxford Shirt",
    slug: "classic-fit-oxford-shirt",
    category: "clothing",
    price: 59.99,
    originalPrice: null,
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80",
      "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=600&q=80"
    ],
    rating: 4.5,
    reviewCount: 276,
    description:
      "A timeless wardrobe essential crafted from premium brushed cotton oxford cloth. The classic fit offers a relaxed yet refined silhouette, while the button-down collar keeps things polished without a tie. Pre-washed for softness from day one.",
    features: [
      "100% premium brushed cotton oxford",
      "Button-down collar",
      "Chest pocket with embroidered logo",
      "Machine washable, wrinkle-resistant",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Light Blue", "Pink", "Navy"],
    inStock: true,
    badge: "Bestseller",
    createdAt: "2025-12-01",
  },
  {
    id: "prod_006",
    name: "Women's Fleece-Lined Parka",
    slug: "womens-fleece-lined-parka",
    category: "clothing",
    price: 189.99,
    originalPrice: 239.99,
    images: [
      "https://images.unsplash.com/photo-1544923246-77307dd270b5?w=600&q=80",
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&q=80",
      "https://images.unsplash.com/photo-1515191107209-c28698631303?w=600&q=80"
    ],
    rating: 4.7,
    reviewCount: 164,
    description:
      "Stay warm through the harshest winters with this fleece-lined parka. The water-resistant outer shell shields against rain and snow, while the thick fleece interior and insulated hood trap body heat. Multiple zippered pockets keep your essentials secure and accessible.",
    features: [
      "Water-resistant polyester shell",
      "Full fleece lining with insulated hood",
      "Adjustable drawstring waist",
      "YKK heavy-duty zippers throughout",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Forest Green", "Charcoal", "Burgundy"],
    inStock: true,
    badge: "Sale",
    createdAt: "2026-01-05",
  },
  {
    id: "prod_007",
    name: "Stretch Performance Joggers",
    slug: "stretch-performance-joggers",
    category: "clothing",
    price: 49.99,
    originalPrice: null,
    images: [
      "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&q=80",
      "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80"
    ],
    rating: 4.3,
    reviewCount: 421,
    description:
      "From the gym to the couch, these performance joggers move with you. The four-way stretch fabric is moisture-wicking and breathable, while the tapered leg and ribbed cuffs give a clean, modern look. Deep side pockets and a hidden zip pocket keep your phone and keys secure.",
    features: [
      "Four-way stretch moisture-wicking fabric",
      "Elastic waistband with internal drawcord",
      "Tapered leg with ribbed ankle cuffs",
      "Hidden zippered back pocket",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Heather Grey", "Navy"],
    inStock: true,
    badge: null,
    createdAt: "2026-02-12",
  },
  {
    id: "prod_008",
    name: "Organic Cotton Graphic Tee",
    slug: "organic-cotton-graphic-tee",
    category: "clothing",
    price: 29.99,
    originalPrice: null,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80"
    ],
    rating: 4.1,
    reviewCount: 89,
    description:
      "Express your style sustainably with this graphic tee made from 100% GOTS-certified organic cotton. The relaxed unisex fit flatters every body type, and the water-based ink print is soft to the touch and built to last wash after wash.",
    features: [
      "100% GOTS-certified organic cotton",
      "Water-based eco-friendly print",
      "Relaxed unisex fit",
      "Reinforced shoulder seams",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["White", "Black", "Sand"],
    inStock: true,
    badge: "New",
    createdAt: "2026-03-01",
  },

  // ── Accessories (4) ──────────────────────────────────────────────
  {
    id: "prod_009",
    name: "Leather Minimalist Wallet",
    slug: "leather-minimalist-wallet",
    category: "accessories",
    price: 44.99,
    originalPrice: null,
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&q=80",
      "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=600&q=80",
      "https://images.unsplash.com/photo-1612902456551-404b5b2e90ef?w=600&q=80"
    ],
    rating: 4.9,
    reviewCount: 638,
    description:
      "Slim down your everyday carry with this handcrafted minimalist wallet. Made from full-grain Italian leather that develops a beautiful patina over time, it holds up to 8 cards plus folded cash without the bulk. RFID-blocking technology keeps your information safe.",
    features: [
      "Full-grain Italian leather construction",
      "RFID-blocking card slots",
      "Holds up to 8 cards plus cash",
      "Slim profile fits front pocket comfortably",
    ],
    sizes: [],
    colors: ["Tan", "Dark Brown", "Black"],
    inStock: true,
    badge: "Bestseller",
    createdAt: "2025-10-15",
  },
  {
    id: "prod_010",
    name: "Polarized Aviator Sunglasses",
    slug: "polarized-aviator-sunglasses",
    category: "accessories",
    price: 89.99,
    originalPrice: 119.99,
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80",
      "https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=600&q=80"
    ],
    rating: 4.6,
    reviewCount: 215,
    description:
      "Classic aviator style meets modern lens technology. These polarized sunglasses eliminate harsh glare while providing 100% UV400 protection. The lightweight titanium frame is both durable and comfortable for all-day wear, and spring-loaded hinges ensure a perfect fit.",
    features: [
      "Polarized lenses with 100% UV400 protection",
      "Lightweight titanium frame",
      "Spring-loaded hinges for adjustable fit",
      "Includes hard-shell carrying case and microfiber cloth",
    ],
    sizes: [],
    colors: ["Gold/Green", "Silver/Blue", "Black/Grey"],
    inStock: true,
    badge: "Sale",
    createdAt: "2026-02-18",
  },
  {
    id: "prod_011",
    name: "Canvas Weekender Duffle Bag",
    slug: "canvas-weekender-duffle-bag",
    category: "accessories",
    price: 119.99,
    originalPrice: null,
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80",
      "https://images.unsplash.com/photo-1622560480654-d96214fdc887?w=600&q=80"
    ],
    rating: 4.5,
    reviewCount: 173,
    description:
      "The perfect companion for weekend getaways and short trips. This spacious duffle is crafted from heavy-duty waxed canvas with genuine leather handles and trim. The shoe compartment keeps footwear separate, and the padded laptop sleeve adds versatility for business travel.",
    features: [
      "Heavy-duty waxed canvas with leather accents",
      "Separate ventilated shoe compartment",
      "Padded interior laptop sleeve (fits up to 15\")",
      "Detachable, adjustable shoulder strap",
    ],
    sizes: [],
    colors: ["Olive", "Charcoal", "Navy"],
    inStock: true,
    badge: null,
    createdAt: "2026-01-22",
  },
  {
    id: "prod_012",
    name: "Automatic Dive Watch",
    slug: "automatic-dive-watch",
    category: "accessories",
    price: 349.99,
    originalPrice: null,
    images: [
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&q=80",
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=80",
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=600&q=80"
    ],
    rating: 4.7,
    reviewCount: 92,
    description:
      "A serious dive watch for everyday adventurers. The Japanese automatic movement keeps precise time without a battery, while the 200m water resistance and unidirectional ceramic bezel meet professional diving standards. The sapphire crystal face is virtually scratch-proof.",
    features: [
      "Japanese automatic movement (no battery needed)",
      "200m water resistance with screw-down crown",
      "Scratch-resistant sapphire crystal",
      "Unidirectional ceramic bezel with luminous markers",
    ],
    sizes: [],
    colors: ["Black", "Navy Blue", "Forest Green"],
    inStock: true,
    badge: "New",
    createdAt: "2026-03-05",
  },

  // ── Home & Garden (4) ────────────────────────────────────────────
  {
    id: "prod_013",
    name: "Handwoven Jute Area Rug",
    slug: "handwoven-jute-area-rug",
    category: "home",
    price: 159.99,
    originalPrice: 199.99,
    images: [
      "https://images.unsplash.com/photo-1600166898405-da9535204843?w=600&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80",
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=600&q=80"
    ],
    rating: 4.4,
    reviewCount: 201,
    description:
      "Add warmth and natural texture to any room with this handwoven jute area rug. Each piece is crafted by skilled artisans using sustainably harvested jute fibers. The chunky braided pattern adds visual depth, and the natural rubber backing prevents slipping on hard floors.",
    features: [
      "Handwoven from sustainably harvested jute",
      "Natural rubber non-slip backing",
      "Available in 5x7 and 8x10 dimensions",
      "Spot clean with mild detergent",
    ],
    sizes: [],
    colors: ["Natural", "Grey Wash", "Bleached White"],
    inStock: true,
    badge: "Sale",
    createdAt: "2026-01-08",
  },
  {
    id: "prod_014",
    name: "Ceramic Pour-Over Coffee Set",
    slug: "ceramic-pour-over-coffee-set",
    category: "home",
    price: 54.99,
    originalPrice: null,
    images: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80",
      "https://images.unsplash.com/photo-1517256064527-7e0b01c11635?w=600&q=80",
      "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&q=80"
    ],
    rating: 4.8,
    reviewCount: 347,
    description:
      "Brew barista-quality coffee at home with this elegant ceramic pour-over set. Includes a hand-thrown ceramic dripper, borosilicate glass carafe, and 100 unbleached paper filters. The slow-drip design extracts maximum flavor for a smooth, rich cup every time.",
    features: [
      "Hand-thrown ceramic dripper with spiral ridges",
      "Heat-resistant borosilicate glass carafe (600ml)",
      "Includes 100 unbleached paper filters",
      "Dishwasher safe",
    ],
    sizes: [],
    colors: ["Matte White", "Speckled Grey", "Terracotta"],
    inStock: true,
    badge: "Bestseller",
    createdAt: "2025-11-10",
  },
  {
    id: "prod_015",
    name: "Indoor Herb Garden Kit",
    slug: "indoor-herb-garden-kit",
    category: "home",
    price: 39.99,
    originalPrice: null,
    images: [
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80",
      "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=600&q=80",
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&q=80"
    ],
    rating: 4.3,
    reviewCount: 156,
    description:
      "Grow fresh basil, cilantro, and mint right on your kitchen counter. This self-watering herb garden kit includes three bamboo pots with a connected reservoir, organic seed pods, and nutrient-rich growing medium. The integrated LED grow light ensures healthy growth even in low-light kitchens.",
    features: [
      "Self-watering system with visual water level indicator",
      "Integrated full-spectrum LED grow light",
      "Includes 3 organic seed pods (basil, cilantro, mint)",
      "Bamboo pots with modern matte finish",
    ],
    sizes: [],
    colors: ["White", "Black"],
    inStock: true,
    badge: "New",
    createdAt: "2026-02-28",
  },
  {
    id: "prod_016",
    name: "Linen Blend Throw Blanket",
    slug: "linen-blend-throw-blanket",
    category: "home",
    price: 79.99,
    originalPrice: null,
    images: [
      "https://images.unsplash.com/photo-1580301762395-21ce5da20d5c?w=600&q=80",
      "https://images.unsplash.com/photo-1616627547584-bf28cee262db?w=600&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80"
    ],
    rating: 4.6,
    reviewCount: 118,
    description:
      "Drape this luxurious linen-cotton blend throw over your sofa or bed for an instant style upgrade. The breathable weave keeps you comfortable in every season — cool in summer, cozy in winter. Finished with hand-knotted fringe for a relaxed, lived-in look.",
    features: [
      "55% linen, 45% cotton blend",
      "Breathable four-season weave",
      "Hand-knotted fringe detail",
      "Generous 50\" x 70\" dimensions",
    ],
    sizes: [],
    colors: ["Oatmeal", "Dusty Rose", "Slate Blue", "Sage Green"],
    inStock: true,
    badge: null,
    createdAt: "2026-01-18",
  },

  // ── Sports & Outdoors (4) ────────────────────────────────────────
  {
    id: "prod_017",
    name: "Trail Running Shoes",
    slug: "trail-running-shoes",
    category: "sports",
    price: 134.99,
    originalPrice: null,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80",
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=600&q=80"
    ],
    rating: 4.7,
    reviewCount: 289,
    description:
      "Conquer any terrain with these high-performance trail running shoes. The Vibram Megagrip outsole delivers unmatched traction on wet rocks and loose gravel, while the responsive midsole cushions every stride. A reinforced toe cap and rock plate protect your feet from sharp obstacles.",
    features: [
      "Vibram Megagrip outsole for superior traction",
      "Responsive EVA midsole with rock plate",
      "Reinforced toe cap and heel counter",
      "Quick-lace system with lace garage",
    ],
    sizes: ["7", "8", "9", "10", "11", "12", "13"],
    colors: ["Black/Lime", "Grey/Orange", "Navy/Teal"],
    inStock: true,
    badge: "Bestseller",
    createdAt: "2025-12-15",
  },
  {
    id: "prod_018",
    name: "Insulated Stainless Steel Water Bottle",
    slug: "insulated-stainless-steel-water-bottle",
    category: "sports",
    price: 34.99,
    originalPrice: 44.99,
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&q=80",
      "https://images.unsplash.com/photo-1570831739435-6601aa3fa4fb?w=600&q=80",
      "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=600&q=80"
    ],
    rating: 4.5,
    reviewCount: 782,
    description:
      "Keep drinks ice-cold for 24 hours or piping hot for 12 with this double-wall vacuum insulated water bottle. The 32oz capacity is perfect for long hikes and gym sessions. The wide mouth accommodates ice cubes, and the leak-proof lid has a convenient carry loop.",
    features: [
      "Double-wall vacuum insulation",
      "18/8 food-grade stainless steel",
      "Wide-mouth opening fits ice cubes",
      "Leak-proof lid with carry loop",
    ],
    sizes: [],
    colors: ["Matte Black", "Alpine White", "Ocean Blue", "Sage"],
    inStock: true,
    badge: "Sale",
    createdAt: "2026-02-01",
  },
  {
    id: "prod_019",
    name: "Yoga Mat with Alignment Lines",
    slug: "yoga-mat-with-alignment-lines",
    category: "sports",
    price: 68.99,
    originalPrice: null,
    images: [
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&q=80",
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80",
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80"
    ],
    rating: 4.4,
    reviewCount: 203,
    description:
      "Refine your practice with this premium yoga mat featuring laser-etched alignment lines. The 6mm natural rubber base provides excellent cushioning for joints, while the polyurethane top layer grips harder the more you sweat. Non-toxic, PVC-free, and biodegradable.",
    features: [
      "Laser-etched alignment guide system",
      "Natural rubber base with PU top layer",
      "6mm thickness for joint protection",
      "Non-toxic, PVC-free, and biodegradable",
    ],
    sizes: [],
    colors: ["Midnight Purple", "Forest Green", "Charcoal"],
    inStock: true,
    badge: null,
    createdAt: "2026-01-25",
  },
  {
    id: "prod_020",
    name: "Ultralight Camping Hammock",
    slug: "ultralight-camping-hammock",
    category: "sports",
    price: 59.99,
    originalPrice: null,
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80",
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=80",
      "https://images.unsplash.com/photo-1478827536114-da961b7f86d2?w=600&q=80"
    ],
    rating: 4.6,
    reviewCount: 167,
    description:
      "Weighing just 12 ounces, this ultralight hammock packs down to the size of a softball yet supports up to 400 pounds. The ripstop parachute nylon is breathable and quick-drying, and the included tree-friendly straps make setup a 60-second affair. Perfect for backpacking, beach days, or your backyard.",
    features: [
      "Ultra-lightweight at just 12 oz packed",
      "Supports up to 400 lbs",
      "Ripstop parachute nylon, quick-drying",
      "Includes tree-friendly suspension straps and carabiners",
    ],
    sizes: [],
    colors: ["Sky Blue/Grey", "Orange/Charcoal", "Forest Green/Tan"],
    inStock: true,
    badge: "New",
    createdAt: "2026-03-08",
  },
];

export default products;
// Also available as named export
