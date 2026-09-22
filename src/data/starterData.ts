import { SeriesBible, Character, Episode } from '../types';

export const INITIAL_SERIES_BIBLE: SeriesBible = {
  id: 'wonder-garden-main',
  seriesName: "Milo & Momo's Wonder Garden",
  logline: "In a gentle, colorful backyard sanctuary, 7-year-old fox child Milo and bubbly cloud creature Momo discover the magic of nature, kindness, and emotional growth.",
  targetAudience: "Preschool to Early Elementary (Children ages 4–8)",
  ageRange: "4-8",
  tone: [
    "Funny and playful",
    "Warm and reassuring",
    "Educational & nature-oriented",
    "Imaginative and wonder-filled",
    "Positive and gentle",
    "Safe, non-scary, and non-violent",
    "Age-appropriate with slow-paced sensory friendliness"
  ],
  worldRules: [
    "The Wonder Garden is a joyful, safe sanctuary where plants grow with care, kindness, and cheerful song.",
    "Momo is a whimsical cloud sprite that floats gently, expressing emotion through pastel cloud colors and gentle sprinkles.",
    "Conflicts are everyday gentle childhood misunderstandings (patience, sharing, trying again) — never villains or physical peril.",
    "Every solution relies on observation, empathy, patience, or collaborative teamwork.",
    "Technology does not overpower nature: tools are watering cans, wooden spades, magnifying glasses, and curiosity."
  ],
  visualStyle: "Soft storybook 3D look with warm pastel lighting, rounded squash-and-stretch shapes, soft hand-painted textures, bright organic palettes, and cozy ambient daylight.",
  characterConsistencyGuidelines: "Milo MUST always have warm orange fur, cream snout/chest, friendly rounded dark amber eyes, and his signature teal backpack with yellow buckle. Momo MUST always be a soft cumulus cloud shape with rainbow micro-sparkles and big expressive rounded black eyes with smiling mouth.",
  prohibitedContent: [
    "No weapons, violence, loud frightening noises, or scary monsters.",
    "No modern tech obsession, screens, cynicism, or sarcastic cruelty.",
    "Strictly ZERO copyrighted characters, commercial logos, or external pop culture tropes.",
    "No crude humor, bathroom humor, or fast-cut hyperstimulating visuals."
  ],
  episodeLengthTarget: "2 to 5 minutes (ideal for bedtime or preschool circle time)",
  publishingSchedule: "Daily at 07:00 AM EST (Morning family routine)",
  musicAndAudioStyle: "Acoustic marimba, gentle ukulele, pizzicato strings, soft woodwinds, birdsong, and genuine laughter.",
  updatedAt: new Date().toISOString()
};

