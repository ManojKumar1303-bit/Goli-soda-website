
import { Flavor } from './types';

export const FLAVORS: Flavor[] = [
  {
    id: 'panner',
    name: 'Panner',
    description: 'The pride of Kongu Nadu. Delicate rose essence with a sharp fizzy punch.',
    longDescription: 'Our Panner Soda is made using traditional rose petal extracts. A staple at every Karur wedding and Erode festival, this drink offers a royal floral aroma balanced by the intense carbonation of the Goli bottle.',
    color: 'bg-rose-100',
    accentColor: 'text-rose-600',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=800',
    tagline: 'Traditional Kongu Classic',
    benefits: ['Natural Coolant', 'Aromatic Stress Reliever', 'Authentic Tradition']
  },
  {
    id: 'lemon',
    name: 'Lemon',
    description: 'The ultimate thirst quencher for the Erode sun.',
    longDescription: 'Zesty and sharp, our Lemon Goli Soda is crafted to beat the intense heat of the Kongu region. Squeezed from fresh local lemons, it is the perfect companion for a busy day in the Coimbatore markets.',
    color: 'bg-yellow-100',
    accentColor: 'text-yellow-600',
    image: 'https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?auto=format&fit=crop&q=80&w=800',
    tagline: 'Zesty Refreshment',
    benefits: ['Vitamin C Rich', 'Instant Energy Boost', 'Classic Taste']
  },
  {
    id: 'grape',
    name: 'Grape',
    description: 'Deep purple delights with a rich fruity aroma.',
    longDescription: 'Indulge in the sweetness of premium black grapes. Our Grape Goli Soda captures the essence of fresh vineyards, offering a bold fruit flavor that is a favorite among the youth of Coimbatore.',
    color: 'bg-purple-100',
    accentColor: 'text-purple-600',
    image: 'https://images.unsplash.com/photo-1615484477778-ca3b77940c25?auto=format&fit=crop&q=80&w=800',
    tagline: 'Fruity Intensity',
    benefits: ['Antioxidant Rich', 'Fruity Delight', 'Kid Favorite']
  },
  {
    id: 'nannari',
    name: 'Nannari',
    description: 'The healing herb from the western ghats.',
    longDescription: 'A therapeutic marvel! Nannari (Sarsaparilla) is a traditional root used to cool the body. We source our roots from the foothills near Coimbatore to ensure the most potent and refreshing herbal soda in Karur.',
    color: 'bg-amber-100',
    accentColor: 'text-amber-700',
    image: 'https://images.unsplash.com/photo-1543255006-d6395b6f1171?auto=format&fit=crop&q=80&w=800',
    tagline: 'Earthly Coolant',
    benefits: ['Detoxifying Properties', 'Body Heat Reducer', 'Herbal Goodness']
  },
  {
    id: 'orange',
    name: 'Orange',
    description: 'Sun-kissed citrus burst with a nostalgic tang.',
    longDescription: 'Our Orange Goli Soda is vibrant and bubbly, packed with the tangy sweetness that brings back memories of school holidays in Karur. A refreshing burst of sunshine in every bottle.',
    color: 'bg-orange-100',
    accentColor: 'text-orange-600',
    image: 'https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&q=80&w=800',
    tagline: 'Sun-Kissed Fizz',
    benefits: ['Tangy & Sweet', 'Nostalgic Vibe', 'Refreshing Burst']
  },
  {
    id: 'pineapple',
    name: 'Pineapple',
    description: 'Exotic tropical vibes for the textile city.',
    longDescription: 'Experience a juicy, sun-soaked flavor that feels like a breeze through the Amaravathi river. Our Pineapple Goli Soda is sweet, tart, and incredibly satisfying.',
    color: 'bg-yellow-50',
    accentColor: 'text-yellow-700',
    image: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&q=80&w=800',
    tagline: 'Tropical Vibe',
    benefits: ['Digestion Aid', 'Exotic Flavor', 'Vitamin Rich']
  },
  {
    id: 'blueberry',
    name: 'Blueberry',
    description: 'A modern fusion for the smart city of Coimbatore.',
    longDescription: 'A contemporary addition to our traditional line-up. Our Blueberry Goli Soda offers a sophisticated berry profile, appealing to the modern, fast-paced life of the Kongu region.',
    color: 'bg-blue-100',
    accentColor: 'text-blue-600',
    image: 'https://images.unsplash.com/photo-1497534446932-c946e7316ad3?auto=format&fit=crop&q=80&w=800',
    tagline: 'Modern Fusion',
    benefits: ['Superfood Extract', 'Modern Taste', 'Stunning Color']
  },
  {
    id: 'ginger',
    name: 'Ginger',
    description: 'The spicy choice for after a heavy Erode Biryani.',
    longDescription: 'For those who love a kick! Our Ginger Goli Soda is sharp, spicy, and incredibly soothing. It is the perfect digestive drink after a spicy Erode meal or a long industrial workday in Karur.',
    color: 'bg-stone-100',
    accentColor: 'text-stone-700',
    image: 'https://images.unsplash.com/photo-1596727147705-61a532a659bd?auto=format&fit=crop&q=80&w=800',
    tagline: 'Spicy Boldness',
    benefits: ['Digestive Hero', 'Anti-inflammatory', 'Bold Spicy Kick']
  }
];

export const CONTACT_INFO = {
  address: "Kaaraalan Goli Soda, Opposite to Thamarai School, Thamaraipalayam, Erode, Tamil Nadu 638152",
  email: "kaaraalangolisoda@gmail.com",
  phone: "+91 86868 63336",
  socials: {
    instagram: "https://www.instagram.com/kaaraalangolisoda/?hl=en",
    facebook: "https://www.facebook.com/kaaraalangolisoda/",
    // twitter: "https://twitter.com/kaaraalansoda"
  },
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3914.9964512355073!2d77.84348577355703!3d11.11364175288621!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba97ff1242d0cb1%3A0x21e2f706b0adad6!2sKaaraalan%C2%AE%20Goli%20Soda!5e0!3m2!1sen!2sin!4v1769791416359!5m2!1sen!2sin"
};
