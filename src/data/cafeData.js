export const CAFE_INFO = {
  name: 'Kissa & Kaapi',
  subtitle: 'Roastery · Bakehouse · Kitchen',
  established: 'Est. 2019 · Indiranagar',
  address: '14, 12th Main Road, HAL 2nd Stage, Indiranagar, Bengaluru 560038',
  shortAddress: '14, 12th Main, Indiranagar',
  phone: '+91 80 4123 0948',
  email: 'hello@kissaandkaapi.in',
  instagram: '@kissaandkaapi',
  coordinates: '12.9716° N, 77.6412° E',
  hours: [
    { days: 'Tue — Fri', time: '07:30 — 21:30' },
    { days: 'Sat — Sun', time: '08:00 — 22:30' },
    { days: 'Monday', time: 'Closed (Roasting Day)' },
  ],
};

const inrFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

export function formatINR(amount) {
  return inrFormatter.format(amount);
}

export const MENU_CATEGORIES = [
  'All',
  'Coffee',
  'Fast Food',
  'Desserts',
  'Beverages',
  'Special Dishes',
];

export const MENU_ITEMS = [
  // COFFEE (Affordable Indian Specialty Cafe Pricing: ₹120–₹180)
  {
    id: 'coffee-pourover',
    name: 'Chikmagalur Single-Estate V60',
    category: 'Coffee',
    meta: 'BABA BUDANGIRI · WASHED · 1,450M',
    description:
      'Hand-poured Chikmagalur arabica with bright notes of sweet mandarin, jasmine blossom, and toasted almond.',
    price: 180,
    image: '/images/coffee-pourover.jpg',
    alt: 'Single-origin filter pour-over coffee in a handblown glass server beside a ceramic tasting cup',
    tags: ['V', 'GF', 'House Roast'],
    featured: true,
  },
  {
    id: 'coffee-cortado',
    name: 'House Cortado / Filter Kaapi Blend',
    category: 'Coffee',
    meta: 'DOUBLE RISTRETTO · 120ML · A2 OR OAT',
    description:
      'Equal parts silky microfoam and our medium-roast Coorg & Chikmagalur espresso—jaggery caramel and dark cacao.',
    price: 150,
    image: '/images/coffee-cortado.jpg',
    alt: 'Cortado in a speckled stoneware cup with delicate microfoam beside a linen napkin and brass spoon',
    tags: ['V', 'GF'],
    featured: false,
  },
  {
    id: 'coffee-espresso',
    name: 'Double Estate Espresso',
    category: 'Coffee',
    meta: 'RATNAGIRI ESTATE · 38G OUT',
    description:
      'Pulled on our spring-lever machine and served on an aged brass tray with chilled sparkling water.',
    price: 120,
    image: '/images/coffee-espresso.jpg',
    alt: 'Double espresso in a ribbed ceramic demitasse with sparkling water on an aged brass tray',
    tags: ['V', 'GF', 'House Roast'],
    featured: false,
  },

  // FAST FOOD (Affordable Everyday Pricing: ₹210–₹240)
  {
    id: 'fastfood-toastie',
    name: 'Three-Cheese Masala Sourdough Toastie',
    category: 'Fast Food',
    meta: '48H LEVAIN · AGED CHEDDAR · CHILLI-THYME',
    description:
      'Thick-cut country sourdough pressed golden in cultured butter with aged cheddar, caramelized onions, green chilli relish, and cornichons.',
    price: 240,
    image: '/images/fastfood-toastie.jpg',
    alt: 'Halved toasted sourdough melt with aged cheddar and caramelized shallots next to cornichons',
    tags: ['V'],
    featured: true,
  },
  {
    id: 'fastfood-brioche',
    name: 'Spiced Egg & Cheddar Brioche Bun',
    category: 'Fast Food',
    meta: 'TOASTED SESAME BRIOCHE · SOFT EGGS',
    description:
      'House-baked sesame brioche layered with soft-folded pepper eggs, melted aged cheese, crisp arugula, and roasted garlic chutney.',
    price: 210,
    image: '/images/fastfood-brioche.jpg',
    alt: 'Toasted sesame brioche sandwich with folded organic eggs, melted cheese, and arugula',
    tags: ['V'],
    featured: false,
  },

  // DESSERTS (Affordable Bakery Pricing: ₹160–₹230)
  {
    id: 'dessert-basque',
    name: 'Burnt Jaggery Basque Cheesecake',
    category: 'Desserts',
    meta: 'PALM JAGGERY · ROASTED FIG COMPOTE',
    description:
      'Deeply caramelized crust giving way to a custardy cream-cheese center kissed with organic jaggery and spiced fig compote.',
    price: 230,
    image: '/images/dessert-basque.jpg',
    alt: 'Slice of burnt Basque cheesecake with caramelized top and fig compote on handmade stoneware',
    tags: ['V', 'GF'],
    featured: true,
  },
  {
    id: 'dessert-croissant',
    name: 'Cardamom Knot & Butter Croissant',
    category: 'Desserts',
    meta: 'IDUKKI GREEN CARDAMOM · BAKED 06:30',
    description:
      'Freshly crushed Idukki green cardamom braided into soft brioche dough alongside our flaky cultured-butter croissant.',
    price: 160,
    image: '/images/dessert-croissant.jpg',
    alt: 'Braided cardamom bun and flaky butter croissant on crinkled parchment paper',
    tags: ['V'],
    featured: false,
  },

  // BEVERAGES (Affordable Refreshers: ₹190–₹220)
  {
    id: 'beverage-matcha',
    name: 'Iced Ceremonial Matcha Latte',
    category: 'Beverages',
    meta: 'FIRST-HARVEST MATCHA · OAT OR ALMOND',
    description:
      'Hand-whisked shade-grown matcha poured over clear ice and chilled oat milk with zero refined sugar.',
    price: 220,
    image: '/images/beverage-matcha.jpg',
    alt: 'Tall ribbed glass of iced ceremonial matcha latte swirling into oat milk over ice',
    tags: ['V', 'GF'],
    featured: true,
  },
  {
    id: 'beverage-tonic',
    name: 'Kokum & Blood Orange Espresso Tonic',
    category: 'Beverages',
    meta: 'CHIKMAGALUR ESPRESSO · TONIC · ROSEMARY',
    description:
      'Bright estate espresso floated over crisp botanical tonic water, subtle kokum-citrus reduction, dehydrated orange, and rosemary.',
    price: 190,
    image: '/images/beverage-tonic.jpg',
    alt: 'Layered iced espresso tonic with blood orange slice and rosemary sprig on travertine bar',
    tags: ['V', 'GF'],
    featured: true,
  },

  // SPECIAL DISHES (Approachable All-Day Plates: ₹280–₹490)
  {
    id: 'special-tartine',
    name: 'Whipped Ricotta & Heirloom Tartine',
    category: 'Special Dishes',
    meta: 'STONE-MILLED KHAPPLI RYE · LEMON · BASIL',
    description:
      'Charred country levain spread thick with house lemon ricotta, blistered heirloom tomatoes, cold-pressed oil, and flaky sea salt.',
    price: 280,
    image: '/images/special-tartine.jpg',
    alt: 'Sourdough tartine topped with whipped lemon ricotta, blistered tomatoes, and micro basil',
    tags: ['V', 'Chef Plate'],
    featured: true,
  },
  {
    id: 'special-tasting-flight',
    name: 'Morning Baker’s Table Set',
    category: 'Special Dishes',
    meta: 'POUR-OVER + CARDAMOM KNOT + TARTINE',
    description:
      'Our everyday morning ritual for one: a Chikmagalur V60 carafe paired with warm cardamom viennoiserie and seasonal tartine.',
    price: 490,
    image: '/images/hero-pour.jpg',
    alt: 'Barista hand-pouring V60 filter coffee over a glass server on the travertine bar',
    tags: ['V', 'House Ritual'],
    featured: false,
  },
];