export const INITIAL_CHARACTERS: Character[] = [
  {
    id: 'char-milo',
    name: 'Milo',
    role: 'Lead Explorer & Gardener',
    age: '7 years old',
    species: 'Fox Child (Original IP)',
    personality: 'Curious, enthusiastic, patient learner, deeply empathetic, loves planting and asking big questions.',
    appearance: 'Rounded preschool fox with vibrant orange fur, soft cream-colored cheeks, belly and tail tip. Large friendly expressive amber eyes with round pupils. Big plush ears that twitch with excitement.',
    clothing: 'Cozy sunflower-yellow short-sleeve shirt, soft denim-blue dungarees with rolled cuffs, and his signature teal backpack holding seeds, tools, and a wooden sketchbook.',
    voiceDescription: 'Warm, youthful, articulate, gentle 7-year-old child tone (bright, eager, unhurried cadence).',
    animationBehavior: 'Playful bouncy waddle when walking, leans in close when observing flowers, taps backpack straps thoughtfully, joyous ear-wiggles upon discovery.',
    consistencyNotes: 'Never remove teal backpack during outdoor scenes. Fur tone must stay warm apricot-orange, never reddish predator tones.',
    avatarColor: '#F97316',
    avatarSvgType: 'milo',
    referenceImagePrompt: 'Adorable preschool fox child named Milo, 7 years old, orange fur, soft rounded toddler proportions, cream snout and belly, bright happy round eyes, wearing sunflower yellow tee and denim overalls with a cute teal backpack, standing in a lush sunny wonder garden with oversized blooming flowers, soft Pixar-style 3D render, warm cozy sunlight, 8k resolution, child safe aesthetic',
    createdAt: new Date().toISOString()
  },
  {
    id: 'char-momo',
    name: 'Momo',
    role: 'Whimsical Cloud Companion',
    age: 'Ageless / playful sprite',
    species: 'Living Gentle Cloud (Original IP)',
    personality: 'Gentle, giggly, encouraging cheerleader, emotional mirror for the garden, loves floating upside down and making tiny rain showers for thirsty buds.',
    appearance: 'Small pillowy floating white cloud creature with soft glowing rainbow aura. Two simple sparkling dark dots for eyes and a blushing happy smile. Tiny stubby vapor hands that wave hello.',
    clothing: 'None (pure soft puffy cloud entity with floating pastel rainbow mist specks).',
    voiceDescription: 'Soft chime-like giggles, melodic soothing voice, gentle breeze breathings, sweet cheerful tone.',
    animationBehavior: 'Floats at Milo shoulder height, bobs up and down with breathing rhythm, shifts into slight pink hue when happy or soft blue when pensive, produces tiny sparkle drizzle to hydrate seeds.',
    consistencyNotes: 'Always floating 10-30cm above ground. Shimmer sparkles must be pastel rainbow particles, never dark smoke.',
    avatarColor: '#38BDF8',
    avatarSvgType: 'momo',
    referenceImagePrompt: 'Small lovable floating cloud creature named Momo, fluffy pure white cumulus shape, soft rounded edges, glowing gentle rainbow sparkles trailing behind, simple smiling joyful face with cute rosy cheeks, floating beside a friendly fox in an enchanting preschool garden, storybook 3D animation style, bright and inviting',
    createdAt: new Date().toISOString()
  },
  {
    id: 'char-barnaby',
    name: 'Barnaby the Beetle',
    role: 'Supportive Garden Resident',
    age: 'Elder helper',
    species: 'Gentle Emerald Leaf Beetle',
    personality: 'Wise, slow-speaking, reassuring, carries little watering droplets on his shiny shell.',
    appearance: 'Smooth rounded emerald-green beetle with golden spectacles perched on his nose, smiling warmly.',
    clothing: 'Tiny acorn cap hat.',
    voiceDescription: 'Low, velvety, cheerful grandpa chuckle, very soothing.',
    animationBehavior: 'Slow deliberate steps, polishes spectacles with tiny green leaf handkerchief.',
    consistencyNotes: 'Always green with golden spectacles; friendly bug anatomy without sharp pincers.',
    avatarColor: '#10B981',
    avatarSvgType: 'custom',
    referenceImagePrompt: 'Friendly rounded green beetle wearing tiny spectacles and an acorn cap hat, gentle preschool character style, sitting on a daisy petal, smiling warmly, soft children show art',
    createdAt: new Date().toISOString()
  }
];

