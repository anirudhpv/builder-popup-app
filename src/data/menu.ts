export interface MenuItem {
  id: string;
  name: string;
  category: 'Hot Brew' | 'Cold Brew' | 'Sandwich' | 'Pancake' | 'Shareable Bites';
  isVeg: boolean;
  price: number;
  tagline: string;
  description: string;
  ingredients: string[];
  tasteProfile: {
    sweetness: number; // 1-5
    bitterness: number;
    spice: number;
    richness: number;
  };
  imagePrompt: string;
  suggestedPairing?: string;
  funFact?: string;
}

export const CAFE_MENU: MenuItem[] = [
  // --- HOT BREW ---
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    category: 'Hot Brew',
    isVeg: true,
    price: 180,
    tagline: 'Equal parts espresso, steamed milk & velvety microfoam',
    description: 'A classic Italian coffee brewed with a rich double shot of dark-roast espresso, balanced with sweet steamed whole milk and topped with a dense layer of microfoam dusting.',
    ingredients: ['Double Espresso Shot', 'Steamed Whole Milk', 'Velvety Milk Foam', 'Cocoa Dusting'],
    tasteProfile: { sweetness: 2, bitterness: 4, spice: 0, richness: 4 },
    imagePrompt: 'A close-up artisanal ceramic cup of hot cappuccino with intricate latte art on a wooden cafe table, soft morning sunlight, coffee beans scattered nearby, shallow depth of field, 8k resolution photo.',
    suggestedPairing: 'Classic Pancake',
    funFact: 'Named after the Capuchin friars because the color resembles their hooded robes.'
  },
  {
    id: 'signature-filter-coffee',
    name: 'Signature Filter Coffee',
    category: 'Hot Brew',
    isVeg: true,
    price: 140,
    tagline: 'Traditional South Indian brass dabara decoction brew',
    description: 'Slow-dripped chicory-blended coffee decoction brewed in traditional brass filters, hand-aerated and frothed with scalding creamy milk for an authentic South Indian kick.',
    ingredients: ['80/20 Plantation Arabica & Chicory Decoction', 'Full Cream Frothed Milk', 'Unrefined Sugar'],
    tasteProfile: { sweetness: 3, bitterness: 4, spice: 1, richness: 5 },
    imagePrompt: 'Traditional South Indian filter coffee served in a shining brass dabara and tumbler with thick froth on top, steaming hot, rich dark golden foam, authentic cafe setting.',
    suggestedPairing: 'Chilli Cheese Garlic Toast',
    funFact: 'The traditional "meter-pouring" between tumbler and dabara aerates the coffee to make it exceptionally creamy.'
  },
  {
    id: 'americano-espresso',
    name: 'Americano / Espresso',
    category: 'Hot Brew',
    isVeg: true,
    price: 150,
    tagline: 'Pure intense double shot or diluted over hot mineral water',
    description: 'Choose between a pure, concentrated 30ml extraction with thick hazelnut crema (Espresso) or pulled over hot water for a crisp, robust long black cup (Americano).',
    ingredients: ['100% Specialty Arabica Beans', 'Filtered Hot Water'],
    tasteProfile: { sweetness: 1, bitterness: 5, spice: 0, richness: 3 },
    imagePrompt: 'A shot of dark espresso in a clear glass cup with a golden-brown crema layer on top, set on a dark slate counter, minimalist studio lighting.',
    suggestedPairing: 'Chilli Cheese Garlic Toast',
    funFact: 'Americano was invented during WWII when US soldiers diluted Italian espresso to mimic American drip coffee.'
  },
  {
    id: 'masala-chai-latte',
    name: 'Masala Chai Latte',
    category: 'Hot Brew',
    isVeg: true,
    price: 160,
    tagline: 'Slow-simmered Assam CTC tea with crushed aromatic spices & microfoam',
    description: 'Rich Assam black tea slow-brewed with freshly crushed green cardamom, ginger, cinnamon, and black pepper, topped with silky steamed milk foam.',
    ingredients: ['Assam Black Tea Leaves', 'Crushed Fresh Ginger', 'Green Cardamom', 'Cinnamon Stick', 'Black Peppercorn', 'Steamed Milk'],
    tasteProfile: { sweetness: 3, bitterness: 2, spice: 4, richness: 4 },
    imagePrompt: 'Steaming glass mug of spiced masala chai latte topped with cinnamon foam, star anise and cinnamon sticks resting next to the cup on a rustic wooden table.',
    suggestedPairing: 'Paneer Tikka Sandwich',
    funFact: 'Chai spices were originally used in Ayurvedic medicine before British tea plantations took root in India.'
  },

  // --- COLD BREW ---
  {
    id: 'classic-cold-coffee',
    name: 'Classic Cold Coffee',
    category: 'Cold Brew',
    isVeg: true,
    price: 190,
    tagline: 'Creamy, frothy blended iced cafe frappe',
    description: 'A nostalgic Indian cafe staple: strong roasted coffee blended with chilled full-cream milk, crushed ice, and a hint of vanilla sweetness, topped with dark chocolate drizzle.',
    ingredients: ['Roasted Coffee Blend', 'Chilled Whole Milk', 'Vanilla Syrup', 'Crushed Ice', 'Dark Chocolate Drizzle'],
    tasteProfile: { sweetness: 4, bitterness: 2, spice: 0, richness: 5 },
    imagePrompt: 'Tall glass of rich frothy iced cold coffee with chocolate swirls inside the glass, topped with chocolate powder and coffee beans, refreshing condensation droplets on glass.',
    suggestedPairing: 'Chicken & Cheese Toasties',
    funFact: 'Bangalore cafes popularized the thick, milkshake-style cold coffee in the early 2000s.'
  },
  {
    id: 'classic-cold-brew',
    name: 'Classic Cold Brew',
    category: 'Cold Brew',
    isVeg: true,
    price: 210,
    tagline: '16-hour slow cold water extraction — ultra smooth & low acidity',
    description: 'Single-origin coarse coffee grounds steeped in cold filtered water for 16 hours. Naturally sweet, zero harsh bitterness, served over crystal-clear ice rocks.',
    ingredients: ['Coarse Single-Origin Arabica', 'Cold Triple-Filtered Water', 'Artisanal Clear Ice Cube'],
    tasteProfile: { sweetness: 2, bitterness: 3, spice: 0, richness: 2 },
    imagePrompt: 'Crystal whiskey tumbler filled with dark amber cold brew coffee and a single large clear sphere ice cube, citrus peel garnish, modern aesthetic.',
    suggestedPairing: 'Tandoori Chicken Sandwich',
    funFact: 'Cold brewing extracts up to 67% less acid than hot brewing, making it very gentle on the stomach.'
  },
  {
    id: 'classic-lemonade',
    name: 'Classic Lemonade',
    category: 'Cold Brew',
    isVeg: true,
    price: 130,
    tagline: 'Freshly squeezed lemon, muddled mint & sparkling soda',
    description: 'Hand-squeezed Lisbon lemons, muddled garden spearmint, rock salt, and sparkling soda or chilled spring water. The ultimate palate cleanser.',
    ingredients: ['Fresh Lemon Juice', 'Muddled Mint Leaves', 'Black Salt (Kala Namak)', 'Simple Syrup', 'Sparkling Soda'],
    tasteProfile: { sweetness: 3, bitterness: 1, spice: 1, richness: 1 },
    imagePrompt: 'A tall frosted glass of sparkling lemonade with floating lemon slices, fresh green mint sprigs, ice cubes, condensation on the glass, bright sunny cafe lighting.',
    suggestedPairing: 'Paneer Tikka Sandwich',
    funFact: 'A pinch of Indian black salt enhances citrus sweetness naturally without needing extra sugar.'
  },

  // --- SANDWICH ---
  {
    id: 'paneer-tikka-sandwich',
    name: 'Paneer Tikka Sandwich',
    category: 'Sandwich',
    isVeg: true,
    price: 220,
    tagline: 'Tandoori-spiced cottage cheese, mint chutney & crunchy bell peppers',
    description: 'Char-grilled cottage cheese cubes tossed in spicy tandoori marinade, layered with crunchy bell peppers, pickled onions, and spicy mint-coriander chutney inside grilled artisan sourdough.',
    ingredients: ['Grilled Malai Paneer', 'Tandoori Masala & Curd Marinade', 'Mint Chutney', 'Capsicum & Red Onion', 'Artisan Sourdough Bread'],
    tasteProfile: { sweetness: 1, bitterness: 1, spice: 4, richness: 4 },
    imagePrompt: 'A gourmet grilled paneer tikka sandwich cut in half, molten spiced cottage cheese and green bell peppers oozing out, toasted golden grill marks on sourdough, served with green chutney.',
    suggestedPairing: 'Classic Cold Brew',
    funFact: 'Paneer absorbs marinades best when kept at room temperature for 30 minutes before grilling.'
  },
  {
    id: 'tandoori-chicken-sandwich',
    name: 'Tandoori Chicken Sandwich',
    category: 'Sandwich',
    isVeg: false,
    price: 250,
    tagline: 'Smoky pulled tandoori chicken with spicy garlic aioli',
    description: 'Tender chicken breast roasted in a clay oven with Kashmiri red chillies and mustard oil, shredded and tossed in spicy garlic aioli on crispy toasted panini bread.',
    ingredients: ['Tandoor Roasted Chicken Breast', 'Kashmiri Red Chilli Marinade', 'Garlic Aioli', 'Pickled Onions', 'Panini Bread'],
    tasteProfile: { sweetness: 1, bitterness: 1, spice: 5, richness: 4 },
    imagePrompt: 'Toasted gourmet panini sandwich filled with juicy red tandoori shredded chicken, melted mozzarella, thinly sliced red onions, vibrant food photography, crisp golden crust.',
    suggestedPairing: 'Classic Cold Brew',
    funFact: 'The vibrant red color in authentic tandoori chicken comes from degi mirch, not food coloring.'
  },

  // --- PANCAKE ---
  {
    id: 'classic-pancake',
    name: 'Classic Pancake',
    category: 'Pancake',
    isVeg: true,
    price: 200,
    tagline: 'Triple golden fluffy buttermilk stack with maple syrup & salted butter',
    description: 'Three tall, cloud-fluffy buttermilk pancakes griddled to a golden crisp, crowned with a melting quenelle of French butter and a pitcher of pure amber maple syrup.',
    ingredients: ['Cultured Buttermilk Batter', 'Madagascar Vanilla Bean', 'Pure Maple Syrup', 'Cultured Salted Butter'],
    tasteProfile: { sweetness: 5, bitterness: 0, spice: 0, richness: 4 },
    imagePrompt: 'Stack of three thick, golden-brown fluffy pancakes with a melting pat of butter on top, warm maple syrup pouring down the sides in slow motion, dusting of powdered sugar, breakfast cafe aesthetic.',
    suggestedPairing: 'Cappuccino',
    funFact: 'Letting pancake batter rest for 15 minutes allows gluten to relax, creating maximum fluffiness.'
  },

  // --- SHAREABLE BITES ---
  {
    id: 'chilli-cheese-garlic-toast',
    name: 'Chilli Cheese Garlic Toast',
    category: 'Shareable Bites',
    isVeg: true,
    price: 190,
    tagline: 'Crusty baguette with roasted garlic butter, molten cheese & birds-eye chillies',
    description: 'Thick slices of French baguette smothered in roasted garlic-herb butter, blanketed in a molten blend of sharp English cheddar and mozzarella, topped with chopped spicy green chillies.',
    ingredients: ['Artisan French Baguette', 'Roasted Garlic Herb Butter', 'Sharp Cheddar & Mozzarella', 'Finely Chopped Green Chillies', 'Oregano & Chilli Flakes'],
    tasteProfile: { sweetness: 1, bitterness: 1, spice: 4, richness: 5 },
    imagePrompt: 'Four diagonal slices of crispy toasted garlic bread covered in bubbling golden melted cheese with flecks of fresh chopped green chillies and herbs, cheese pull effect, mouthwatering close-up.',
    suggestedPairing: 'Signature Filter Coffee',
    funFact: 'The combination of green chillies and melted cheddar is an iconic Indian club sandwich invention from Bombay.'
  },
  {
    id: 'chicken-cheese-toasties',
    name: 'Chicken & Cheese Toasties',
    category: 'Shareable Bites',
    isVeg: false,
    price: 230,
    tagline: 'Golden grilled toasties stuffed with herbed chicken & stringy cheese',
    description: 'Crisp pressed sandwich triangles packed with seasoned shredded chicken, melted gouda and mozzarella, caramelized onions, and a touch of cracked black pepper.',
    ingredients: ['Herb-Poached Shredded Chicken', 'Molten Gouda & Mozzarella', 'Caramelized Sweet Onions', 'Cracked Black Pepper', 'Butter Toasted Sourdough'],
    tasteProfile: { sweetness: 1, bitterness: 1, spice: 3, richness: 4 },
    imagePrompt: 'Golden-brown grilled toastie cut diagonally showing a dramatic stretchy melted cheese pull with shredded seasoned chicken, herbs, served on a dark wood board.',
    suggestedPairing: 'Classic Cold Coffee',
    funFact: 'The toastie (jaffle) became a staple street food in British and Commonwealth tea stalls.'
  }
];
