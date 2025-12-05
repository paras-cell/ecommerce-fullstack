const data = [
  {
    id: 1,
    brand: "Highlander",
    details: "Men Casual Shirt",
    description: "Stylish slim-fit shirt made from breathable cotton.",
    price: 499,
    orgprice: 999,
    off: "60",
    color: "white",
    gender: "men",
    image: "/cardimg.png", // 👈 main image for Card component
    otherImages: [               // 👈 additional images for ProductPage
      "/cate1-women.png",
      "/cardimg.png"
    ],
    reviews: [
      { rating: 4, comment: "Great fit!" },
      { rating: 5, comment: "Looks premium." }
    ]
  },
  // more products...
];

export default data;