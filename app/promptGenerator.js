const GENDERS = ['male', 'female'];

const NATIONALITIES = [
  'Italian', 'Russian', 'Japanese', 'French', 'Mexican',
  'Turkish', 'American', 'Korean', 'Brazilian', 'Spanish'
];

const STYLE_VARIANTS = [
  'classic', 'modern', 'noir', 'luxury', 'vintage', 'cinematic'
];

const EXPRESSION_VARIANTS = [
  'serious', 'confident', 'cold and calculating',
  'calm but intimidating', 'charismatic'
];

const MALE_CLOTHING = [
  'sharp black suit',
  'tuxedo with red carnation',
  'pinstripe suit',
  'velvet jacket',
  'modern noir coat'
];

const MALE_ACCESSORIES = [
  'lit cigar',
  'gold ring',
  'fedora hat',
  'cufflinks',
  'pocket watch chain'
];

const MALE_HAIR = [
  'slicked-back hair',
  'short pompadour',
  'side-parted hairstyle'
];

const FEMALE_CLOTHING = [
  'black tuxedo-style outfit',
  'tailored suit with red rose brooch',
  'vintage noir dress',
  'luxury suit with silk blouse',
  'elegant trench coat'
];

const FEMALE_ACCESSORIES = [
  'gold earrings',
  'choker',
  'fedora hat',
  'gold chain',
  'cigarette holder'
];

const FEMALE_HAIR = [
  'elegant updo',
  'sleek ponytail',
  'short wavy bob',
  'slicked-back glam style'
];

const FEMALE_MAKEUP = [
  'bold red lips',
  'dark smokey eyes',
  'subtle confident makeup'
];

const CONSTANT_TECHNICAL_SETTINGS = `EXACT SAME SETUP ALL IMAGES: Camera locked 0° straight-on eye-level centered, FULL HEAD AND SHOULDERS VISIBLE in frame (complete head top to chest, no cropping), 85mm, 1:1 ratio, subject facing forward. LIGHTING MAFIA_L1 LOCKED IDENTICAL EVERY IMAGE: Key light softbox camera-left 45° horizontal/35° elevation, power locked 1.0, color temp LOCKED 4500K neutral white (NO variation), distance 1.5m. Fill light bounce camera-right 15°/0°, power locked 0.4, temp LOCKED 4500K neutral white (NO variation). Rim light back-right 120°/25°, power locked 0.6, temp LOCKED 4500K neutral white (NO variation), 2m distance. Camera settings LOCKED: ISO 400, f/2.8, 1/125s, manual exposure. Contrast LOCKED 50%, soft shadows identical, white balance HARD LOCKED 4500K on ALL three lights (key/fill/rim). Post-processing: ZERO color grading, ZERO LUTs, ZERO tone shifts, ZERO filters, ZERO color gels. Background LOCKED: charcoal gray RGB(68,68,68) exact same, smoke density LOCKED 30% opacity, ZERO background lights, ZERO light spill. Every image identical studio session with locked tripod/lights - only person changes, ALL technical parameters EXACT DUPLICATE. NEGATIVE PROMPT STRICT: NO lighting changes whatsoever, NO warm tones, NO cool tones, NO orange glow, NO blue tint, NO teal-orange look, NO colored gels, NO lens flares, NO color shifts between images, NO different lighting angles, NO exposure differences, NO contrast changes, NO cropped heads, NO cut-off tops. RENDER: High-quality 3D stylized realistic character (between Pixar and realism), clean detailed skin with pores and texture, realistic proportions with slight stylization, expressive detailed eyes, natural hair rendering, professional AAA game character quality (Last of Us/Uncharted style), cinematic character render, NOT cartoon, NOT overly stylized, photorealistic materials with artistic touch.`;

const randomChoice = (array) => array[Math.floor(Math.random() * array.length)];

