const {Product, User, db} = require('./server/db')
const {green, red} = require('chalk')

const seed = async () => {
  await db
    .sync({force: true})

    // seed your database here!
    .then(() => {
      return Promise.all([
        Product.create({
          title:
            'M-216 Ski Search and Rescue Helmet W/ Princeton Tec Task Light Up',
          stock: 5,
          description:
            'The M-216 Ski Search & Rescue helmet features a hybrid shell design; ABS hard front shell provides reinforcement for mounted accessories, and an in-mold PC rear shell reduces weight. The helmet includes: A glass-reinforced polycarbonate shroud for mounting NODs, cameras and head lamps. A customized Boa Fit System guarantees a precise fit adjustment with single handed quick release. Accessory rails allow for mounting a variety of lights and cameras. Removable ear cups specifically designed to be comfortable while using in-ear communication systems and includes a pocket for drop-in audio device compatibility. 14 Total Vents: Eight crown (adjustable), two front (passive open), four rear (fixed open) for maximum cooling during high exertion rescues. Eight adjustable crown vents with three positions (open, half open and closed) to accommodate both warm and cold conditions. Above-goggle vent channels draw air through the helmet to the rear exhaust ports to reduce goggle fogging. Integrated goggle strap retention. The M-216 also comes standard with your choice of a Princeton Tec Switch MPLS or Switch Rail task light that will mount directly onto the front section of the helmet rail.',
          rating: 7,
          price: 279,
          imageUrl:
            'https://op1.0ps.us/978-550-ffffff-no-upscale/opplanet-team-wendy-m-216-ski-search-and-rescue-helmet-w-princeton-tec-switch-mpls-light-black-83-1bkgy-sm-main.jpg'
        }),
        Product.create({
          title: '1992 Nuptse Printed Quilted Shell Down Jacket',
          stock: 14,
          description:
            'The North Faces 1992 Nuptse jacket is one of the most iconic styles and we have bought it in a multitude of colours this season, from turquoise to plain black. This one is made from printed water-repellent shell and filled with lightweight, insulating down for extra warmth. Its equipped with a drawstring hem and internal zipped pocket to keep your valuables secure. Shown here with And Wander trousers, The North Face T-shirt, Salomon boots.',
          rating: 8,
          price: 270,
          imageUrl:
            'https://cache.mrporter.com/images/products/1121111/1121111_mrp_in_l.jpg'
        }),
        Product.create({
          title: 'SNOW Boots New Tignes',
          stock: 2,
          description:
            'impressively snow boots in a  high class of its own - sensationally designed; truly fashionably accentuated with a rhomb-quilting, gray stitching and logo-lettering at the back; interior heel for a comfortable running feeling - upmarket premium-quality - luxery BOGNER Style!!',
          rating: 4,
          price: 150,
          imageUrl:
            'https://www.hot-selection.com/out/pictures/magictoolbox_cache/5d599ff3f9afd17d2a191ee4d861bf84/2/a/2ab9a71879a1ea04ee57622507757005/thumb1000x450/2986876864/newtignes4a_29seagree.1.jpg'
        }),
        Product.create({
          title: 'Discovery Junior Positrack IFP Skis with Turnamic Bindings',
          stock: 12,
          description:
            'L.L.Bean offers a wide selection of cross country skiing gear, equipment and clothing to meet everyones needs, from experts preparing for a nordic race or extended backcountry trip, to beginners looking to try skate skiing for the first time. Along with our own brand, we offer skis from brands like Rossignol, Fischer and Altai and with a complete selection of bindings and poles. L.L.Bean has all the equipment, accessories and apparel to get you trail-ready this winter: windproof pants and jackets that move and breathe with you, gloves and hats, plus luggage, portable boot dryers and even wooden wall ski racks for the lodge',
          rating: 9,
          price: 195,
          imageUrl:
            'https://cdni.llbean.net/is/image/wim/306547_446_41?hei=200&amp;wid=174'
        }),
        Product.create({
          title: 'Jones Snowboards Lone Wolf Snowboard',
          stock: 1,
          description:
            'Swallowtail board for big turns, big lines, and super fast speeds Directional shape is made for riding fast, straight, and in control Medium-stiff flex holds up at high speeds for a super stable feel Directional rocker profile provides excellent float and edge control Spoon 3.0 base contours add float and control in deep untouched snow Narrow waist, long sidecut encourages high speed aggressive riding Light core with carbon laminates is stable, rigid, and responsive Super fast Sintered base makes sure you get back to the lift easily',
          rating: 10,
          price: 487.46,
          imageUrl:
            'https://content.backcountry.com/images/items/900/JSB/JSB006R/ONECOL.jpg'
        })
      ])
    })
    .then(() => {
      return Promise.all([
        User.create({
          email: 'drmantistobogon@gmail.com',
          password: 'alwayssunny',
          googleId: 'drmantistobogon'
        }),
        User.create({
          email: 'billandted@hotmail.com',
          password: 'cyberpunk2077',
          googleId: 'dontkillmydog'
        }),
        User.create({
          email: 'siriusxm@qol.com',
          password: 'iloveradio',
          googleId: 'greatestradiohostofalltime'
        }),
        User.create({
          email: 'bobsburgersisthebest@yahoo.com',
          password: 'lindatinagene',
          googleId: 'ihatejimmypesto'
        }),
        User.create({
          email: 'imgoinghome@gmail.com',
          password: 'kylebroflovski',
          googleId: 'imgoinghome'
        })
      ])
    })

  console.log(green('Seeding success!'))
  db.close()
}

seed().catch(err => {
  console.error(red('Oh noes! Something went wrong!'))
  console.error(err)
  db.close()
})
