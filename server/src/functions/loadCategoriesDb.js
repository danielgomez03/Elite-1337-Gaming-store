const { sequelize, Category } = require('../database');

// NOTE: this function/script can instead be implemented as a controller/handler

// Hardcoded categories
const categories = [
    {
        name: 'Hardware',
        isMainCategory: true,
        
        subcategories: [
            {
                name: 'Procesadores (CPU)',
            },
            {
                name: 'Placas Madre (Motherboards)',
            },
            {
                name: 'Placas de Video (GPU)',
            },
            {
                name: 'Almacenamiento',
                subcategories: [
                    {
                        name: 'Disco Rígido Externo',
                    },
                    {
                        name: 'Disco Interno Mecánico',
                    },
                    {
                        name: 'Disco SSD / SSD M.2',
                    },
                    {
                        name: 'Ópticos (DVD / Blu-Ray)',
                    },
                    {
                        name: 'Pen Drives',
                    },
                    {
                        name: 'MicroSD',
                    },
                ],
            },
            {
                name: 'Cooling / Refrigeración',
                subcategories: [
                    {
                        name: 'Coolers CPU',
                    },
                    {
                        name: 'Coolers Gabinete',
                    },
                    {
                        name: 'Pastas Térmicas',
                    },
                ],
            },
            {
                name: 'Memorias RAM',
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
                name: 'Gabinetes, Fuentes y Alimentación',
                subcategories: [
                    {
                        name: 'Gabinetes',
                    },
                    {
                        name: 'Fuentes',
                    },
                    {
                        name: 'Alimentación',
                    },
                ],
            },
        ],
    },
    {
        name: 'Monitores',
        isMainCategory: true,
        subcategories: [
            {
                name: 'Monitores',
            },
            {
                name: 'Monitores Gamer',
            },
        ],
    },
    {
        name: 'Periféricos y Accesorios',
        isMainCategory: true,
        subcategories: [
            {
                name: 'Auriculares',
            },
            {
                name: 'Kit Teclado/Mouse',
            },
            {
                name: 'Teclado',
            },
            {
                name: 'Mouse',
            },
            {
                name: 'Mouse Pads',
            },
            {
                name: 'Micrófonos',
            },
            {
                name: 'Parlantes',
            },
            {
                name: 'Joysticks',
            },
            {
                name: 'Webcams',
            },
            {
                name: 'Conectividad',
            },
            {
                name: 'Tabletas Digitalizadoras',
            },
            {
                name: 'Sillas Gamer',
            },
        ],
    },
    {
        name: 'Notebooks / Tablets',
        isMainCategory: true,
    },
    {
        name: 'Ofertas',
        isMainCategory: true,
    },
];

// Recursive function to create categories and subcategories
const createCategories = async (categories, parentId = null) => {
    for (const categoryData of categories) {
      const { name, subcategories } = categoryData;
      const category = await Category.create({ name, parentId });
      if (subcategories && subcategories.length > 0) {
        await createCategories(subcategories, category.categoryId);
      }
    }
};
  
// Load categories into the database
const loadCategories = async () => {
    try {
        // await sequelize.sync({ force: true }); // Drops existing tables and recreates them
        await createCategories(categories);
        console.log('Categories loaded successfully.');
    } catch (error) {
        console.error('Error loading categories:', error);
    } finally {
        sequelize.close();
    }
};

loadCategories();

module.exports = {
    createCategories,
    loadCategories,
    categories,
};