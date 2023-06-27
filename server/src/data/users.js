const users = [
  {
    userId: 'ac5b18b6-6383-4a9f-8e4c-65ad3c93b81a',
    firstName: 'Ignacio',
    lastName: 'Fosco',
    country: 'Argentina',
    region: 'Santa Fe',
    city: 'Rosario',
    address: '1234 Dorrego St',
    postalCode: '2000',
    birthDate: '1986-02-13',
    phoneNumber: '03413966669',
    idNumber: 'F666007',
    userRole: 'super',
    isActive: true,
    image: {
      imageId: '7a3f6844-c7e2-4f4d-9ea3-305b7f8f68e2',
      url: 'https://example.com/fuegobscuro.jpg'
    },
    login: {
      loginId: 'e8dfc4b2-858d-45f2-947a-bc3e67c5e6f4',
      email: 'ignaciofosco@example.com',
      password: '$2b$10$dSCot.T1J1gIiPbL5YbHZuLm1F8.WosL7RzbfIBoVKajf.mVXk7HK',
      verify: false
    }
  },
  {
    userId: '16f1052f-d83c-4c56-96f3-5199b501e3a1',
    firstName: 'John',
    lastName: 'Smith',
    country: 'United States',
    region: 'California',
    city: 'Los Angeles',
    address: '123 Main St',
    postalCode: '90001',
    birthDate: '1988-05-15',
    phoneNumber: '1234567890',
    idNumber: 'A1234567',
    userRole: 'common',
    isActive: true,
    image: {
      imageId: '64df2f57-0b41-4b62-91db-d1f9a98e9b44',
      url: 'https://example.com/image1.jpg'
    },
    login: {
      loginId: '42c9d6b2-8b9f-4ae4-8930-88e3fe6d14ad',
      email: 'johnsmith@example.com',
      password: '$2b$10$h8eHbATkX8tUph1Za/Vs4OohrrDqTUhFbhluLW.pAKJnJcBd3or.W',
      verify: false
    }
  },
  {
    userId: 'c05215e1-ee45-4aeb-8275-4216bc24e2f9',
    firstName: 'Emma',
    lastName: 'Johnson',
    country: 'Canada',
    region: 'Ontario',
    city: 'Toronto',
    address: '456 Elm St',
    postalCode: 'M5G 1B2',
    birthDate: '1992-09-22',
    phoneNumber: '9876543210',
    idNumber: 'B9876543',
    userRole: 'common',
    isActive: true,
    image: {
      imageId: 'd1c3bfb0-1c3d-4cb5-963c-bd501c2c5ea6',
      url: 'https://example.com/image2.jpg'
    },
    login: {
      loginId: 'fed4a200-3dd7-4c54-a768-8b5dd881e92a',
      email: 'emmajohnson@example.com',
      password: '$2b$10$j1aK5C5q1TtQpzjsJ9mdeu.JkM2UCVlmKfbbCnKue93ekV4qAxn0.',
      verify: false
    }
  },
  {
    userId: '42b44df3-8435-4b5a-a6b8-2b6d55a4f532',
    firstName: 'Michael',
    lastName: 'Brown',
    country: 'United States',
    region: 'New York',
    city: 'New York City',
    address: '789 Oak St',
    postalCode: '10001',
    birthDate: '1995-03-10',
    phoneNumber: '1239874560',
    idNumber: 'C6543219',
    userRole: 'common',
    isActive: true,
    image: {
      imageId: '9be9c06a-44af-4f10-86f5-3837297874e2',
      url: 'https://example.com/image3.jpg'
    },
    login: {
      loginId: '529fe31e-1da3-44cc-985c-4f30c0bb09d5',
      email: 'michaelbrown@example.com',
      password: '$2b$10$R6JeJTk2SXgat40rRDCYaeWywYztJGmZoYm8CZJMRfMMSHxGArzh.',
      verify: false
    }
  },
  {
    userId: '29eaf422-78f2-42c9-8df0-62fd9de4b21e',
    firstName: 'Sophia',
    lastName: 'Wilson',
    country: 'United Kingdom',
    region: 'England',
    city: 'London',
    address: '10 Downing Street',
    postalCode: 'SW1A 2AA',
    birthDate: '1984-12-03',
    phoneNumber: '9876543210',
    idNumber: 'D1234567',
    userRole: 'common',
    isActive: true,
    image: {
      imageId: 'e13219a6-f20e-4bda-93a4-9fe0f10b6655',
      url: 'https://example.com/image4.jpg'
    },
    login: {
      loginId: 'cbe60d16-2600-41db-8c20-0b34a3c0c5fb',
      email: 'sophiawilson@example.com',
      password: '$2b$10$wj0rWvntanDUN0eD7tczMOzEjM93QJ7ej9ixziHfsYOfspgE9ek7.',
      verify: false
    }
  },
  {
    userId: 'f3f33a1e-7a32-4cd7-9b4a-5969c9a449f5',
    firstName: 'James',
    lastName: 'Taylor',
    country: 'Australia',
    region: 'New South Wales',
    city: 'Sydney',
    address: '321 Elm St',
    postalCode: '2000',
    birthDate: '1990-07-18',
    phoneNumber: '1234567890',
    idNumber: 'E9876543',
    userRole: 'common',
    isActive: true,
    image: {
      imageId: 'a139fa4f-cc4f-47e2-88f1-f6b756b4f926',
      url: 'https://example.com/image5.jpg'
    },
    login: {
      loginId: 'a9d75b9d-4e6d-4a17-9b17-b4d943775d1d',
      email: 'jamestaylor@example.com',
      password: '$2b$10$XzJUZPwFZYjCpCOOrUk1FOY2IIMKnYvksLsh/Kzq9XlmtB6TVYqGG',
      verify: false
    }
  },
  {
    userId: '05e0c3c7-4c67-4b76-b3fe-1571482d18ed',
    firstName: 'Olivia',
    lastName: 'Anderson',
    country: 'Canada',
    region: 'Quebec',
    city: 'Montreal',
    address: '789 Oak St',
    postalCode: 'H2X 1X9',
    birthDate: '1993-11-27',
    phoneNumber: '9876543210',
    idNumber: 'F6543219',
    userRole: 'common',
    isActive: true,
    image: {
      imageId: 'cb5af298-4a37-4e39-8e99-6e7c90b46425',
      url: 'https://example.com/image6.jpg'
    },
    login: {
      loginId: 'b0139b9f-2550-4781-8d6e-26b77e3e15db',
      email: 'oliviaanderson@example.com',
      password: '$2b$10$hRDLWEfnTh8Gv0dYqHOhrO56lFCtIdzUW2vB3eJZp9y8trR5gsK2.',
      verify: false
    }
  },
  {
    userId: 'e7ac4a36-9b20-45cd-9f37-79259a940d23',
    firstName: 'Noah',
    lastName: 'Martinez',
    country: 'United States',
    region: 'Texas',
    city: 'Houston',
    address: '456 Elm St',
    postalCode: '77001',
    birthDate: '1998-02-07',
    phoneNumber: '1239874560',
    idNumber: 'G1234567',
    userRole: 'common',
    isActive: true,
    image: {
      imageId: '64f5ff30-8236-4a25-ae2b-40b7e11a81ea',
      url: 'https://example.com/image7.jpg'
    },
    login: {
      loginId: 'a598aa55-df03-432d-8e10-6b7efc57a0c3',
      email: 'noahmartinez@example.com',
      password: '$2b$10$e67EO7yxX3SMHGQ3lBGbzu6mo2C/HW5.EHhSwPKrK6Mf0nXZrFkeC',
      verify: false
    }
  },
  {
    userId: '2c2be372-9d88-4860-9880-8990d089ebdd',
    firstName: 'Isabella',
    lastName: 'Garcia',
    country: 'Mexico',
    region: 'Jalisco',
    city: 'Guadalajara',
    address: '321 Oak St',
    postalCode: '44100',
    birthDate: '1991-06-14',
    phoneNumber: '1234567890',
    idNumber: 'H9876543',
    userRole: 'common',
    isActive: true,
    image: {
      imageId: '00d57e37-8f6e-4282-8f0e-1f90b8c297a7',
      url: 'https://example.com/image8.jpg'
    },
    login: {
      loginId: 'c45e5126-8b29-46a3-96fe-95baf216bb4f',
      email: 'isabellagarcia@example.com',
      password: '$2b$10$B7QJYwwZN7H0u1S.0JYVHuY.XaO6CE44t7aVDDAOMCqXJ7Xe8LUgW',
      verify: false
    }
  },
  {
    userId: 'b1fb3ff2-6d59-4d7b-b2c5-29a40a753139',
    firstName: 'William',
    lastName: 'Davis',
    country: 'United States',
    region: 'Florida',
    city: 'Miami',
    address: '789 Elm St',
    postalCode: '33101',
    birthDate: '1989-09-01',
    phoneNumber: '9876543210',
    idNumber: 'I6543219',
    userRole: 'common',
    isActive: true,
    image: {
      imageId: '55648c85-ee34-4457-bf1d-3f5e4ad3a4e6',
      url: 'https://example.com/image9.jpg'
    },
    login: {
      loginId: 'f5a0cc43-5a59-4b11-8fb1-449a6d70b273',
      email: 'williamdavis@example.com',
      password: '$2b$10$QuNZn0vmlwHKg9JFEJvKo.TVBLK2l56UCz.ZhWqCN2P0.wxxj2XMC',
      verify: false
    }
  },
  {
    userId: 'f933d128-1a57-4740-bff9-5fd21e90320f',
    firstName: 'Mia',
    lastName: 'Lopez',
    country: 'Spain',
    region: 'Madrid',
    city: 'Madrid',
    address: '456 Oak St',
    postalCode: '28001',
    birthDate: '1994-04-30',
    phoneNumber: '1234567890',
    idNumber: 'J1234567',
    userRole: 'common',
    isActive: true,
    image: {
      imageId: '12665e7c-30d6-459f-b879-94f98c73a942',
      url: 'https://example.com/image10.jpg'
    },
    login: {
      loginId: '0b45e034-8d82-4766-9a4e-1a4f3eb8b261',
      email: 'mialopez@example.com',
      password: '$2b$10$zOjgdMoXkczN5lsB1b9UDe.o4D9ODK8Q4JN33xIMAZWdAk/VqPOai',
      verify: false
    }
  }
];

module.exports = users;