export const FEATURED_SLIDES = [
  {
    id: 'slide-1',
    kicker: 'Monsoon Harvest · Lot 04',
    title: 'Chikmagalur Single-Estate V60',
    caption: 'Roasted every Monday morning in small 12kg batches for floral clarity and sweet finish.',
    image: '/images/coffee-pourover.jpg',
    alt: 'Single-origin filter pour-over coffee in a handblown glass server',
    menuItemId: 'coffee-pourover',
  },
  {
    id: 'slide-2',
    kicker: 'From the Stone Oven',
    title: 'Whipped Ricotta & Heirloom Tartine',
    caption: 'Naturally leavened 48-hour sourdough milled from heritage Indian khappli wheat.',
    image: '/images/special-tartine.jpg',
    alt: 'Country sourdough tartine with whipped ricotta and heirloom tomatoes',
    menuItemId: 'special-tartine',
  },
  {
    id: 'slide-3',
    kicker: 'Afternoon Cooler',
    title: 'Kokum & Blood Orange Espresso Tonic',
    caption: 'Crisp quinine botanicals, tangy coastal citrus, and bright estate espresso over ice.',
    image: '/images/beverage-tonic.jpg',
    alt: 'Iced blood orange espresso tonic with rosemary sprig',
    menuItemId: 'beverage-tonic',
  },
  {
    id: 'slide-4',
    kicker: 'Patisserie Counter',
    title: 'Burnt Jaggery Basque Cheesecake',
    caption: 'Baked high at 230°C for a smoky caramelized top and silky palm-jaggery custard center.',
    image: '/images/dessert-basque.jpg',
    alt: 'Slice of burnt Basque cheesecake with fig compote',
    menuItemId: 'dessert-basque',
  },
];

