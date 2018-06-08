const { db, User, Product, Cart, Review, Category } = require('./models')

const seed = async () => {
  try {
    await db.sync({ force: true })
    const [admin, monica, arielle, kaitlin] = await Promise.all([
      User.create({
        name: 'Sharon',
        email: 'sharonyun11@gmail.com',
        password: 'p@$5w0rd',
        address: '144 17th St #4 Brooklyn, NY 11215',
        isAdmin: true
      }),
      User.create({
        name: 'Monica',
        email: 'monica@gmail.com',
        password: 'monica123',
        address: '123 Pennsylvania Ave, Jersey City, NJ 07097',
        isAdmin: false
      }),
      User.create({
        name: 'Arielle',
        email: 'arielle@gmail.com',
        password: 'arielle123',
        address: '456 Park Pl, Brooklyn, NY 11215',
        isAdmin: false
      }),
      User.create({
        name: 'Kaitlin',
        email: 'kaitlin@gmail.com',
        password: 'kaitlin123',
        address: '789 Boardwalk, Brooklyn, NY 11215',
        isAdmin: false
      })
    ])
    const [nationalParks, southAmerica, california] = await Promise.all([
      Category.create({
        name: 'National Parks'
      }),
      Category.create({
        name: 'South America'
      }),
      Category.create({
        name: 'California'
      })
    ])
    const [cart1, cart2, cart3] = await Promise.all([
      Cart.create({
        date: Date.now(),
        status: 'open',
        subtotal: 40
      }),
      Cart.create({
        date: new Date('May 17, 2018 03:24:00'),
        status: 'closed',
        subtotal: 85
      }),
      Cart.create({
        date: new Date('June 4, 2018 12:00:00'),
        status: 'open',
        subtotal: 50
      })
    ])

    const [
      yellowstone,
      glacier,
      grandCanyon,
      redwoods,
      patagonia
    ] = await Promise.all([
      Product.create({
        title: 'Yellowstone',
        description:
          'Colorful thermal feature, Yellowstone National Park, Montana',
        price: 30,
        inventoryQuantity: 20,
        imageUrl: 'https://flic.kr/p/bss8YG'
      }),
      Product.create({
        title: 'Glacier',
        description: 'Margerie Glacier, Tarr Inlet, Glacier Bay National Park',
        price: 25,
        inventoryQuantity: 15,
        imageUrl: 'https://flic.kr/p/XNYogZ'
      }),
      Product.create({
        title: 'Grand Canyon',
        description: 'Grand Canyon with River views',
        price: 15,
        inventoryQuantity: 34,
        imageUrl: 'https://flic.kr/p/W6KyEB '
      }),
      Product.create({
        title: 'Redwoods',
        description: 'Redwoods Avenue of Giants',
        price: 25,
        inventoryQuantity: 20,
        imageUrl: 'https://flic.kr/p/f2VquP'
      }),
      Product.create({
        title: 'Patagonia',
        description: 'Patagonia Glaciers',
        price: 55,
        inventoryQuantity: 10,
        imageUrl: 'https://flic.kr/p/7VSNCE'
      })
    ])

    const [review1, review2, review3] = await Promise.all([
      Review.create({
        title: 'Would purchase again!',
        content: 'I really liked this picture!',
        rating: 'happy'
      }),
      Review.create({
        title: 'Great picture!',
        content: 'Looks great at my apartment.',
        rating: 'happy'
      }),
      Review.create({
        title: 'Stunning!',
        content: 'I get so many compliments on this picture.',
        rating: 'happy'
      })
    ])
    // const products = await db.models.product.findAll()
    // console.log(products)
    //add associations for productCategories
    await yellowstone.setCategories([nationalParks])
    await patagonia.setCategories([nationalParks, southAmerica])
    await glacier.setCategories([nationalParks])
    await redwoods.setCategories([nationalParks, california])
    await grandCanyon.setCategories([nationalParks])

    //add products to the carts
    await cart1.setProducts([yellowstone, patagonia])
    await cart2.setProducts([yellowstone, glacier, redwoods])
    await cart3.setProducts([grandCanyon, glacier, patagonia])

    //assign user a cart or multiple carts
    await arielle.setCarts([cart1, cart2])
    await monica.setCarts([cart3])

    //assign reviews to the users that wrote them
    await kaitlin.setReviews([review1, review2])
    await monica.setReviews([review3])
    //review is on one product
    await review1.setProduct(yellowstone)
    await review2.setProduct(glacier)
    await review3.setProduct(redwoods)

    db.close()
  } catch (error) {
    console.log(error)
    db.close()
  }
}

seed()
