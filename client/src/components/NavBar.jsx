import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCategories, filterProductsByCategory } from '@/redux/actions';
import { useRouter } from 'next/router';

function NavBarGuest({ typeUser }) {

  const router = useRouter();
  const currentLocation = router.asPath;
  const dispatch = useDispatch();
  const linkToCart = currentLocation === "/guest/Products" ? "../users/ShopCart" : "/users/ShopCart";
  
  const { category } = router.query;
  const totalProducts = useSelector(state => state.totalProducts);
  const categories = useSelector(state => state.categories);
  const [newCategories, setNewCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubcategory, setActiveSubcategory] = useState(null);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    if (category) {
      console.log(category)
      dispatch(filterProductsByCategory(category));
    }
  }, [category]);

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

  function handleMouseEnter(index) {
    setActiveCategory(index);
  }

  function handleMouseLeave() {
    if (activeSubcategory) {
      setActiveCategory(null);
    } else if (activeCategory && !activeSubcategory) {
      setActiveCategory(null);
    }
  }

  function handleMouseEnterSub(subIndex) {
    setActiveSubcategory(subIndex);
  }

  function handleMouseLeaveSub() {
    if (!activeSubcategory) {
      setActiveSubcategory(null);
    }
  }

  return (
    <nav aria-label="Top" className="bg-gradient-to-r from-indigo-950 to-indigo-950 via-indigo-900 to-indigo-900 mx-auto px-4 sm:px-6 lg:px-8 w-full flex h-16 items-center justify-center fixed top-16 left-0 z-10">
      <Link href="/" className="rounded-md bg-blue-950 p-2 lg:hidden">
        <span className="sr-only">Open menu</span>
        <svg className="h-6 w-6 text-white " fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </Link>

      <div className="hidden lg:block lg:self-stretch">
        <div className="flex h-full flex items-center">
          {newCategories.map((category, index) => (
            <div
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              className="relative group h-full"
            >
              <Link
                href={{
                  pathname: `/${typeUser}/Products`,
                  query: { category: category.name },
                }}
                className={`flex items-center justify-center h-full w-full px-5 text-sm font-medium hover:bg-white hover:text-gray-900 focus:outline-none ${activeCategory === index ? 'bg-white text-gray-900' : 'text-white'}`}
              >
                {category.name}
              </Link>
              <span className="h-px w-full bg-gray-200" aria-hidden="true" />

              {activeCategory === index && category.subcategories.length > 0 && (
                <div
                  className="absolute top-full px-2 py-1 sm:px-0 sm:w-56 lg:w-64 z-10 bg-white shadow-lg rounded-bl-md rounded-br-md border-t"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  {category.subcategories?.map((subcategory, subIndex) => (
                    <div
                      key={subIndex}
                      onMouseEnter={() => handleMouseEnterSub(subIndex)}
                      onMouseLeave={handleMouseLeaveSub}
                      className="relative block px-6 py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
                    >
                      <Link
                        href={{
                          pathname: `/${typeUser}/Products`,
                          query: { category: subcategory.name },
                        }}
                      >
                        {subcategory.name}
                      </Link>
                      {activeSubcategory === subIndex && subcategory.subcategories.length > 0 && (
                        <div
                          className="absolute left-full top-[-4px] px-2 py-1 sm:px-0 sm:w-56 lg:w-64 z-10 bg-white shadow-lg rounded-md"
                          onMouseEnter={() => handleMouseEnterSub(subIndex)}
                          onMouseLeave={handleMouseLeaveSub}
                        >
                          {subcategory.subcategories?.map((subSubCategory, subSubIndex) => (
                            <Link
                              key={subSubIndex}
                              href={{
                                pathname: `/${typeUser}/Products`,
                                query: { category: subSubCategory },
                              }}
                              className="block px-6 py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
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

          <span className="h-6 w-px mx-5 bg-gray-200" aria-hidden="true" />

          {typeUser === "guest" && (
            <Link href="/" className="flex h-full px-5 items-center text-sm text-white font-medium hover:bg-white hover:text-gray-900">
              Home
            </Link>
          )}

          {typeUser === "guest" && (
            <Link href={`/about`} className="flex h-full px-5 items-center text-sm text-white font-medium hover:bg-white hover:text-gray-900">
              Company
            </Link>
          )}

          <div className="relative h-full">
            {typeUser === "users" && (
              <button
                onMouseEnter={() => handleMouseEnter("My account")}
                onMouseLeave={handleMouseLeave}
                className={`flex h-full px-5 items-center text-sm font-medium hover:bg-white hover:text-gray-900 ${activeCategory === "My account" ? 'bg-white text-gray-900' : 'text-white'}`}
              >
                My account
              </button>
            )}

            {activeCategory === "My account" && (
              <div
                className="absolute top-full px-2 sm:px-0 sm:w-56 lg:w-64 z-10 bg-white shadow-lg rounded-bl-md rounded-br-md border-t"
                onMouseEnter={() => handleMouseEnter("My account")}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={`/${typeUser}/Profile`}
                  className=" relative block px-6 py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
                >
                  My profile
                </Link>
                <Link
                  href={`/${typeUser}/Purchases`}
                  className=" relative block px-6 py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
                >
                  My purchases
                </Link>
                <Link
                  href={`/${typeUser}/Invoices`}
                  className=" relative block px-6 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 mb-1"
                >
                  Invoices
                </Link>
              </div>
            )}
          </div>

          {typeUser === "users" && (
            <Link href={`/${typeUser}/Notificacions`} className="group flex items-center h-full px-5 hover:bg-white text-white">
              <span className="material-symbols-rounded group-hover:text-gray-900 font-bold">
                notifications
              </span>
              <span className="ml-2 text-sm font-medium group-hover:text-gray-800">0</span>
              <span className="sr-only">view notifications</span>
            </Link>
          )}

          {typeUser === "users" && (
            <Link href={`/${typeUser}/Favorites`} className="group flex items-center h-full px-5 hover:bg-white text-white">
              <span className="material-symbols-rounded group-hover:text-gray-900 font-bold">
                favorite
              </span>
              <span className="w-full ml-2 text-sm font-medium group-hover:text-gray-800">0</span>
              <span className="sr-only">items in favorites, view bag</span>
            </Link>
          )}

          {typeUser === "users" && (
            <Link href={linkToCart} className="group flex items-center h-full px-5 hover:bg-white text-white">
              <span className="material-symbols-rounded group-hover:text-gray-900 font-bold">
                shopping_cart
              </span>
              <span className="ml-2 text-sm font-medium group-hover:text-gray-800">{totalProducts}</span>
              <span className="sr-only">items in cart, view bag</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBarGuest;

