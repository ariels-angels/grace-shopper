const {Product, User, db} = require('./server/db')
const {green, red} = require('chalk')

const users = [
  {
    email: 'drmantistobogon@gmail.com',
    password: 'alwayssunny',
    googleId: 'drmantistobogon'
  },
  {
    email: 'billandted@hotmail.com',
    password: 'cyberpunk2077',
    googleId: 'dontkillmydog'
  },
  {
    email: 'siriusxm@qol.com',
    password: 'iloveradio',
    googleId: 'greatestradiohostofalltime'
  },
  {
    email: 'bobsburgersisthebest@yahoo.com',
    password: 'bobbelcher',
    googleId: 'ihatejimmypesto'
  },
  {
    email: 'imgoinghome@gmail.com',
    password: 'eric_cartman',
    googleId: 'cheezypoofs'
  }
]

const products = [
  {
    title: 'M-216 Ski Search and Rescue Helmet W/ Princeton Tec Task Light Up',
    stock: 5,
    description:
      'The M-216 Ski Search & Rescue helmet features a hybrid shell design; ABS hard front shell provides reinforcement for mounted accessories, and an in-mold PC rear shell reduces weight. The helmet includes: A glass-reinforced polycarbonate shroud for mounting NODs, cameras and head lamps. A customized Boa Fit System guarantees a precise fit adjustment with single handed quick release. Accessory rails allow for mounting a variety of lights and cameras. Removable ear cups specifically designed to be comfortable while using in-ear communication systems and includes a pocket for drop-in audio device compatibility. 14 Total Vents: Eight crown (adjustable), two front (passive open), four rear (fixed open) for maximum cooling during high exertion rescues. Eight adjustable crown vents with three positions (open, half open and closed) to accommodate both warm and cold conditions. Above-goggle vent channels draw air through the helmet to the rear exhaust ports to reduce goggle fogging. Integrated goggle strap retention. The M-216 also comes standard with your choice of a Princeton Tec Switch MPLS or Switch Rail task light that will mount directly onto the front section of the helmet rail.',
    rating: 7,
    price: 279,
    imageUrl:
      'https://op1.0ps.us/978-550-ffffff-no-upscale/opplanet-team-wendy-m-216-ski-search-and-rescue-helmet-w-princeton-tec-switch-mpls-light-black-83-1bkgy-sm-main.jpg'
  },
  {
    title: '1992 Nuptse Printed Quilted Shell Down Jacket',
    stock: 14,
    description:
      'The North Faces 1992 Nuptse jacket is one of the most iconic styles and we have bought it in a multitude of colours this season, from turquoise to plain black. This one is made from printed water-repellent shell and filled with lightweight, insulating down for extra warmth. Its equipped with a drawstring hem and internal zipped pocket to keep your valuables secure. Shown here with And Wander trousers, The North Face T-shirt, Salomon boots.',
    rating: 8,
    price: 270,
    imageUrl:
      'https://cache.mrporter.com/images/products/1121111/1121111_mrp_in_l.jpg'
  },
  {
    title: 'SNOW Boots New Tignes',
    stock: 2,
    description:
      'impressively snow boots in a  high class of its own - sensationally designed; truly fashionably accentuated with a rhomb-quilting, gray stitching and logo-lettering at the back; interior heel for a comfortable running feeling - upmarket premium-quality - luxery BOGNER Style!!',
    rating: 4,
    price: 150,
    imageUrl:
      'https://www.hot-selection.com/out/pictures/magictoolbox_cache/5d599ff3f9afd17d2a191ee4d861bf84/2/a/2ab9a71879a1ea04ee57622507757005/thumb1000x450/2986876864/newtignes4a_29seagree.1.jpg'
  },
  {
    title: 'Discovery Junior Positrack IFP Skis with Turnamic Bindings',
    stock: 12,
    description:
      'L.L.Bean offers a wide selection of cross country skiing gear, equipment and clothing to meet everyones needs, from experts preparing for a nordic race or extended backcountry trip, to beginners looking to try skate skiing for the first time. Along with our own brand, we offer skis from brands like Rossignol, Fischer and Altai and with a complete selection of bindings and poles. L.L.Bean has all the equipment, accessories and apparel to get you trail-ready this winter: windproof pants and jackets that move and breathe with you, gloves and hats, plus luggage, portable boot dryers and even wooden wall ski racks for the lodge',
    rating: 9,
    price: 195,
    imageUrl:
      'https://cdni.llbean.net/is/image/wim/306547_446_41?hei=200&amp;wid=174'
  },
  {
    title: 'Jones Snowboards Lone Wolf Snowboard',
    stock: 1,
    description:
      'Swallowtail board for big turns, big lines, and super fast speeds Directional shape is made for riding fast, straight, and in control Medium-stiff flex holds up at high speeds for a super stable feel Directional rocker profile provides excellent float and edge control Spoon 3.0 base contours add float and control in deep untouched snow Narrow waist, long sidecut encourages high speed aggressive riding Light core with carbon laminates is stable, rigid, and responsive Super fast Sintered base makes sure you get back to the lift easily',
    rating: 10,
    price: 487.46,
    imageUrl:
      'https://content.backcountry.com/images/items/900/JSB/JSB006R/ONECOL.jpg'
  },
  {
    title: 'Mens Burton Tourist Snowboard Boot',
    stock: 25,
    description:
      'Skintrack or summit bid, the Burton Tourist boot handles the mountains with surefooted confidence. More negative flex than any other boot in the line enhances glide in the skintrack, while an array of insulating features are key on pre-dawn starts or snow camping missions. Developed with team riders plus the crew at Spark R&D, the Tourist sticks to the same trusted Vibram® sole found on the Driver X for near legendary billy goat grip.',
    rating: 5,
    price: 349.99,
    imageUrl:
      'https://www.burton.com/static/product/W19/17037101001_1.png?impolicy=bglt&imwidth=282 1x, https://www.burton.com/static/product/W19/17037101001_1.png?impolicy=bglt&imwidth=564 2x'
  },
  {
    title: 'Mens Burton Custom Flying V Snowboard',
    stock: '25',
    description: `Since its humble beginnings, innovation has defined the Burton Custom series and set it apart as the most popular, versatile, and mimicked board in snowboarding. Since 1996, this icon has reigned supreme and constantly evolved with a proven formula that combines time-honored design with envelope-pushing ingredients to create a lightweight, poppy, and highly versatile board. Offered in two versions, the precision and stability of the Custom camber is the top choice for many pro riders, while the Custom Flying V combines camber's power with the relaxed float of rocker for the best of both worlds.`,
    rating: 5,
    price: 599.99,
    imageUrl:
      'https://www.burton.com/static/product/W19/10707105000150_1.png?impolicy=bglt&imwidth=282 1x, https://www.burton.com/static/product/W19/10707105000150_1.png?impolicy=bglt&imwidth=564 2x'
  },
  {
    title: 'Burton Dunmore Jacket',
    stock: 25,
    description:
      'At first glance, the Burton Dunmore Jacket looks and feels like your typical heavy-duty workwear jacket. Dig deeper and youll discover some serious shred cred like high-performance waterproof/breathability on a variety of unique fabrics, plus lightweight THERMOLITE® Insulation and our Living Lining® for automatic climate control. A stealth way to shed extra layers, this single piece consolidates flannel, insulator, and hoodie into one. It also contains all the best features, including sound and goggle pockets, a removable waist gaiter and hood, and venting to battle everything from sub-zero temps to springtime slop.',
    rating: 5,
    price: 169.99,
    imageUrl:
      'https://www.burton.com/static/product/W19/13067103300_5.png?impolicy=bglt&imwidth=282 1x, https://www.burton.com/static/product/W19/13067103300_5.png?impolicy=bglt&imwidth=564 2x'
  },
  {
    title: 'Burton Genesis X EST Snowboard Binding',
    stock: 25,
    description:
      'While some bindings are made rigid and stiff for the sake of performance, the Burton Genesis X binding achieves pro-caliber control without sacrificing an ounce of comfort. Built for aggressive all-mountain riders, it features a hyper-reactive carbon-injected baseplate, responsive Hammockstraps, and a zero-lean canted Hi-Back with MicroFLAD™ adjustment capabilities. Choose the across-the-board compatibility of Re:Flex™ or pair the SpringBED-equipped EST® model with boards featuring The Channel® for the ultimate in cushioning, feel, and adjustability.',
    rating: 5,
    price: 449.99,
    imageUrl:
      'srcset=“https://www.burton.com/static/product/W19/16911103004_1.png?impolicy=bglt&imwidth=282 1x, https://www.burton.com/static/product/W19/16911103004_1.png?impolicy=bglt&imwidth=564 2x”'
  },
  {
    title: 'Analog Ice Out Bib Pant',
    stock: 25,
    description: `Slip into your new excuse for never slowing down: the men's Analog Breakneck Bib Pant. Built for comfort and technical performance, rugged DRYRIDE 2-layer fabrication combines the weatherproof protection of fully taped seams with an articulated relaxed fit. Add a rundown of features like stash pockets, Test-I-Cool venting, Cordura® hem reinforcement, and the assurance of a LIFETIME WARRANTY, and you're looking at the hardest working bib on the hill.`,
    rating: 5,
    price: 209.99,
    imageUrl:
      'https://www.burton.com/static/product/W19/20624100700_4.png?impolicy=bglt&imwidth=282 1x, https://www.burton.com/static/product/W19/20624100700_4.png?impolicy=bglt&imwidth=564 2x'
  },
  {
    title: 'Burton Throwback Snowboard',
    stock: 20,
    description:
      'A resurrection of snowboarding’s past, this ride-able piece of history is built for surfing snow in your own backyard. While this snowboard is gripped and ready to rip, it is not recommended for riding at resorts or on hardpack or icy conditions. Please consult your resort before riding The Throwback on their trails.',
    rating: 9.5,
    price: 149.95,
    imageUrl:
      'https://www.burton.com/static/product/W19/15977104000130_1.png?impolicy=bglt&imwidth=486'
  },
  {
    title: 'Burton All-Season Speed Sauce',
    stock: 30,
    description:
      'Wipe on a glob of our Burton All-Season Speed Sauce paste wax to rapidly increase your speed for a few critical runs. Whether dropping in for a race run, hitting a giant spring kicker or just charging to beat your buddies to the best line on deep powder days, one simple application will give you the added speed you need.',
    rating: 9.7,
    price: 19.95,
    imageUrl:
      'https://www.burton.com/static/product/W19/10807102000_1.png?impolicy=bglt&imwidth=486'
  },
  {
    title: 'Salomon Brigade+ Audio Helmet',
    stock: 30,
    description: `Jam out n' shred in the Salomon Brigade+ Audio Helmet. With less weight and an active ventilation system for max climate control, you'll never want to take this bad boy off.`,
    rating: 9.2,
    price: 129.95,
    imageUrl:
      'https://images.evo.com/imgp/700/140256/576314/salomon-brigade-audio-helmet-all-black.jpg'
  },
  {
    title: 'Anon MFI XL Hooded Clava',
    stock: 30,
    description: `Designed with extra room in order to fit over your helmet, the Anon MFI XL Hooded Clava delivers the style of a ninja warrior with the comfort of your favorite hoodie -- make of that what you will, but just know that this thing is sick! Stretch fleece fabric is comfortable against the skin and works to naturally shed moisture. If you've already got a pair of Anon MFI goggles, you'd be foolish to pass up the Anon MFI XL Hooded Clava.`,
    rating: 8.2,
    price: 69.95,
    imageUrl:
      'https://images.evo.com/imgp/700/102825/454419/anon-mfi-xl-hooded-clava-black-front.jpg'
  },
  {
    title: `Men's Burton Ion Snowboard Boot`,
    stock: 25,
    description:
      'Setting the bar higher in every discipline is still the headline for the ever responsive Burton Ion™ boot. The only choice for riders who charge hard across the entire mountain, the Ion is legendary for its stacked tech package upgraded with our Life Liner for lightweight comfort and enhanced rebound. The full feature list includes AutoCANT EST® soles for natural lower body alignment and superior board feel, DRYRIDE Heat Cycle™ for enhanced warmth and moisture wicking, and ReBounce tech that both reflects body heat and cushions consistently in freezing conditions.',
    rating: 9.3,
    price: 499.95,
    imageUrl:
      'https://www.burton.com/static/product/W19/17036103041_1.png?impolicy=bglt&imwidth=486'
  },
  {
    title: 'Anon Raider Helmet',
    stock: 8,
    description: `No-fuss function is the name of the game, and the Anon Raider Helmet is throwin' points up on the board like nobody's business.`,
    rating: 9,
    price: 48.99,
    imageUrl:
      'https://images.evo.com/imgp/700/83347/377296/anon-raider-helmet-black-right side.jpg'
  },
  {
    title: 'Anon Prime MIPS Helmet',
    stock: 12,
    description: `If you've outgrown the days of goggles-under-the-helmet steeze, sketchy park jumps, and dicey urban rails but still push it across the upper mountain, Anon Prime MIPS Helmet has your name all over it.`,
    rating: 10,
    price: 174.99,
    imageUrl:
      'https://images.evo.com/imgp/700/102893/521896/anon-prime-mips-helmet-blackout.jpg'
  },
  {
    title: 'Anon Rodan Helment',
    stock: 20,
    description: `It's time to ride on with the Anon Rodan Helmet. The built-in passive ventilation makes sure your cranium stays cool, while its 360° Boa® Fit System gives you the ability to cinch it down for a tight yet comfy shred-friendly fit.`,
    rating: 9,
    price: 90.99,
    imageUrl:
      'https://images.evo.com/imgp/700/119712/581767/anon-rodan-helmet-native-green.jpg'
  },
  {
    title: 'Oakley MOD 5 Helmet',
    stock: 10,
    description:
      'The Oakley MOD 5 Helmet features premium, impeccable design for the discerning all mountain rider.',
    rating: 9,
    price: 139.99,
    imageUrl:
      'https://images.evo.com/imgp/700/106305/455270/oakley-mod-5-helmet-factory-pilot-matte-black.jpg'
  },
  {
    title: 'Oakley MOD 5 MIPS Helmet',
    stock: 16,
    description: `So you think you send it for the boys, huh? Well when it comes to getting sendy, you'd be a fool to send it in anything less than the brawny Oakley MOD 5 MIPS Helmet.`,
    rating: 10,
    price: 239.99,
    imageUrl:
      'https://images.evo.com/imgp/700/114521/473953/oakley-mod-5-mips-helmet-matte-black.jpg'
  }
]

const seed = async () => {
  await db.sync({force: true})

  // seed your database here!
  await Promise.all(
    users.map(user => {
      return User.create(user)
    })
  )

  await Promise.all(
    products.map(product => {
      return Product.create(product)
    })
  )

  console.log(green('Seeding success!'))
  db.close()
}

seed().catch(err => {
  console.error(red('Oh noes! Something went wrong!'))
  console.error(err)
  db.close()
})