export const GALLERY_ITEMS = [
  {
    id: 'gal-1',
    title: 'The Main Room in Morning Sun',
    category: 'Interior',
    caption: 'Teak & white oak communal table, limewashed walls, and steel-framed windows.',
    image: '/images/interior-sunlight.jpg',
    alt: 'Sunlit minimalist cafe interior with oak communal table and cane chairs',
    span: 'tall',
  },
  {
    id: 'gal-2',
    title: 'Hand-Poured Filter Ritual',
    category: 'Coffee Bar',
    caption: 'Brewed to order at 93°C on our travertine brew bar.',
    image: '/images/hero-pour.jpg',
    alt: 'Barista pouring water from a black gooseneck kettle into a ribbed ceramic V60',
    span: 'wide',
  },
  {
    id: 'gal-3',
    title: 'Limestone Courtyard',
    category: 'Interior',
    caption: 'Twelve quiet garden patio seats beneath climbing jasmine.',
    image: '/images/gallery-courtyard.jpg',
    alt: 'Sun-dappled cafe courtyard patio with bistro tables and climbing jasmine',
    span: 'standard',
  },
  {
    id: 'gal-4',
    title: '06:30 Viennoiserie Pull',
    category: 'Kitchen & Pastry',
    caption: 'Idukki cardamom knots and laminated croissants straight from the deck oven.',
    image: '/images/dessert-croissant.jpg',
    alt: 'Braided cardamom bun and butter croissant on parchment paper',
    span: 'standard',
  },
  {
    id: 'gal-5',
    title: 'Stoneware & Crema',
    category: 'Coffee Bar',
    caption: 'Hand-thrown speckled cups crafted by studio potters.',
    image: '/images/coffee-cortado.jpg',
    alt: 'Cortado in a speckled stoneware cup on travertine stone',
    span: 'standard',
  },
  {
    id: 'gal-6',
    title: 'All-Day Savory Plates',
    category: 'Kitchen & Pastry',
    caption: 'Masala sourdough toasties, soft-egg brioche, and seasonal market tartines.',
    image: '/images/fastfood-toastie.jpg',
    alt: 'Halved sourdough cheddar toastie with cornichons on stoneware',
    span: 'wide',
  },
  {
    id: 'gal-7',
    title: 'Single-Estate Glass Carafe',
    category: 'Coffee Bar',
    caption: 'Chikmagalur filter coffee poured slow for clean aromatic clarity.',
    image: '/images/coffee-pourover.jpg',
    alt: 'Handblown glass pour-over carafe with ceramic tasting cup on wooden tray',
    span: 'standard',
  },
  {
    id: 'gal-8',
    title: 'Afternoon Iced Matcha Bar',
    category: 'Coffee Bar',
    caption: 'First-harvest ceremonial matcha whisked cold over oat milk.',
    image: '/images/beverage-matcha.jpg',
    alt: 'Ribbed glass of iced matcha swirling into oat milk on travertine coaster',
    span: 'standard',
  },
  {
    id: 'gal-9',
    title: 'Brass Tray Espresso Service',
    category: 'Coffee Bar',
    caption: 'Double ristretto paired with chilled sparkling mineral water.',
    image: '/images/coffee-espresso.jpg',
    alt: 'Double espresso in ribbed ceramic cup beside sparkling water on brass tray',
    span: 'standard',
  },
  {
    id: 'gal-10',
    title: 'Burnt Jaggery Cheesecake',
    category: 'Kitchen & Pastry',
    caption: 'Plated daily with slow-simmered roasted fig compote.',
    image: '/images/dessert-basque.jpg',
    alt: 'Caramelized burnt Basque cheesecake slice on handmade stoneware plate',
    span: 'standard',
  },
  {
    id: 'gal-11',
    title: 'Sesame Brioche Breakfast',
    category: 'Kitchen & Pastry',
    caption: 'Warm house-baked buns folded with farm eggs and aged cheese.',
    image: '/images/fastfood-brioche.jpg',
    alt: 'Toasted sesame brioche sandwich with folded eggs and arugula on stoneware',
    span: 'standard',
  },
  {
    id: 'gal-12',
    title: 'Market Harvest Tartine',
    category: 'Interior',
    caption: 'Window-side seating bathed in afternoon sunlight with fresh kitchen plates.',
    image: '/images/special-tartine.jpg',
    alt: 'Heirloom tomato and whipped ricotta sourdough tartine in soft morning light',
    span: 'standard',
  },
];

