const products = [
    {
        productId: '81f78a64-454c-4ad9-8ff1-92a60745d16f',
        name: 'Product 15',
        description: 'This is product 15',
        manufacturer: 'Manufacturer A',
        origin: 'USA',
        price: 199.99,
        discount: 15,
        stock: 10,
        isActive: true,
        category: {
            categoryId: 1,
            name: 'Hardware',
            isMainCategory: true,
            category: {
            categoryId: 2,
            name: 'Monitores',
            isMainCategory: true,
            },
        },
        images: [
            {
            imageId: 1,
            url: 'https://example.com/image1.jpg',
            caption: 'Image 1'
            },
            {
            imageId: 2,
            url: 'https://example.com/image2.jpg',
            caption: 'Image 2'
            }
        ],
        comments: [
            {
            commentId: '79c33be4-c8a0-4f59-b9c2-fa25eb0f1661',
            content: 'This product exceeded my expectations.',
            user: {
                userId: 'user1',
            },
            },
            {
            commentId: 'e36f9827-21b5-4fe5-9c7c-cc9723c76be2',
            content: 'Im really satisfied with the quality and performance.',
            user: {
                userId: 'user2',
            },
            },
        ],
        ratings: [
            {
            ratingId: 'd3842a6d-4d64-42e2-8a07-6acff5d1991e',
            value: 4,
            user: {
                userId: 'user1',
            },
            },
            {
            ratingId: '01d5129c-7f01-4b20-9ff5-5ed6a51c3c8a',
            value: 5,
            user: {
                userId: 'user2',
            },
            },
        ],
        carts: [
            {
            cartId: 1,
            quantity: 1,
            user: {
                userId: 'user1',
            },
            },
            {
            cartId: 2,
            quantity: 2,
            user: {
                userId: 'user2',
            },
            },
        ],
        favourite: {
            favouriteId: 1,
            user: {
            userId: 'user1',
            },
        }
    },
    {
        productId: 'c896b781-2db7-4f87-89b5-8e45c198e5b2',
        name: 'Product 16',
        description: 'This is product 16',
        manufacturer: 'Manufacturer C',
        origin: 'China',
        price: 79.99,
        discount: 5,
        stock: 8,
        isActive: true,
        category: {
            categoryId: 3,
            name: 'Placas Madre (Motherboards)',
            isMainCategory: false,
            category: {
            categoryId: 1,
            name: 'Hardware',
            isMainCategory: true,
            },
        },
        images: [
            {
            imageId: 3,
            url: 'https://example.com/image3.jpg',
            caption: 'Image 3'
            },
            {
            imageId: 4,
            url: 'https://example.com/image4.jpg',
            caption: 'Image 4'
            }
        ],
        comments: [
            {
            commentId: '78df07f2-8c85-4486-af14-c246244554f6',
            content: 'Great motherboard with excellent features.',
            user: {
                userId: 'user3',
            },
            },
            {
            commentId: 'e70119e6-b50f-4ea5-99fd-c6230977cfa7',
            content: 'Easy to install and reliable performance.',
            user: {
                userId: 'user4',
            },
            },
        ],
        ratings: [
            {
            ratingId: 'a38c8b84-1dc3-42a4-b430-396f2e792ad0',
            value: 4,
            user: {
                userId: 'user3',
            },
            },
            {
            ratingId: 'a527352a-7b3a-4fc4-80d7-bb9e1ae25c9d',
            value: 5,
            user: {
                userId: 'user4',
            },
            },
        ],
        carts: [
            {
            cartId: 3,
            quantity: 1,
            user: {
                userId: 'user3',
            },
            },
            {
            cartId: 4,
            quantity: 3,
            user: {
                userId: 'user4',
            },
            },
        ],
        favourite: {
            favouriteId: 2,
            user: {
            userId: 'user3',
            },
        }
    },
    {
        productId: 'b8dcd56c-2c94-4c49-954e-302f9c0aaf42',
        name: 'Product 17',
        description: 'This is product 17',
        manufacturer: 'Manufacturer B',
        origin: 'Germany',
        price: 299.99,
        discount: 10,
        stock: 5,
        isActive: true,
        category: {
          categoryId: 4,
          name: 'Gabinetes',
          isMainCategory: false,
          category: {
            categoryId: 1,
            name: 'Hardware',
            isMainCategory: true,
          },
        },
        images: [
          {
            imageId: 5,
            url: 'https://example.com/image5.jpg',
            caption: 'Image 5'
          },
          {
            imageId: 6,
            url: 'https://example.com/image6.jpg',
            caption: 'Image 6'
          }
        ],
        comments: [
          {
            commentId: '6f1274a1-218c-4a4e-a206-7e8ce4f53b50',
            content: 'Sleek design with excellent airflow.',
            user: {
              userId: 'user5',
            },
          },
          {
            commentId: 'ef05ef0a-0a35-448d-b8dd-1a9f24f2d557',
            content: 'Spacious interior and easy cable management.',
            user: {
              userId: 'user6',
            },
          },
        ],
        ratings: [
          {
            ratingId: 'b6c81bbf-1a2b-4a15-aacb-02cdd8e77e0a',
            value: 4,
            user: {
              userId: 'user5',
            },
          },
          {
            ratingId: 'e4a1f67d-c28e-45a3-a3f3-88f5d2c7de0e',
            value: 5,
            user: {
              userId: 'user6',
            },
          },
        ],
        carts: [
          {
            cartId: 5,
            quantity: 1,
            user: {
              userId: 'user5',
            },
          },
          {
            cartId: 6,
            quantity: 2,
            user: {
              userId: 'user6',
            },
          },
        ],
        favourite: {
          favouriteId: 3,
          user: {
            userId: 'user5',
          },
        }
    },
    {
    productId: '9507c63e-7a5a-4e10-8a0c-6e48e8f5de12',
    name: 'Product 18',
    description: 'This is product 18',
    manufacturer: 'Manufacturer D',
    origin: 'Japan',
    price: 149.99,
    discount: 5,
    stock: 12,
    isActive: true,
    category: {
        categoryId: 5,
        name: 'Monitores Gamer',
        isMainCategory: false,
        category: {
        categoryId: 2,
        name: 'Monitores',
        isMainCategory: true,
        },
    },
    images: [
        {
        imageId: 7,
        url: 'https://example.com/image7.jpg',
        caption: 'Image 7'
        },
        {
        imageId: 8,
        url: 'https://example.com/image8.jpg',
        caption: 'Image 8'
        }
    ],
    comments: [
        {
        commentId: '46c1d3c2-3b79-4e86-bf13-48b6771eebd5',
        content: 'Vibrant colors and smooth refresh rate.',
        user: {
            userId: 'user7',
        },
        },
        {
        commentId: '41bc31f2-7ff1-46f4-b3f2-50d297ac729a',
        content: 'Responsive and immersive gaming experience.',
        user: {
            userId: 'user8',
        },
        },
    ],
    ratings: [
        {
        ratingId: '4dcd9c3e-aa9f-4c54-9741-2682f5e13b0f',
        value: 4,
        user: {
            userId: 'user7',
        },
        },
        {
        ratingId: '35e1c1c4-5aee-4a1b-8198-4e3eae3c935f',
        value: 5,
        user: {
            userId: 'user8',
        },
        },
    ],
    carts: [
        {
        cartId: 7,
        quantity: 1,
        user: {
            userId: 'user7',
        },
        },
        {
        cartId: 8,
        quantity: 3,
        user: {
            userId: 'user8',
        },
        },
    ],
    favourite: {
        favouriteId: 4,
        user: {
        userId: 'user7',
        },
    }
    },
    {
    productId: '327a8a3f-961f-4d2f-8cfe-ccfc65e10e15',
    name: 'Product 19',
    description: 'This is product 19',
    manufacturer: 'Manufacturer A',
    origin: 'USA',
    price: 79.99,
    discount: 0,
    stock: 8,
    isActive: true,
    category: {
        categoryId: 6,
        name: 'Auriculares',
        isMainCategory: true,
    },
    images: [
        {
        imageId: 9,
        url: 'https://example.com/image9.jpg',
        caption: 'Image 9'
        },
        {
        imageId: 10,
        url: 'https://example.com/image10.jpg',
        caption: 'Image 10'
        }
    ],
    comments: [
        {
        commentId: '53d64b80-9c18-46fc-9e8f-1b4c53f4c8ab',
        content: 'Comfortable and clear sound quality.',
        user: {
            userId: 'user9',
        },
        },
        {
        commentId: '3dfdc14b-5503-4af1-a5f2-26ef4e9849df',
        content: 'Durable construction and stylish design.',
        user: {
            userId: 'user10',
        },
        },
    ],
    ratings: [
        {
        ratingId: '6c74f755-3619-4088-8c50-79c4e4a81268',
        value: 4,
        user: {
            userId: 'user9',
        },
        },
        {
        ratingId: 'f4f8e7f1-6019-402f-8746-2b76e3e4e19d',
        value: 5,
        user: {
            userId: 'user10',
        },
        },
    ],
    carts: [
        {
        cartId: 9,
        quantity: 2,
        user: {
            userId: 'user9',
        },
        },
        {
        cartId: 10,
        quantity: 1,
        user: {
            userId: 'user10',
        },
        },
    ],
    favourite: {
        favouriteId: 5,
        user: {
        userId: 'user9',
        },
    }
    },
    {
    productId: '50e9fb27-b633-4e96-877d-845f4505e2c4',
    name: 'Product 20',
    description: 'This is product 20',
    manufacturer: 'Manufacturer C',
    origin: 'China',
    price: 199.99,
    discount: 15,
    stock: 3,
    isActive: true,
    category: {
        categoryId: 7,
        name: 'Kit Teclado/Mouse',
        isMainCategory: false,
        category: {
        categoryId: 3,
        name: 'Periféricos y Accesorios',
        isMainCategory: true,
        },
    },
    images: [
        {
        imageId: 11,
        url: 'https://example.com/image11.jpg',
        caption: 'Image 11'
        },
        {
        imageId: 12,
        url: 'https://example.com/image12.jpg',
        caption: 'Image 12'
        }
    ],
    comments: [
        {
        commentId: 'b6a3a01c-df0c-49f0-9535-76a8d8d3b06c',
        content: 'Ergonomic design and responsive keystrokes.',
        user: {
            userId: 'user11',
        },
        },
        {
        commentId: 'f09e33f6-6d4a-4f4d-8948-ef8d496d0b21',
        content: 'Smooth and precise mouse tracking.',
        user: {
            userId: 'user12',
        },
        },
    ],
    ratings: [
        {
        ratingId: '063d9ac7-7d12-441e-96da-36693b929734',
        value: 4,
        user: {
            userId: 'user11',
        },
        },
        {
        ratingId: 'a9cbe88d-739e-4f66-8dcf-3e0be43f8d89',
        value: 5,
        user: {
            userId: 'user12',
        },
        },
    ],
    carts: [
        {
        cartId: 11,
        quantity: 1,
        user: {
            userId: 'user11',
        },
        },
        {
        cartId: 12,
        quantity: 1,
        user: {
            userId: 'user12',
        },
        },
    ],
    favourite: {
        favouriteId: 6,
        user: {
        userId: 'user11',
        },
    }
    },
    {
    productId: 'fc45c256-9772-4eb4-a998-6638762c0d11',
    name: 'Product 21',
    description: 'This is product 21',
    manufacturer: 'Manufacturer B',
    origin: 'Germany',
    price: 149.99,
    discount: 10,
    stock: 5,
    isActive: true,
    category: {
        categoryId: 8,
        name: 'Teclado',
        isMainCategory: false,
        category: {
        categoryId: 3,
        name: 'Periféricos y Accesorios',
        isMainCategory: true,
        },
    },
    images: [
        {
        imageId: 13,
        url: 'https://example.com/image13.jpg',
        caption: 'Image 13'
        },
        {
        imageId: 14,
        url: 'https://example.com/image14.jpg',
        caption: 'Image 14'
        }
    ],
    comments: [
        {
        commentId: '3bea5bda-67b6-4d6e-b15f-ec9f98a787d6',
        content: 'Responsive keystrokes and comfortable to use.',
        user: {
            userId: 'user13',
        },
        },
        {
        commentId: 'd583635a-0a42-40b2-ae26-14e62bc20c92',
        content: 'Durable construction and sleek design.',
        user: {
            userId: 'user14',
        },
        },
    ],
    ratings: [
        {
        ratingId: 'd5c73c88-2ed9-4d3b-a62b-9e7049efbe42',
        value: 4,
        user: {
            userId: 'user13',
        },
        },
        {
        ratingId: 'fdd63b3e-10c0-4f9b-9a79-4b447cb8454e',
        value: 5,
        user: {
            userId: 'user14',
        },
        },
    ],
    carts: [
        {
        cartId: 13,
        quantity: 1,
        user: {
            userId: 'user13',
        },
        },
        {
        cartId: 14,
        quantity: 2,
        user: {
            userId: 'user14',
        },
        },
    ],
    favourite: {
        favouriteId: 7,
        user: {
        userId: 'user13',
        },
    }
    },
    {
    productId: '6f8f7a1a-ff4b-4b88-8cc5-0417cb35a4fd',
    name: 'Product 22',
    description: 'This is product 22',
    manufacturer: 'Manufacturer C',
    origin: 'China',
    price: 199.99,
    discount: 0,
    stock: 10,
    isActive: true,
    category: {
        categoryId: 9,
        name: 'Mouse',
        isMainCategory: false,
        category: {
        categoryId: 3,
        name: 'Periféricos y Accesorios',
        isMainCategory: true,
        },
    },
    images: [
        {
        imageId: 15,
        url: 'https://example.com/image15.jpg',
        caption: 'Image 15'
        },
        {
        imageId: 16,
        url: 'https://example.com/image16.jpg',
        caption: 'Image 16'
        }
    ],
    comments: [
        {
        commentId: '5e42e605-dfa9-4f0e-a18a-5d39e8139f92',
        content: 'Ergonomic design and smooth scrolling.',
        user: {
            userId: 'user15',
        },
        },
        {
        commentId: 'b9803f4e-cb02-4a07-ae5a-2b52cbdc5c7f',
        content: 'Great precision and customizable buttons.',
        user: {
            userId: 'user16',
        },
        },
    ],
    ratings: [
        {
        ratingId: '17f3d2d9-d42d-4f3d-8c03-6e6926ef68c6',
        value: 4,
        user: {
            userId: 'user15',
        },
        },
        {
        ratingId: '8497b87e-8c15-4dc2-b7f5-2f0d4003f28b',
        value: 5,
        user: {
            userId: 'user16',
        },
        },
    ],
    carts: [
        {
        cartId: 15,
        quantity: 1,
        user: {
            userId: 'user15',
        },
        },
        {
        cartId: 16,
        quantity: 1,
        user: {
            userId: 'user16',
        },
        },
    ],
    favourite: {
        favouriteId: 8,
        user: {
        userId: 'user15',
        },
    }
    },
    {
    productId: '57d9e2b4-4b2d-4f14-897f-68c28551ad89',
    name: 'Product 23',
    description: 'This is product 23',
    manufacturer: 'Manufacturer A',
    origin: 'USA',
    price: 39.99,
    discount: 5,
    stock: 8,
    isActive: true,
    category: {
        categoryId: 10,
        name: 'Mouse Pads',
        isMainCategory: false,
        category: {
        categoryId: 3,
        name: 'Periféricos y Accesorios',
        isMainCategory: true,
        },
    },
    images: [
        {
        imageId: 17,
        url: 'https://example.com/image17.jpg',
        caption: 'Image 17'
        },
        {
        imageId: 18,
        url: 'https://example.com/image18.jpg',
        caption: 'Image 18'
        }
    ],
    comments: [
        {
        commentId: '92e1280a-3f95-4b01-bb92-c5f740f5df0f',
        content: 'Smooth surface and excellent grip.',
        user: {
            userId: 'user17',
        },
        },
        {
        commentId: '87b24435-2010-4aa0-b0c6-af09f70d00b5',
        content: 'Generous size and durable construction.',
        user: {
            userId: 'user18',
        },
        },
    ],
    ratings: [
        {
        ratingId: '6b9033d3-09de-46ab-89d9-1fde62a5f1fc',
        value: 4,
        user: {
            userId: 'user17',
        },
        },
        {
        ratingId: '78a25510-ff22-4b73-8cde-61b3d11ac9a1',
        value: 5,
        user: {
            userId: 'user18',
        },
        },
    ],
    carts: [
        {
        cartId: 17,
        quantity: 3,
        user: {
            userId: 'user17',
        },
        },
        {
        cartId: 18,
        quantity: 2,
        user: {
            userId: 'user18',
        },
        },
    ],
    favourite: {
        favouriteId: 9,
        user: {
        userId: 'user17',
        },
    }
    },
    {
    productId: '145a65b3-9464-46e2-a402-396c453c5b79',
    name: 'Product 24',
    description: 'This is product 24',
    manufacturer: 'Manufacturer B',
    origin: 'Germany',
    price: 129.99,
    discount: 15,
    stock: 3,
    isActive: true,
    category: {
        categoryId: 11,
        name: 'Micrófonos',
        isMainCategory: false,
        category: {
        categoryId: 3,
        name: 'Periféricos y Accesorios',
        isMainCategory: true,
        },
    },
    images: [
        {
        imageId: 19,
        url: 'https://example.com/image19.jpg',
        caption: 'Image 19'
        },
        {
        imageId: 20,
        url: 'https://example.com/image20.jpg',
        caption: 'Image 20'
        }
    ],
    comments: [
        {
        commentId: '72b0b631-9d0b-4c92-9bc7-57a07167169c',
        content: 'Clear sound and adjustable settings.',
        user: {
            userId: 'user19',
        },
        },
        {
        commentId: '61747e07-dcec-40b6-b5df-f30739d232fe',
        content: 'Comfortable to wear and good build quality.',
        user: {
            userId: 'user20',
        },
        },
    ],
    ratings: [
        {
        ratingId: '6b43049a-63f7-4b06-b68c-79886c9e2f7e',
        value: 4,
        user: {
            userId: 'user19',
        },
        },
        {
        ratingId: 'b9dbd8e7-aa9c-4d46-9838-d4a95136a9be',
        value: 5,
        user: {
            userId: 'user20',
        },
        },
    ],
    carts: [
        {
        cartId: 19,
        quantity: 1,
        user: {
            userId: 'user19',
        },
        },
        {
        cartId: 20,
        quantity: 1,
        user: {
            userId: 'user20',
        },
        },
    ],
    favourite: {
        favouriteId: 10,
        user: {
        userId: 'user19',
        },
    }
    },
    {
        productId: '145a65b3-9464-46e2-a402-396c453c5b79',
        name: 'Product 24',
        description: 'This is product 24',
        manufacturer: 'Manufacturer B',
        origin: 'Germany',
        price: 129.99,
        discount: 15,
        stock: 3,
        isActive: true,
        category: {
          categoryId: 11,
          name: 'Micrófonos',
          isMainCategory: false,
          category: {
            categoryId: 3,
            name: 'Periféricos y Accesorios',
            isMainCategory: true,
          },
        },
        images: [
          {
            imageId: 19,
            url: 'https://example.com/image19.jpg',
            caption: 'Image 19'
          },
          {
            imageId: 20,
            url: 'https://example.com/image20.jpg',
            caption: 'Image 20'
          }
        ],
        comments: [
          {
            commentId: '72b0b631-9d0b-4c92-9bc7-57a07167169c',
            content: 'Clear sound and adjustable settings.',
            user: {
              userId: 'user19',
            },
          },
          {
            commentId: '61747e07-dcec-40b6-b5df-f30739d232fe',
            content: 'Comfortable to wear and good build quality.',
            user: {
              userId: 'user20',
            },
          },
        ],
        ratings: [
          {
            ratingId: '6b43049a-63f7-4b06-b68c-79886c9e2f7e',
            value: 4,
            user: {
              userId: 'user19',
            },
          },
          {
            ratingId: 'b9dbd8e7-aa9c-4d46-9838-d4a95136a9be',
            value: 5,
            user: {
              userId: 'user20',
            },
          },
        ],
        carts: [
          {
            cartId: 19,
            quantity: 1,
            user: {
              userId: 'user19',
            },
          },
          {
            cartId: 20,
            quantity: 1,
            user: {
              userId: 'user20',
            },
          },
        ],
        favourite: {
          favouriteId: 10,
          user: {
            userId: 'user19',
          },
        },
    },
    {
        productId: 'abcdefg',
        name: 'Product 25',
        description: 'This is product 25',
        manufacturer: 'Manufacturer C',
        origin: 'Spain',
        price: 199.99,
        discount: 10,
        stock: 7,
        isActive: true,
        category: {
          categoryId: 8,
          name: 'Gabinetes',
          isMainCategory: false,
          category: {
            categoryId: 1,
            name: 'Hardware',
            isMainCategory: true,
          },
        },
        images: [
          {
            imageId: 21,
            url: 'https://example.com/image21.jpg',
            caption: 'Image 21'
          },
          {
            imageId: 22,
            url: 'https://example.com/image22.jpg',
            caption: 'Image 22'
          }
        ],
        comments: [
          {
            commentId: 'comment-25-1',
            content: 'Great build quality and ample space for components.',
            user: {
              userId: 'user25',
            },
          },
          {
            commentId: 'comment-25-2',
            content: 'Good cable management options and sleek design.',
            user: {
              userId: 'user26',
            },
          },
        ],
        ratings: [
          {
            ratingId: 'rating-25-1',
            value: 4,
            user: {
              userId: 'user25',
            },
          },
          {
            ratingId: 'rating-25-2',
            value: 5,
            user: {
              userId: 'user26',
            },
          },
        ],
        carts: [
          {
            cartId: 21,
            quantity: 1,
            user: {
              userId: 'user25',
            },
          },
          {
            cartId: 22,
            quantity: 1,
            user: {
              userId: 'user26',
            },
          },
        ],
        favourite: {
          favouriteId: 11,
          user: {
            userId: 'user25',
          },
        },
    },         
];

module.exports = products;  