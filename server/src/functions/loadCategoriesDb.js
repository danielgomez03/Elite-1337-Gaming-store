const { sequelize, Category } = require('../database');

// NOTE: this function/script can instead be implemented as a controller/handler

// Hardcoded categories
const categories = [
    {
        name: 'Hardware',
        isMainCategory: true,
        
        subcategories: [
            {
                name: 'CPUs/Processors',
            },
            {
                name: 'Motherboards',
            },
            {
                name: 'Graphics/Video Cards',
            },
            {
                name: 'Storage',
                subcategories: [
                    {
                        name: 'External Hard Disk Drives',
                    },
                    {
                        name: 'Internal Hard Disk Drives',
                    },
                    {
                        name: 'Solid State Drives',
                    },
                    {
                        name: 'DVD/Blu-Ray',
                    },
                    {
                        name: 'USB Drives',
                    },
                    {
                        name: 'MicroSD',
                    },
                ],
            },
            {
                name: 'Cooling',
                subcategories: [
                    {
                        name: 'CPU Coolers',
                    },
                    {
                        name: 'Case Fans',
                    },
                    {
                        name: 'Thermal Pastes',
                    },
                ],
            },
            {
                name: 'RAM Memory',
                subcategories: [
                    {
                        name: 'DIMM (DDR3, DDR4)',
                    },
                    {
                        name: 'SO-DIMM',
                    },
                ],
            },
            {
                name: 'Cases and Power Supplies',
                subcategories: [
                    {
                        name: 'Cases',
                    },
                    {
                        name: 'Power Supplies',
                    },
                ],
            },
        ],
    },
    {
        name: 'Monitors',
        isMainCategory: true,
        subcategories: [
            {
                name: 'Monitors',
            },
            {
                name: 'Gaming Monitors',
            },
        ],
    },
    {
        name: 'Peripherals and Accessories',
        isMainCategory: true,
        subcategories: [
            {
                name: 'Headphones',
            },
            {
                name: 'Keyboard/Mouse Kits',
            },
            {
                name: 'Keyboards',
            },
            {
                name: 'Mouse', // "Mice" just doesn't sound right!
            },
            {
                name: 'Mouse Pads',
            },
            {
                name: 'Microphones',
            },
            {
                name: 'Speakers',
            },
            {
                name: 'Joysticks',
            },
            {
                name: 'Webcams',
            },
            {
                name: 'Connectivity',
            },
            {
                name: 'Graphic Tablets',
            },
            {
                name: 'Gaming Chairs',
            },
        ],
    },
    {
        name: 'Laptops/Tablets',
        isMainCategory: true,
    },
    {
        name: 'On Sale',
        isMainCategory: true,
    },
];

// Recursive function to create categories and subcategories
const createCategories = async (categories, parentId = null) => {
    for (const categoryData of categories) {
      const { name, subcategories } = categoryData;
      const category = await Category.create({ name, parentId, isMainCategory: !parentId });
      if (subcategories && subcategories.length > 0) {
        await createCategories(subcategories, category.categoryId);
      }
    }
};
  
// Load categories into the database
const loadCategories = async (req, res) => {
    try {
        // await sequelize.sync({ force: true }); // Drops existing tables and recreates them
        await createCategories(categories);
        console.log('Categories loaded successfully.');
        res.status(200).send('Categories loaded successfully.');

    } catch (error) {
        console.error('Error loading categories:', error);
        res.status(500).send('Error loading categories:', error);

    }
};

// const loadCategories = async () => {
//     try {
//         // await sequelize.sync({ force: true }); // Drops existing tables and recreates them
//         await createCategories(categories);
//         console.log('Categories loaded successfully.');
        
//     } catch (error) {
//         console.error('Error loading categories:', error);
        
//     // } finally {
//     //     sequelize.close();
//     }
    
// };

// loadCategories();

module.exports = loadCategories;


// module.exports = {
//     createCategories,
//     loadCategories,
//     categories,
// };