export const TESTIMONIALS = [
  {
    id: 'rev-1',
    quote:
      '“The rare Bengaluru café where the Idukki cardamom lamination, the khappli sourdough, and the Chikmagalur pour-over receive equal care—and stay genuinely affordable.”',
    author: 'Meera Deshmukh',
    role: 'Editor, Deccan Table Notes',
  },
  {
    id: 'rev-2',
    quote:
      '“Their washed Baba Budangiri V60 tastes like sweet mandarin and monsoon rain. Warm teak tables, unhurried service, and an unforgettable jaggery Basque cheesecake.”',
    author: 'Rohan Kulkarni',
    role: 'Architectural Photographer',
  },
  {
    id: 'rev-3',
    quote:
      '“We drop by every Sunday morning for the masala sourdough melt and kokum espresso tonic. The limestone courtyard feels calm and welcoming for everyone.”',
    author: 'Ananya & Kabir Nair',
    role: 'Indiranagar Regulars',
  },
];

export const SEATING_OPTIONS = [
  { id: 'window', label: 'Window Counter', detail: 'Bright natural light, ideal for 1–2 guests' },
  { id: 'oak', label: 'Oak Communal Room', detail: 'Quiet main hall tables for 2–6 guests' },
  { id: 'courtyard', label: 'Limestone Courtyard', detail: 'Sheltered open-air garden seating' },
];

export const TIME_SLOTS = [
  '08:30',
  '09:30',
  '10:30',
  '12:00',
  '13:30',
  '15:00',
  '16:30',
  '19:00',
];
