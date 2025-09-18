const menClothing = [
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
    image: "https://plus.unsplash.com/premium_photo-1687371769989-77d4f13cd761?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // 👈 main image for Card component
    otherImages: [               // 👈 additional images for ProductPage
      "https://plus.unsplash.com/premium_photo-1687371769783-fd901dcbbb7a?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    reviews: [
      { rating: 4, comment: "Great fit!" },
      { rating: 5, comment: "Looks premium." }
    ]
  },
  {
  id: 2,
  brand: "Solestore",
  details: "Men Casual T-Shirt",
  description: "Stylish slim-fit shirt made from breathable cotton.",
  price: 499,
  orgprice: 999,
  off: "50",
  color: "white",
  gender: "men",
  image: "https://images.unsplash.com/photo-1613852348851-df1739db8201?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  otherImages: [
    "https://images.unsplash.com/photo-1613852349524-0413255449d5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ],
  reviews: [
    { rating: 4, comment: "Great fit!" },
    { rating: 5, comment: "Looks premium." }
  ]
  },
  {
    id: 3,
    brand: "U.S. Polo Assn.",
    details: "Men Polo T-Shirt",
    description: "Cotton polo tee with embroidered logo.",
    price: 699,
    orgprice: 1399,
    off: "50",
    color: "navy",
    gender: "men",
    image: "https://images.unsplash.com/photo-1726050071326-b7a80d5a646f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    otherImages: ["https://images.unsplash.com/photo-1726050071499-3e30b48c57f8?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
    reviews: [{ rating: 4, comment: "Premium feel." }]
  },
  {
    id: 4,
    brand: "Jack & Jones",
    details: "Men Slim Jeans",
    description: "Stretchable slim-fit jeans with faded wash.",
    price: 1499,
    orgprice: 2999,
    off: "50",
    color: "black",
    gender: "men",
    image: "https://plus.unsplash.com/premium_photo-1688497831384-e40b2e5615cd?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    otherImages: ["https://plus.unsplash.com/premium_photo-1673977134363-c86a9d5dcafa?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
    reviews: [{ rating: 5, comment: "Very comfortable." }]
  },
  {
    id: 5,
    brand: "Levi's",
    details: "Men Graphic Tee",
    description: "Soft cotton tee with bold graphic print.",
    price: 599,
    orgprice: 1199,
    off: "50",
    color: "grey",
    gender: "men",
    image: "https://images.unsplash.com/photo-1589903521522-6dfb45855f9b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    otherImages: ["https://images.unsplash.com/photo-1632734683089-21a07f3d2646?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
    reviews: [{ rating: 4, comment: "Nice print." }]
  },
  {
    id: 6,
    brand: "Van Heusen",
    details: "Men Formal Shirt",
    description: "Wrinkle-free formal shirt for office wear.",
    price: 899,
    orgprice: 1799,
    off: "50",
    color: "sky blue",
    gender: "men",
    image: "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    otherImages: ["https://images.unsplash.com/photo-1624835589323-442670703bc0?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
    reviews: [{ rating: 5, comment: "Perfect for meetings." }]
  },
  {
    id: 7,
    brand: "Peter England",
    details: "Men Chinos",
    description: "Cotton chinos with tapered fit.",
    price: 1099,
    orgprice: 2199,
    off: "50",
    color: "beige",
    gender: "men",
    image: "https://images.unsplash.com/photo-1642978602806-7c9f4274fbb2?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    otherImages: ["https://images.unsplash.com/photo-1642978599272-affe5c2ba90b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
    reviews: [{ rating: 4, comment: "Good quality." }]
  },
  {
    id: 8,
    brand: "Allen Solly",
    details: "Men Blazer",
    description: "Tailored blazer for formal occasions.",
    price: 2499,
    orgprice: 4999,
    off: "50",
    color: "charcoal",
    gender: "men",
    image: "https://images.unsplash.com/photo-1679101893310-9b9adb4b733b?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    otherImages: ["https://images.unsplash.com/photo-1679101893304-045625840a94?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
    reviews: [{ rating: 5, comment: "Looks sharp!" }]
  },
  {
    id: 9,
    brand: "H&M",
    details: "Men Hoodie",
    description: "Fleece hoodie with kangaroo pocket.",
    price: 799,
    orgprice: 1599,
    off: "50",
    color: "olive",
    gender: "men",
    image: "https://images.unsplash.com/photo-1704430705406-24fc29dfcccf?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    otherImages: ["https://images.unsplash.com/photo-1611817757591-c3f345024273?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
    reviews: [{ rating: 4, comment: "Warm and cozy." }]
  },
  
];

export default menClothing;