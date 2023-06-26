const users = [
  {
    userId: 'af05ef0a-0a35-448d-b8dd-1a9f24f2d557',
    firstName: 'John',
    lastName: 'Doe',
    country: 'United States',
    region: 'California',
    city: 'Los Angeles',
    address: '123 Main St',
    postalCode: '12345',
    birthDate: '1990-01-01',
    phoneNumber: '1234567890',
    idNumber: '123456789',
    userRole: 'common',
    isActive: true,
    image:
      {
        imageId: 'af05ef0a-0a35-448d-b8dd-1a9f24f2d557',
        url: 'https://example.com/image1.jpg'
      },
    login: {
        loginId: "ca2fc372-7751-4a5c-b8b8-df072e7cf618",
        email: "jahndwe@example.com",
        password: "$2b$10$QSu1pcGYM12EUY8beCrHeOKQGXFXQpeBdjmOVccYGvlEUp8NC.ZKi",
        verify: false,
      },
  },
  {
    userId: 'bd8f145a-8e6c-4de3-8b8b-9b431f1f29d4',
    firstName: 'Jane',
    lastName: 'Smith',
    country: 'Canada',
    region: 'Ontario',
    city: 'Toronto',
    address: '456 Elm St',
    postalCode: '54321',
    birthDate: '1985-05-10',
    phoneNumber: '9876543210',
    idNumber: '987654321',
    userRole: 'common',
    isActive: true,
    image: 
      {
        imageId: 'bd8f145a-8e6c-4de3-8b8b-9b431f1f29d4',
        url: 'https://example.com/image2.jpg',
      },
  },
  {
    userId: '6e081b7f-91ab-4195-89f5-24c8ce55b672',
    firstName: 'Alex',
    lastName: 'Johnson',
    country: 'Australia',
    region: 'New South Wales',
    city: 'Sydney',
    address: '789 Oak St',
    postalCode: '98765',
    birthDate: '1995-08-20',
    phoneNumber: '1239874560',
    idNumber: '654321987',
    userRole: 'common',
    isActive: true,
    image: 
      {
        imageId: '6e081b7f-91ab-4195-89f5-24c8ce55b672',
        url: 'https://example.com/image3.jpg',
      },
  }
];

module.exports = users;