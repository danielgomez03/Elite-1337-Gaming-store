import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCategories, filterProductsByCategory } from '@/redux/actions';
import { useRouter } from 'next/router';

function NavBar({ typeUser }) {

  const router = useRouter();
  const currentLocation = router.asPath;
  const dispatch = useDispatch();
  const linkToCart = currentLocation === "/users/Products" ? "../users/ShopCart" : "/users/ShopCart";
  const { category } = router.query;
  const [newCategories, setNewCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const [activeSubSubcategory, setActiveSubSubcategory] = useState(null);
  const cart = useSelector(state => state.cartUser)
  const totalProducts = () => {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      total += cart[i].quantity;
    };
    return total;
  };

  // PARA USO LOCAL SIN BACK
  /* const categories = [
    {
      "categoryId": 1,
      "name": "Hardware",
      "isMainCategory": true,
      "parentId": null
    },
    {
      "categoryId": 2,
      "name": "CPUs/Processors",
      "isMainCategory": false,
      "parentId": 1
    },
    {
      "categoryId": 3,
      "name": "Motherboards",
      "isMainCategory": false,
      "parentId": 1
    },
    {
      "categoryId": 4,
      "name": "Graphics/Video Cards",
      "isMainCategory": false,
      "parentId": 1
    },
    {
      "categoryId": 5,
      "name": "Storage",
      "isMainCategory": false,
      "parentId": 1
    },
    {
      "categoryId": 6,
      "name": "External Hard Disk Drives",
      "isMainCategory": false,
      "parentId": 5
    },
    {
      "categoryId": 7,
      "name": "Internal Hard Disk Drives",
      "isMainCategory": false,
      "parentId": 5
    },
    {
      "categoryId": 8,
      "name": "Solid State Drives",
      "isMainCategory": false,
      "parentId": 5
    },
    {
      "categoryId": 9,
      "name": "DVD/Blu-Ray",
      "isMainCategory": false,
      "parentId": 5
    },
    {
      "categoryId": 10,
      "name": "USB Drives",
      "isMainCategory": false,
      "parentId": 5
    },
    {
      "categoryId": 11,
      "name": "MicroSD",
      "isMainCategory": false,
      "parentId": 5
    },
    {
      "categoryId": 12,
      "name": "Cooling",
      "isMainCategory": false,
      "parentId": 1
    },
    {
      "categoryId": 13,
      "name": "CPU Coolers",
      "isMainCategory": false,
      "parentId": 12
    },
    {
      "categoryId": 14,
      "name": "Case Fans",
      "isMainCategory": false,
      "parentId": 12
    },
    {
      "categoryId": 15,
      "name": "Thermal Pastes",
      "isMainCategory": false,
      "parentId": 12
    },
    {
      "categoryId": 16,
      "name": "RAM Memory",
      "isMainCategory": false,
      "parentId": 1
    },
    {
      "categoryId": 17,
      "name": "DIMM (DDR3, DDR4)",
      "isMainCategory": false,
      "parentId": 16
    },
    {
      "categoryId": 18,
      "name": "SO-DIMM",
      "isMainCategory": false,
      "parentId": 16
    },
    {
      "categoryId": 19,
      "name": "Cases and Power Supplies",
      "isMainCategory": false,
      "parentId": 1
    },
    {
      "categoryId": 20,
      "name": "Cases",
      "isMainCategory": false,
      "parentId": 19
    },
    {
      "categoryId": 21,
      "name": "Power Supplies",
      "isMainCategory": false,
      "parentId": 19
    },
    {
      "categoryId": 22,
      "name": "Monitors",
      "isMainCategory": true,
      "parentId": null
    },
    {
      "categoryId": 23,
      "name": "Standard Monitors",
      "isMainCategory": false,
      "parentId": 22
    },
    {
      "categoryId": 24,
      "name": "Gaming Monitors",
      "isMainCategory": false,
      "parentId": 22
    },
    {
      "categoryId": 25,
      "name": "Peripherals and Accessories",
      "isMainCategory": true,
      "parentId": null
    },
    {
      "categoryId": 26,
      "name": "Headphones",
      "isMainCategory": false,
      "parentId": 25
    },
    {
      "categoryId": 27,
      "name": "Keyboard/Mouse Kits",
      "isMainCategory": false,
      "parentId": 25
    },
    {
      "categoryId": 28,
      "name": "Keyboards",
      "isMainCategory": false,
      "parentId": 25
    },
    {
      "categoryId": 29,
      "name": "Mouse",
      "isMainCategory": false,
      "parentId": 25
    },
    {
      "categoryId": 30,
      "name": "Mouse Pads",
      "isMainCategory": false,
      "parentId": 25
    },
    {
      "categoryId": 31,
      "name": "Microphones",
      "isMainCategory": false,
      "parentId": 25
    },
    {
      "categoryId": 32,
      "name": "Speakers",
      "isMainCategory": false,
      "parentId": 25
    },
    {
      "categoryId": 33,
      "name": "Joysticks",
      "isMainCategory": false,
      "parentId": 25
    },
    {
      "categoryId": 34,
      "name": "Webcams",
      "isMainCategory": false,
      "parentId": 25
    },
    {
      "categoryId": 35,
      "name": "Connectivity",
      "isMainCategory": false,
      "parentId": 25
    },
    {
      "categoryId": 36,
      "name": "Graphic Tablets",
      "isMainCategory": false,
      "parentId": 25
    },
    {
      "categoryId": 37,
      "name": "Gaming Chairs",
      "isMainCategory": false,
      "parentId": 25
    },
    {
      "categoryId": 38,
      "name": "Laptops/Tablets",
      "isMainCategory": true,
      "parentId": null
    },
    {
      "categoryId": 39,
      "name": "On Sale",
      "isMainCategory": true,
      "parentId": null
    }
  ] */

  // PARA USO CON BACK

  const categories = useSelector(state => state.categories);
  useEffect(() => {
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    if (category) {
      console.log(category)
      dispatch(filterProductsByCategory(category));
    }
  }, [category]);
  ////////////////////////////////////////

  useEffect(() => {
    setNewCategories(convertCategories());
  }, [categories]);


  function convertCategories() {
    const newCategories = [];
    const mainCategories = categories.filter(category => category.parentId === null);

    mainCategories.forEach(mainCategory => {
      const category = {
        name: mainCategory.name,
        subcategories: [],
      };

      const subCategories = categories.filter(category => category.parentId === mainCategory.categoryId);

      subCategories.forEach(subCategory => {
        const subcategory = {
          name: subCategory.name,
          subcategories: [],
        };

        const subSubCategories = categories.filter(category => category.parentId === subCategory.categoryId);

        subSubCategories.forEach(subSubCategory => {
          subcategory.subcategories.push(subSubCategory.name);
        });

        category.subcategories.push(subcategory);
      });

      newCategories.push(category);
    });

    return newCategories;
  }

  const handleMouseEnter = (index) => {
    setActiveCategory(index);
  };

  // Función para desactivar la categoría
  const handleMouseLeave = () => {
    setActiveCategory(null);
    setActiveSubcategory(null);
  };

  // Función para activar la subcategoría
  const handleMouseEnterSub = (subIndex) => {
    // Verificar si hay una sub-subcategoría activa
    if (activeSubcategory === null) {
      setActiveSubcategory(subIndex);
    }
  };

  // Función para desactivar la subcategoría
  const handleMouseLeaveSub = () => {
    if (!activeCategory && !activeSubSubcategory) {
      setActiveSubcategory(null);
    }
  };

  // Función para activar la subcategoría
  const handleMouseEnterSubSub = (subIndex) => {
    setActiveSubSubcategory(subIndex);
  };

  // Función para desactivar la subcategoría
  const handleMouseLeaveSubSub = () => {
    setActiveSubSubcategory(null);
  };


  const [view, setView] = useState(true);

  return (
    <nav
      aria-label="Top"
      className="bg-gradient-to-r from-indigo-950 to-indigo-950 via-indigo-900 to-indigo-900 mx-auto px-4 sm:px-6 lg:px-8 w-full flex h-16 items-center justify-center fixed top-16 left-0 z-10">
      {/* <!-- Mobile menu toggle --> */}
      <button
        onClick={() => setView(!view)}
        className="w-full flex justify-center rounded-md lg:hidden px-4">
        <span className="sr-only">Open menu</span>
        <svg
          className="h-6 w-6 text-white "
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          aria-hidden="true">
          <path
            strokeLinecap="round"
            strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>

      {/* <!-- Flyout menus --> */}
      <div className={`${view ? "hidden" : ""} absolute h-full w-full lg:flex items-center justify-center lg:mt-0 mt-32`}>
        {newCategories.map((category, index) => (
          <div
            key={index}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            className="relative group h-full lg:w-auto w-full"
          >
            <Link
              href={{
                pathname: `/${typeUser}/Products`,
                query: { category: category.name },
              }}
              className={`flex items-center justify-center h-full w-full px-5 text-sm font-medium lg:bg-transparent bg-white text-gray-900 hover:bg-white hover:text-gray-900 focus:outline-none ${activeCategory === index ? 'lg:bg-white lg:text-gray-900' : 'lg:text-white'}`}
            >
              {category.name}
            </Link>
            <span className="h-px w-full bg-gray-200" aria-hidden="true" />

            {activeCategory === index && category.subcategories.length > 0 && (
              <div
                className="hidden lg:block absolute top-full py-1 lg:w-64 z-10 bg-white shadow-lg rounded-bl-md rounded-br-md border-t"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                {category.subcategories?.map((subcategory, subIndex) => (
                  <div
                    key={subIndex}
                    onMouseEnter={() => handleMouseEnterSub(subIndex)}
                    onMouseLeave={handleMouseLeaveSub}
                    className="relative flex items-center justify-between px-6 py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
                  >
                    <Link
                      href={{
                        pathname: `/${typeUser}/Products`,
                        query: { category: subcategory.name },
                      }}
                    >
                      {subcategory.name}
                    </Link>
                    <span class={`material-symbols-rounded text-lg text-gray-300 ${subcategory.subcategories.length > 0 ? '' : 'hidden'}`}>
                      read_more
                    </span>
                    {activeSubcategory === subIndex && subcategory.subcategories.length > 0 && (
                      <div
                        className="absolute left-full top-[-4px] py-1 lg:w-64 z-10 bg-white shadow-lg rounded-md"
                        onMouseEnter={() => handleMouseEnterSubSub(subIndex)}
                        onMouseLeave={handleMouseLeaveSubSub}
                      >
                        {subcategory.subcategories?.map((subSubCategory, subSubIndex) => (
                          <Link
                            key={subSubIndex}
                            href={{
                              pathname: `/${typeUser}/Products`,
                              query: { category: subSubCategory },
                            }}
                            className="block px-6 py-3 text-sm hover:bg-gray-100 hover:text-gray-900"
                          >
                            {subSubCategory}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        <span className="lg:block lg:h-6 lg:w-px mx-5 bg-gray-200 block h-px w-full" aria-hidden="true" />

        {typeUser === "guest" && (
          <Link
            href="/Home"
            className="flex h-full px-5 items-center justify-center text-sm lg:text-white font-medium lg:bg-transparent bg-white hover:bg-white hover:text-gray-900">
            Home
          </Link>
        )}

        {typeUser === "guest" && (
          <Link
            href={`/about`}
            className="flex h-full px-5 items-center justify-center text-sm lg:text-white font-medium lg:bg-transparent bg-white hover:bg-white hover:text-gray-900">
            Company
          </Link>
        )}

        <div className='relative h-full'>
          {typeUser === "users" && (
            <button
              onMouseEnter={() => handleMouseEnter("My account")}
              onMouseLeave={handleMouseLeave}
              className={`flex w-full h-full px-5 items-center justify-center text-sm font-medium lg:bg-transparent bg-white hover:bg-white hover:text-gray-900 ${activeCategory === "My account" ? 'lg:bg-white text-gray-900' : 'lg:text-white'}`}>
              My account
            </button>
          )}
          {activeCategory === "My account" && (
            <div
              className="hidden lg:block absolute top-full lg:w-64 z-10 bg-white shadow-lg rounded-bl-md rounded-br-md border-t"
              onMouseEnter={() => handleMouseEnter("My account")}
              onMouseLeave={handleMouseLeave}>
              <Link
                href={`/${typeUser}/Profile`}
                className=" relative block px-6 py-2 text-sm hover:bg-gray-100 lg:bg-transparent bg-white hover:text-gray-900" >
                My profile
              </Link>
              <Link
                href={`/${typeUser}/Purchases`}
                className=" relative block px-6 py-2 text-sm hover:bg-gray-100 lg:bg-transparent bg-white hover:text-gray-900" >
                My purchases
              </Link>
              <Link
                href={`/${typeUser}/Invoices`}
                className=" relative block px-6 py-2 text-sm hover:bg-gray-100 lg:bg-transparent bg-white hover:text-gray-900 mb-1" >
                Invoices
              </Link>
            </div>
          )}
        </div>

        {typeUser === "users" && (
          <Link
            href={`/${typeUser}/Notificacions`}
            className="group flex items-center justify-center h-full px-5 lg:bg-transparent bg-white hover:bg-white lg:text-white">
            <span className="material-symbols-rounded group-hover:text-gray-900 text-lg">
              notifications
            </span>
            <span className="ml-2 text-sm font-medium group-hover:text-gray-800">0</span>
            <span className="sr-only">view notifications</span>
          </Link>
        )}

        {typeUser === "users" && (
          <Link
            href={`/${typeUser}/Favorites`}
            className="group flex items-center justify-center h-full px-5 lg:bg-transparent bg-white hover:bg-white lg:text-white">
            <span className="material-symbols-rounded group-hover:text-gray-900 text-lg">
              favorite
            </span>
            <span className="ml-2 text-sm font-medium group-hover:text-gray-800">0</span>
            <span className="sr-only">items in favorites, view bag</span>
          </Link>
        )}

        {typeUser === "users" && (
          <Link href={linkToCart} className="group flex items-center justify-center h-full px-5 lg:bg-transparent bg-white hover:bg-white lg:text-white">
            <span className="material-symbols-rounded group-hover:text-gray-900 text-lg">
              shopping_cart
            </span>
            <span className="ml-2 text-sm font-medium group-hover:text-gray-800">{totalProducts()}</span>
            <span className="sr-only">items in cart, view bag</span>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
