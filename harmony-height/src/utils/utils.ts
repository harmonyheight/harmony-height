export const homeImages = ['/home1.jpg', '/home2.jpg', '/home3.jpg'];
export const dummyData = [
  {
    firstName: 'Naman',
    lastName: 'Sharma',
    email: 'namansharmaca2@gmail.com',
    state: 'Ontario',
    city: 'Toronto',
    zipCode: 'N3T 0P8',
    age: '2003',
    space: '5',
    parkingAvailability: 'Yes',
    utilities: ['Light', 'Water', 'Wifi'],
    propertyType: 'Buy',
    leaseOptions: 'Available for lease (1 Year)',
    photos: homeImages,
  },
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    state: 'Alberta',
    city: 'Calgary',
    zipCode: 'T2E 6L7',
    age: '1990',
    space: '7',
    parkingAvailability: 'No',
    utilities: ['Light', 'Water'],
    propertyType: 'Rent',
    leaseOptions: 'Not available',
    photos: homeImages,
  },
  // Add more objects as needed
];

// Access the data
console.log(dummyData[0].firstName); // Output: "Naman"
console.log(dummyData[1].city); // Output: "Calgary"