export const generatePrompt = (options = {}) => {
  const gender = options.gender || randomChoice(GENDERS);
  const nationality = options.nationality || randomChoice(NATIONALITIES);
  const styleVariant = options.styleVariant || randomChoice(STYLE_VARIANTS);
  const expressionVariant = options.expressionVariant || randomChoice(EXPRESSION_VARIANTS);

  let clothing, accessory, hair, makeup = null;

  if (gender === 'male') {
    clothing = options.clothing || randomChoice(MALE_CLOTHING);
    accessory = options.accessory || randomChoice(MALE_ACCESSORIES);
    hair = options.hair || randomChoice(MALE_HAIR);
  } else {
    clothing = options.clothing || randomChoice(FEMALE_CLOTHING);
    accessory = options.accessory || randomChoice(FEMALE_ACCESSORIES);
    hair = options.hair || randomChoice(FEMALE_HAIR);
    makeup = options.makeup || randomChoice(FEMALE_MAKEUP);
  }

  const makeupSection = gender === 'female' ? ` Makeup: ${makeup}.` : '';
  const textPrompt = `High-quality 3D stylized realistic mafia character portrait: ${gender} ${nationality}, ${styleVariant} style. ${clothing}, ${accessory}. Hair: ${hair}.${makeupSection} Expression: ${expressionVariant}. ${CONSTANT_TECHNICAL_SETTINGS}`;

  const jsonPrompt = {
    character: {
      gender,
      nationality,
      style: styleVariant,
      expression: expressionVariant,
      clothing,
      accessory,
      hair,
      ...(makeup && { makeup })
    },
    technical: {
      camera: {
        position: "locked exact same position all shots",
        angle: "straight-on 0° horizontal, eye-level 0° tilt",
        framing: "FULL HEAD AND SHOULDERS VISIBLE, complete head top to chest, NO cropping, NO cut-off tops",
        lens: "85mm focal length",
        ratio: "1:1 square",
        settings: "LOCKED manual ISO 400, f/2.8, 1/125s"
      },
      lighting_rig_MAFIA_L1_LOCKED_IDENTICAL: {
        key_light: {
          type: "softbox",
          position: "camera-left 45° horizontal, 35° elevation",
          power: "LOCKED 1.0",
          color: "LOCKED 4500K neutral white (NO variation)",
          distance: "1.5m"
        },
        fill_light: {
          type: "bounce reflector",
          position: "camera-right 15° horizontal, 0° elevation",
          power: "LOCKED 0.4",
          color: "LOCKED 4500K neutral white (NO variation)"
        },
        rim_light: {
          type: "LED panel",
          position: "back-right 120° horizontal, 25° elevation",
          power: "LOCKED 0.6",
          color: "LOCKED 4500K neutral white (NO variation)",
          distance: "2m"
        }
      },
      post_processing: {
        contrast: "LOCKED 50%",
        shadows: "soft identical",
        white_balance: "HARD LOCKED 4500K on ALL three lights (key/fill/rim)",
        color_grading: "ZERO",
        luts: "ZERO",
        tone_shifts: "ZERO",
        filters: "ZERO",
        color_gels: "ZERO"
      },
      background: {
        color: "LOCKED charcoal gray RGB(68,68,68) exact same",
        smoke: "LOCKED 30% opacity density",
        lights: "ZERO background lights",
        spill: "ZERO light spill"
      },
      consistency: "Every image EXACT DUPLICATE studio session, locked tripod, locked lights - only person changes, ALL technical parameters IDENTICAL"
    },
    strict_negative: "NO lighting changes, NO warm tones, NO cool tones, NO orange glow, NO blue tint, NO teal-orange, NO colored gels, NO lens flares, NO color shifts between images, NO different lighting angles, NO exposure differences, NO contrast changes, NO cropped heads, NO cut-off tops",
    rendering: {
      style: "High-quality 3D stylized realistic character (between Pixar and photorealism)",
      quality: "AAA game character (Last of Us/Uncharted style), cinematic render",
      skin: "clean detailed with pores and texture, photorealistic materials with artistic touch",
      proportions: "realistic with slight stylization",
      features: "expressive detailed eyes, natural hair rendering",
      not: "NOT cartoon, NOT overly stylized"
    }
  };

  return {
    textPrompt,
    jsonPrompt,
    details: {
      gender,
      nationality,
      styleVariant,
      expressionVariant,
      clothing,
      accessory,
      hair,
      makeup
    }
  };
};

export const OPTIONS = {
  GENDERS,
  NATIONALITIES,
  STYLE_VARIANTS,
  EXPRESSION_VARIANTS,
  MALE_CLOTHING,
  MALE_ACCESSORIES,
  MALE_HAIR,
  FEMALE_CLOTHING,
  FEMALE_ACCESSORIES,
  FEMALE_HAIR,
  FEMALE_MAKEUP
};
