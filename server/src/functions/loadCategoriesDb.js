const { sequelize, Category } = require('../database');

// NOTE: this function/script can instead be implemented as a controller/handler

// Hardcoded categories
const categories = [
    {
        name: 'Hardware',
        isMainCategory: true,
        parentId: null,
        subcategories: [
            {
                name: 'CPUs/Processors',
                parentId: null,
            },
            {
                name: 'Motherboards',
                parentId: null,
            },
            {
                name: 'Graphics/Video Cards',
                parentId: null,
            },
            {
                name: 'Storage',
                parentId: null,
                subcategories: [
                    {
                        name: 'External Hard Disk Drives',
                        parentId: null,
                    },
                    {
                        name: 'Internal Hard Disk Drives',
                        parentId: null,
                    },
                    {
                        name: 'Solid State Drives',
                        parentId: null,
                    },
                    {
                        name: 'DVD/Blu-Ray',
                        parentId: null,
                    },
                    {
                        name: 'USB Drives',
                        parentId: null,
                    },
                    {
                        name: 'MicroSD',
                        parentId: null,
                    },
                ],
            },
            {
                name: 'Cooling',
                parentId: null,
                subcategories: [
                    {
                        name: 'CPU Coolers',
                        parentId: null,
                    },
                    {
                        name: 'Case Fans',
                        parentId: null,
                    },
                    {
                        name: 'Thermal Pastes',
                        parentId: null,
                    },
                ],
            },
            {
                name: 'RAM Memory',
                parentId: null,
                subcategories: [
                    {
                        name: 'DIMM (DDR3, DDR4)',
                        parentId: null,
                    },
                    {
                        name: 'SO-DIMM',
                        parentId: null,
                    },
                ],
            },
            {
                name: 'Cases and Power Supplies',
                parentId: null,
                subcategories: [
                    {
                        name: 'Cases',
                        parentId: null,
                    },
                    {
                        name: 'Power Supplies',
                        parentId: null,
                    },
                ],
            },
        ],
    },
    {
        name: 'Monitors',
        isMainCategory: true,
        parentId: null,
        subcategories: [
            {
                name: 'Monitors',
                parentId: null,
            },
            {
                name: 'Gaming Monitors',
                parentId: null,
            },
        ],
    },
    {
        name: 'Peripherals and Accessories',
        isMainCategory: true,
        parentId: null,
        subcategories: [
            {
                name: 'Headphones',
                parentId: null,
            },
            {
                name: 'Keyboard/Mouse Kits',
                parentId: null,
            },
            {
                name: 'Keyboards',
                parentId: null,
            },
            {
                name: 'Mouse', // "Mice" just doesn't sound right!
                parentId: null,
            },
            {
                name: 'Mouse Pads',
                parentId: null,
            },
            {
                name: 'Microphones',
                parentId: null,
            },
            {
                name: 'Speakers',
                parentId: null,
            },
            {
                name: 'Joysticks',
                parentId: null,
            },
            {
                name: 'Webcams',
                parentId: null,
            },
            {
                name: 'Connectivity',
                parentId: null,
            },
            {
                name: 'Graphic Tablets',
                parentId: null,
            },
            {
                name: 'Gaming Chairs',
                parentId: null,
            },
        ],
    },
    {
        name: 'Laptops/Tablets',
        isMainCategory: true,
        parentId: null,
    },
    {
        name: 'On Sale',
        isMainCategory: true,
        parentId: null,
    },
];

// Recursive function to create categories and subcategories
const createCategories = async (categories, parentId = null) => {
    for (const categoryData of categories) {
        const { name, subcategories } = categoryData;

        // Check if category with the same name already exists
        const existingCategory = await Category.findOne({ where: { name, parentId } });

        if (existingCategory) {
            // Category already exists, update its parentId if necessary
            existingCategory.parentId = parentId;
            await existingCategory.save();
        } else {
            // Category doesn't exist, create a new one
            const category = await Category.create({ name, parentId, isMainCategory: !parentId });

            if (subcategories && subcategories.length > 0) {
                await createCategories(subcategories, category.categoryId);
            }
        }
    }
};
  
// Load categories into the database
const loadCategories = async (req, res) => {
    try {
        await createCategories(categories);
        console.log('Categories loaded successfully.');
        res.status(200).send('Categories loaded successfully.');

    } catch (error) {
        console.error('Error loading categories:', error);
        res.status(500).send('Error loading categories:', error);
    }
};

module.exports = loadCategories;