export const INITIAL_EPISODE_1: Episode = {
  id: 'ep-001-rainbow-seed',
  episodeNumber: 1,
  title: 'The Rainbow Seed',
  logline: "When Milo finds an unusual glowing seed in the Wonder Garden, he and Momo learn that growing something truly special takes patience, gentle words, and loving care.",
  educationalObjective: "Teach young children that growth takes patience and that kindness, gentle care, and perseverance help living things blossom.",
  topic: 'Patience & Nurturing Nature',
  lesson: 'Kindness and caring for growing things',
  moral: 'Good things take time to grow when we treat them with gentle love.',
  targetAge: 'Ages 4-7',
  status: 'REVIEW',
  scenesCount: 14,
  totalDurationSeconds: 196,
  synopsis: "Morning sunshine bathes Milo's backyard garden. Milo finds a tiny shimmering seed shaped like a rainbow teardrop. Momo is thrilled and wants it to bloom right now! Through a sequence of watering, singing a sweet lullaby, giving it warm sunlight, and waiting through afternoon rest, Milo and Momo discover that patience is the sweetest ingredient. The seed sprouts into a magnificent, luminescent Wonder Flower that blooms with rainbow petals, releasing dancing scent bubbles.",
  fullScript: `[NARRATOR]
Welcome to the Wonder Garden! A cozy place where every leaf has a story and every little bud has a secret waiting to unfold.

[SCENE 1: A SUNNY MORNING IN THE WONDER GARDEN]
Milo the fox happily skips into the garden, swinging his watering can. Momo bobs through the air with a happy chime.
MILO: Look at the sunbeams today, Momo! They're like golden honey ribbons!
MOMO: (Giggles) Ding-dong! Good morning, sweet yellow daisies!

[SCENE 2: THE SPARKLE UNDER THE DUSTY LEAF]
Milo spots a gentle iridescent shimmer nestled under a soft mossy pebble.
MILO: Wait, what's that down here?
MOMO: It twinkles like a fallen starlet!

[SCENE 3: DISCOVERY OF THE RAINBOW SEED]
Milo gently cradles a tiny, pearl-smooth seed that shimmers with rainbow swirls.
NARRATOR: Nestled right under the soft clover was a seed unlike any other. It glowed with the warm colors of a sunrise.
MILO: Look at it, Momo! It's a Rainbow Seed!

[SCENE 4: MOMO'S IMPATIENT EXCITEMENT]
Momo twirls around the seed, blowing rainbow puff sparkles.
MOMO: Can it bloom right this second? Can it make a giant candy tree now, now, now?
MILO: (Laughs gently) Even the grandest oak tree starts with a cozy nap in the soil, Momo.

[SCENE 5: PREPARING THE SOFT SOIL BED]
Milo takes his wooden garden trowel and creates a soft, crumbly bed of rich earth.
MILO: First, we make a soft little blanket of soil.
NARRATOR: Seeds need a cozy home, just like little children tucking into warm sheets at bedtime.

[SCENE 6: TUCKING THE SEED TO SLEEP]
Milo places the seed into the ground and gently covers it.
MILO: Sweet dreams, little rainbow seed. Drink the earth and feel safe.
MOMO: Sleep tight, little buddy!

[SCENE 7: GENTLE RAINDROP SPRINKLE]
Momo hovers right over the soil patch, concentrating with a cute squished nose, and sprinkles a tiny refreshing rainbow cloud shower.
MOMO: Pitter-patter, pitter-patter! Refreshing sip for you!
MILO: That's perfect, Momo! Not too much, not too little. Just right!

[SCENE 8: CHECKING TOO SOON]
Momo presses his fluffy cheek against the ground.
MOMO: Hello? Are you tall yet? Did it grow?
MILO: Not yet, Momo. Growing is quiet work. You can't see the roots hugging the earth underneath.

[SCENE 9: THE LESSON OF PATIENCE]
Milo sits under the shade of the apple tree, patting the grass next to him. Momo floats down into his lap.
MILO: Sometimes the most magical things are happening when everything seems still. We just have to be patient.
NARRATOR: When we wait with a kind heart, waiting doesn't feel long at all.

[SCENE 10: SINGING A KIND GARDEN SONG]
Milo and Momo hum a sweet two-note lullaby to the garden bed.
MILO & MOMO (SINGING): Grow, little seed, warm and bright. Sun in the day, stars in the night!
NARRATOR: Plants love kind voices. Caring is like sunshine for the heart.

[SCENE 11: A TINY GREEN GLOW]
The earth shifts just a tiny speck. A bright emerald sprout with a rainbow tip pokes through the soil!
MOMO: (Gasp!) Look, look, Milo! A green wink!
MILO: It heard us! It's waking up!

[SCENE 12: THE FULL BLOOM MOMENT]
With a soft chime and glowing petals unfurling in slow gentle motion, a magnificent flower blossoms with seven glowing rainbow petals.
NARRATOR: With patience, gentle drops, and heartfelt care, the seed unfurls into the magnificent Wonder Bloom!
MOMO: It's so breathtakingly beautiful!

[SCENE 13: CELEBRATION AND FRIENDSHIP]
Milo and Momo hug beside the glowing bloom. Scented soap bubbles of rainbow light drift toward the sky.
MILO: We did it together, Momo! By taking our time and giving love.
MOMO: Patience made the sweetest bloom in the whole wide world!

[SCENE 14: FAREWELL BEDTIME MESSAGE]
Milo waves toward the camera with his smiling face. Momo leaves a trail of heart-shaped sparkles.
MILO: What seeds of kindness will you plant today, friends?
NARRATOR: See you next time in Milo and Momo's Wonder Garden, where kindness helps everyone grow.`,
  youtubeTitle: "Milo & Momo's Wonder Garden: The Rainbow Seed 🌱🌈 (Full Episode 1)",
  youtubeDescription: `Join Milo the friendly fox child and Momo the bubbly cloud sprite in Episode 1 of "Milo & Momo's Wonder Garden"!

In today's sweet story, Milo finds an extraordinary glowing rainbow seed. Momo wants it to sprout right away, but through caring watering, gentle words, and cozy patience, they discover that the greatest wonders take time to bloom!

✨ Key Lessons for Kids:
- Patience and understanding gradual growth
- How plants drink water and need soil and light
- Being kind to nature and living creatures
- Encouragement and peaceful mindfulness

🎨 Original Series Created for Children Ages 4-8.
Safe, Gentle, Non-Violent, Sensory-Friendly Storytelling.

Subscribe to Milo & Momo Toon Factory for daily wholesome adventures!
#MiloAndMomo #WonderGarden #PreschoolCartoons #KidsAnimation #PatienceForKids #BedtimeStory`,
  youtubeTags: [
    "Milo and Momo",
    "Wonder Garden",
    "preschool animation",
    "children cartoon",
    "learning patience",
    "bedtime story for kids",
    "educational cartoons for toddlers",
    "fox cartoon",
    "wholesome kids show",
    "gardening for kids",
    "sensory friendly cartoons",
    "original kids animation"
  ],
  thumbnailConcept: "Warm high-contrast thumbnail: Milo with excited round eyes pointing down at the glowing rainbow seed in rich soil, Momo floating alongside with wide smiling expression and rainbow sparkles, lush sunlit garden background with bright bold text: 'THE RAINBOW SEED! 🌱'",
  thumbnailUrl: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1200&q=80',
  version: 1,
  versionsHistory: [
    {
      version: 1,
      updatedAt: new Date().toISOString(),
      summary: 'Initial starter episode with complete 14 scenes, audio storyboard, and full narration.'
    }
  ],
  video16x9Url: '',
  shorts9x16Url: '',
  subtitlesSrt: `1\n00:00:00,000 --> 00:00:14,000\nWelcome to the Wonder Garden! A cozy place where every leaf has a story.\n\n2\n00:00:14,000 --> 00:00:28,000\nLook at the sunbeams today, Momo! They're like golden honey ribbons!\n\n3\n00:00:28,000 --> 00:00:42,000\nWait, what is that down here under the soft clover?`,
  subtitlesVtt: `WEBVTT\n\n00:00:00.000 --> 00:00:14.000\nWelcome to the Wonder Garden! A cozy place where every leaf has a story.\n\n00:00:14.000 --> 00:00:28.000\nLook at the sunbeams today, Momo! They're like golden honey ribbons!`,
  scenes: [
    {
      id: 'sc-01',
      sceneNumber: 1,
      title: 'A Sunny Morning in the Wonder Garden',
      durationSeconds: 14,
      narration: "Welcome to the Wonder Garden! A cozy place where every leaf has a story and every little bud has a secret waiting to unfold.",
      dialogue: "MILO: Look at the sunbeams today, Momo! They're like golden honey ribbons!\nMOMO: (Giggles) Ding-dong! Good morning, sweet yellow daisies!",
      characters: ['Milo', 'Momo'],
      action: 'Milo skips along the pebble garden pathway with his teal backpack and wooden watering can. Momo bobs playfully through air curls.',
      background: 'Lush preschool garden with oversized buttercups, soft moss mounds, and gentle golden morning sunbeams.',
      cameraDirection: 'Wide establishing pan moving gently from sunlit garden arbor down to Milo and Momo walking forward.',
      animationInstructions: 'Milo has a cheerful 2-step bounce waddle. Momo gently squashes and stretches while floating in gentle rhythm.',
      visualPrompt: 'Milo the 7yo orange fox child in yellow tee and denim dungarees with teal backpack, smiling happily next to Momo the cute floating white cloud creature with rainbow sparkles, walking in sunny preschool wonder garden with giant daisies, 3D storybook style, soft lighting',
      imageUrl: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80',
      audioStatus: 'ready',
      animationStatus: 'ready',
      qaStatus: 'passed',
      startTimeFormatted: '00:00',
      endTimeFormatted: '00:14'
    },
    {
      id: 'sc-02',
      sceneNumber: 2,
      title: 'The Sparkle Under the Leaf',
      durationSeconds: 14,
      narration: "As Milo peeked beneath a cluster of clover, a curious little sparkle caught his big, shiny eyes.",
      dialogue: "MILO: Wait, what's that down here?\nMOMO: It twinkles like a fallen starlet!",
      characters: ['Milo', 'Momo'],
      action: 'Milo stops, crouches down on one knee, tilting his head with ears twitching with inquisitive curiosity.',
      background: 'Close-up of velvet green moss and clover patches beside a friendly garden stone.',
      cameraDirection: 'Medium close-up track down to garden ground level, low angle.',
      animationInstructions: 'Milo twitches his ears twice, eyes widen in delight. Momo drifts closer and blushes pink.',
      visualPrompt: 'Close up ground level view of Milo the orange fox child crouching near green clovers looking at a tiny iridescent rainbow glow, Momo floating beside him, gentle storybook lighting',
      imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
      audioStatus: 'ready',
      animationStatus: 'ready',
      qaStatus: 'passed',
      startTimeFormatted: '00:14',
      endTimeFormatted: '00:28'
    },
    {
      id: 'sc-03',
      sceneNumber: 3,
      title: 'Discovery of the Rainbow Seed',
      durationSeconds: 14,
      narration: "Nestled right under the soft clover was a seed unlike any other. It glowed with the warm colors of a morning sunrise.",
      dialogue: "MILO: Look at it, Momo! It's a Rainbow Seed!\nMOMO: Oooooh! It feels like warm peach fuzz!",
      characters: ['Milo', 'Momo'],
      action: 'Milo gently lifts the seed in his palms. It pulsates with slow, rhythmic pastel light.',
      background: 'Soft focus garden background, glowing speckles around Milo paws.',
      cameraDirection: 'Extreme close up on Milo gentle furry paws holding the glowing seed.',
      animationInstructions: 'Subtle glowing pulse cycle on the seed (2-second fade loop). Momo eyes sparkle with tiny star glints.',
      visualPrompt: 'Extreme close-up of cute cartoon fox paws holding a magical teardrop-shaped rainbow seed glowing with pastel iridescent colors, warm soft preschool 3d art',
      imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
      audioStatus: 'ready',
      animationStatus: 'ready',
      qaStatus: 'passed',
      startTimeFormatted: '00:28',
      endTimeFormatted: '00:42'
    },
    {
      id: 'sc-04',
      sceneNumber: 4,
      title: "Momo's Impatient Excitement",
      durationSeconds: 14,
      narration: "Momo was so excited! He wanted to see it grow right that very second!",
      dialogue: "MOMO: Can it bloom now? Can it make giant rainbow blossoms right this second?\nMILO: (Chuckles softly) Even the biggest sunflowers need a cozy nap first, Momo.",
      characters: ['Milo', 'Momo'],
      action: 'Momo loops three rapid cartwheels through the air, sending small harmless rainbow sparkles fluttering everywhere.',
      background: 'Garden flowerbed border with wooden picket fence in background.',
      cameraDirection: 'Medium shot tracking Momo bouncy flight loop.',
      animationInstructions: 'Fast playful spiral for Momo followed by a gentle float down. Milo chuckles with belly bounce.',
      visualPrompt: 'Momo the fluffy white cloud sprite spinning happily in air with colorful sparkles, Milo the orange fox chuckles with friendly expression, sunny garden setting',
      imageUrl: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=800&q=80',
      audioStatus: 'ready',
      animationStatus: 'ready',
      qaStatus: 'passed',
      startTimeFormatted: '00:42',
      endTimeFormatted: '00:56'
    },
    {
      id: 'sc-05',
      sceneNumber: 5,
      title: 'Preparing the Soft Soil Bed',
      durationSeconds: 14,
      narration: "Milo reached into his backpack for his trusty wooden trowel to prepare a warm, crumbly soil cradle.",
      dialogue: "MILO: First, we make a soft little bed. Rich, fluffy soil will keep our seed cozy.",
      characters: ['Milo'],
      action: 'Milo gently pats down a small patch of warm brown soil, smoothing the top like making a bed.',
      background: 'Sunny garden patch with earthworms happily waving from nearby soil.',
      cameraDirection: 'Over-the-shoulder angle from Milo perspective looking down at the soil.',
      animationInstructions: 'Milo pats the dirt rhythmically: pat, pat, pat. Gentle dust particle puffs.',
      visualPrompt: 'Milo the fox child patting rich dark soil with wooden trowel in garden bed, sunny morning lighting, cute preschool animation style',
      imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80',
      audioStatus: 'ready',
      animationStatus: 'ready',
      qaStatus: 'passed',
      startTimeFormatted: '00:56',
      endTimeFormatted: '01:10'
    },
    {
      id: 'sc-06',
      sceneNumber: 6,
      title: 'Tucking the Seed to Sleep',
      durationSeconds: 14,
      narration: "Milo tucked the rainbow seed into the soft earth, just like a child pulling up a blanket at bedtime.",
      dialogue: "MILO: Sweet dreams, little rainbow seed. Drink the earth and feel safe.\nMOMO: Sleep tight, little buddy!",
      characters: ['Milo', 'Momo'],
      action: 'Milo places the seed in the depression and gently brushes soil over it. Momo blows a gentle kiss of rainbow vapor.',
      background: 'Warm garden earth with a small wooden marker painted with a rainbow.',
      cameraDirection: 'Close up on the soil mound as the seed disappears beneath the dark loam.',
      animationInstructions: 'Gentle hand sweep motion covering seed. Soft sparkle shimmer as seed is covered.',
      visualPrompt: 'Gentle fox paws tucking glowing seed under soft brown soil, cute wooden garden stake nearby, warm afternoon golden light',
      imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80',
      audioStatus: 'ready',
      animationStatus: 'ready',
      qaStatus: 'passed',
      startTimeFormatted: '01:10',
      endTimeFormatted: '01:24'
    },
    {
      id: 'sc-07',
      sceneNumber: 7,
      title: 'Gentle Raindrop Sprinkle',
      durationSeconds: 14,
      narration: "Now the seed needed a refreshing sip. Momo knew just what to do!",
      dialogue: "MOMO: Pitter-patter, pitter-patter! Here comes a cool rainbow cloud shower!\nMILO: That's it, Momo! Just a gentle sprinkle!",
      characters: ['Milo', 'Momo'],
      action: 'Momo hovers 30cm over the mound, wiggles his cloud body, and releases delicate pastel drops of shimmering water.',
      background: 'Flowerbed patch under dappled tree shade.',
      cameraDirection: 'Medium shot showing Momo raining down droplets with a proud happy grin.',
      animationInstructions: 'Momo squishes slightly with effort, drops fall with pleasant chime SFX.',
      visualPrompt: 'Momo the fluffy white cloud floating directly above flowerbed showering tiny rainbow water droplets, Milo watching happily with thumbs up, preschool 3d art',
      imageUrl: 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?auto=format&fit=crop&w=800&q=80',
      audioStatus: 'ready',
      animationStatus: 'ready',
      qaStatus: 'passed',
      startTimeFormatted: '01:24',
      endTimeFormatted: '01:38'
    },
    {
      id: 'sc-08',
      sceneNumber: 8,
      title: 'Checking Too Soon',
      durationSeconds: 14,
      narration: "Only two minutes had passed, but Momo could barely contain his curiosity.",
      dialogue: "MOMO: Hello down there? Are you tall yet? Did it grow?\nMILO: Not yet, Momo! Growing takes quiet time.",
      characters: ['Milo', 'Momo'],
      action: 'Momo presses his ear against the soil, listening intently with his eyes closed and tongue slightly poking out.',
      background: 'Ground level view with blades of sweetgrass.',
      cameraDirection: 'Low-angle comic shot of Momo cheek flattened against dirt.',
      animationInstructions: 'Momo squashes flat against the ground, comical cute expression.',
      visualPrompt: 'Cute fluffy cloud Momo flattened against garden ground listening for seeds to grow, Milo looking amused, 3D cartoon style',
      imageUrl: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?auto=format&fit=crop&w=800&q=80',
      audioStatus: 'ready',
      animationStatus: 'ready',
      qaStatus: 'passed',
      startTimeFormatted: '01:38',
      endTimeFormatted: '01:52'
    },
    {
      id: 'sc-09',
      sceneNumber: 9,
      title: 'The Lesson of Patience',
      durationSeconds: 14,
      narration: "Milo sat down under the old apple tree and patted the soft grass beside him.",
      dialogue: "MILO: Underground, tiny white roots are hugging the soil. We can't see them yet, but wonderful things are happening.\nNARRATOR: When we wait with a calm heart, waiting is peaceful.",
      characters: ['Milo', 'Momo'],
      action: 'Milo sits cross-legged with back against apple tree bark. Momo rests comfortably in his lap like a fluffy kitten.',
      background: 'Shady patch beneath blooming apple tree with drifting petals.',
      cameraDirection: 'Cozy medium shot framed by soft apple blossoms.',
      animationInstructions: 'Slow breathing animations for both characters. Gentle breeze blowing through Milo fur.',
      visualPrompt: 'Milo the fox sitting calmly under a flowering apple tree with Momo resting in his lap, peaceful serene garden atmosphere, soft afternoon golden hour light',
      imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      audioStatus: 'ready',
      animationStatus: 'ready',
      qaStatus: 'passed',
      startTimeFormatted: '01:52',
      endTimeFormatted: '02:06'
    },
    {
      id: 'sc-10',
      sceneNumber: 10,
      title: 'Singing a Kind Garden Song',
      durationSeconds: 14,
      narration: "Plants love kind voices. Caring words are like warm sunshine for little growing roots.",
      dialogue: "MILO & MOMO (SINGING): Grow, little seed, warm and bright!\nSun in the day, sweet stars at night!\nMOMO: We love you, little green friend!",
      characters: ['Milo', 'Momo'],
      action: 'Milo sways side to side singing softly; Momo hums musical notes that visually float as colorful translucent bubbles.',
      background: 'Sunny garden patch with bees calmly visiting nearby clover.',
      cameraDirection: 'Medium two-shot tracking the musical swaying rhythm.',
      animationInstructions: 'Synchronized gentle swaying with musical note particles rising upward.',
      visualPrompt: 'Milo the fox and Momo singing together toward the garden soil, musical note sparkles floating in air, warm and heartfelt children show animation',
      imageUrl: 'https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?auto=format&fit=crop&w=800&q=80',
      audioStatus: 'ready',
      animationStatus: 'ready',
      qaStatus: 'passed',
      startTimeFormatted: '02:06',
      endTimeFormatted: '02:20'
    },
    {
      id: 'sc-11',
      sceneNumber: 11,
      title: 'A Tiny Green Glow',
      durationSeconds: 14,
      narration: "Then, the earth moved just a speck! A bright little green sprout peeked out into the sunshine.",
      dialogue: "MOMO: (Gasps with joy) Look, look, Milo! A tiny green wink!\nMILO: It heard our song! It's waking up!",
      characters: ['Milo', 'Momo'],
      action: 'The soil cracks gently and a vivid neon-green sprout with iridescent edges pushes upward.',
      background: 'Close-up of the soil mound.',
      cameraDirection: 'Macro shot pushing in slowly on the emerging sprout.',
      animationInstructions: 'Soil particles tumble down as the sprout rises with a cheerful stretch motion.',
      visualPrompt: 'Macro shot of glowing green plant sprout with rainbow glowing tips emerging from garden soil, sparkling morning dew drops, children book 3d art',
      imageUrl: 'https://images.unsplash.com/photo-1457530378978-8bac673b8062?auto=format&fit=crop&w=800&q=80',
      audioStatus: 'ready',
      animationStatus: 'ready',
      qaStatus: 'passed',
      startTimeFormatted: '02:20',
      endTimeFormatted: '02:34'
    },
    {
      id: 'sc-12',
      sceneNumber: 12,
      title: 'The Full Bloom Moment',
      durationSeconds: 14,
      narration: "With patience, loving drops, and warm care, the bud unfurled into the magnificent Wonder Bloom!",
      dialogue: "NARRATOR: Seven luminous petals opened up to greet the sky!\nMOMO: It's the most magnificent flower in the whole world!",
      characters: ['Milo', 'Momo'],
      action: 'The bud opens in glorious slow motion. Seven pastel rainbow petals shimmer and release gentle floating light bubbles.',
      background: 'Center of the Wonder Garden, illuminated with radiant joyful aura.',
      cameraDirection: 'Slow circular hero shot around the blooming rainbow flower.',
      animationInstructions: 'Petals unfurl gracefully with shimmering glow shader and crystal chime audio cue.',
      visualPrompt: 'Magnificent glowing rainbow preschool cartoon flower with 7 pastel colored petals blooming in garden, soft sparkling magical light, Milo and Momo watching in awe',
      imageUrl: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=800&q=80',
      audioStatus: 'ready',
      animationStatus: 'ready',
      qaStatus: 'passed',
      startTimeFormatted: '02:34',
      endTimeFormatted: '02:48'
    },
    {
      id: 'sc-13',
      sceneNumber: 13,
      title: 'Celebration and Friendship',
      durationSeconds: 14,
      narration: "Milo and Momo learned that the sweetest things in life can never be rushed.",
      dialogue: "MILO: We did it together, Momo! By giving it time and gentle care.\nMOMO: Patience made the sweetest bloom!",
      characters: ['Milo', 'Momo'],
      action: 'Milo and Momo share a high-five and a warm hug beside the glowing flower.',
      background: 'Wide view of the Wonder Garden, vibrant, safe, and happy.',
      cameraDirection: 'Wide warm shot pulling back slowly.',
      animationInstructions: 'High five with little sparkle pop, followed by affectionate hug.',
      visualPrompt: 'Milo the fox child giving high five to Momo the floating cloud friend next to tall glowing rainbow flower, happy sunny garden scene, 3d preschool CGI',
      imageUrl: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80',
      audioStatus: 'ready',
      animationStatus: 'ready',
      qaStatus: 'passed',
      startTimeFormatted: '02:48',
      endTimeFormatted: '03:02'
    },
    {
      id: 'sc-14',
      sceneNumber: 14,
      title: 'Farewell Bedtime Message',
      durationSeconds: 14,
      narration: "What seeds of kindness will you plant today, little explorers? See you next time in the Wonder Garden!",
      dialogue: "MILO: Goodbye, friends! Keep smiling and keep caring!\nMOMO: Bye-bye! See you tomorrow!",
      characters: ['Milo', 'Momo'],
      action: 'Milo and Momo wave both hands toward the camera with big warm smiles. End title card fades in softly.',
      background: 'Garden gate with colorful flowers and glowing fireflies beginning to twinkle as dusk approaches.',
      cameraDirection: 'Static frontal shot with gentle slow zoom into Milo and Momo waving.',
      animationInstructions: 'Friendly alternating wave animation, warm eye contact with audience.',
      visualPrompt: 'Milo fox child and Momo cloud waving happily directly at viewer, friendly smile, warm preschool cartoon finale screen with soft dusk garden background',
      imageUrl: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80',
      audioStatus: 'ready',
      animationStatus: 'ready',
      qaStatus: 'passed',
      startTimeFormatted: '03:02',
      endTimeFormatted: '03:16'
    }
  ],
  analytics: {
    views: 14850,
    watchTimeMinutes: 42100,
    likes: 1240,
    subscribersGained: 340,
    ctr: 8.4,
    avgRetentionPercent: 78.5,
    estimatedRevenueUsd: 48.20
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

export const INITIAL_AUTOMATION_SETTINGS = {
  enabled: true,
  frequency: 'daily' as const,
  productionTime: '04:00 AM',
  publishingTime: '07:00 AM',
  timezone: 'America/New_York (EST)',
  episodesPerCycle: 1,
  retryCount: 3,
  autoDraftCreation: true,
  requireHumanApproval: true as const,
  lastRunAt: 'Today at 04:00 AM',
  nextRunAt: 'Tomorrow at 04:00 AM',
  status: 'idle' as const,
  failuresCount: 0
};
