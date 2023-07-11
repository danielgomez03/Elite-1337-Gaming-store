import React, { useEffect, useState } from "react";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001";

function UserMetrics() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  // Metrics Functions
  const getTotalRegisteredUsers = (users) => {
    return users.length;
  };

  const getTotalLoggedInUsers = (users) => {
    const loggedInUsers = users.filter((user) => user.token);
    return loggedInUsers.length;
  };

  const getTotalActiveUsers = (users) => {
    const activeUsers = users.filter((user) => user.isActive);
    return activeUsers.length;
  };

  const getTotalDisabledUsers = (users) => {
    const disabledUsers = users.filter((user) => !user.isActive);
    return disabledUsers.length;
  };

  const getBuyerUsers = (users) => {
    const buyerUsers = users.filter(
      (user) => user.userRole === "common" && user.saleHistory,
    );
    return buyerUsers;
  };

  const orderUsersByLocation = (users, orderBy) => {
    const sortedUsers = [...users].sort((a, b) => {
      const locationA = getLocationString(a);
      const locationB = getLocationString(b);
      return locationA.localeCompare(locationB);
    });
    return sortedUsers;
  };

  const getLocationString = (user) => {
    return `${user.country}, ${user.region}, ${user.city}`;
  };

  // Metrics Calculation
  const totalRegisteredUsers = getTotalRegisteredUsers(users);
  const totalLoggedInUsers = getTotalLoggedInUsers(users);
  const totalActiveUsers = getTotalActiveUsers(users);
  const totalDisabledUsers = getTotalDisabledUsers(users);
  const buyerUsers = getBuyerUsers(users);
  const usersOrderedByLocation = orderUsersByLocation(users, "asc");

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">User Metrics</h2>

      <div>
        <p className="text-gray-500">Total registered users:</p>
        <p className="text-gray-900 text-lg font-bold">
          {totalRegisteredUsers}
        </p>
      </div>
      <div>
        <p className="text-gray-500">Total logged-in users:</p>
        <p className="text-gray-900 text-lg font-bold">{totalLoggedInUsers}</p>
      </div>
      <div>
        <p className="text-gray-500">Total active users:</p>
        <p className="text-gray-900 text-lg font-bold">{totalActiveUsers}</p>
      </div>
      <div>
        <p className="text-gray-500">Total disabled users:</p>
        <p className="text-gray-900 text-lg font-bold">{totalDisabledUsers}</p>
      </div>

      <h3 className="text-lg font-bold mt-6">Buyer Users</h3>
      <ul className="mt-2">
        {buyerUsers.map((user) => (
          <li key={user.userId} className="text-gray-900">
            {user.firstName} {user.lastName}
          </li>
        ))}
      </ul>

      <h3 className="text-lg font-bold mt-6">Users Ordered by Location</h3>
      <ul className="mt-2">
        {usersOrderedByLocation.map((user) => (
          <li key={user.userId} className="text-gray-900">
            {user.firstName} {user.lastName}
            <span className="text-gray-500 ml-2">
              Location: {getLocationString(user)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProductMetrics() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  // Metrics Functions
  const getMostSoldProducts = (products) => {
    if (!products || products.length === 0) {
      return [];
    }

    const sortedProducts = [...products].sort(
      (a, b) => (b.saleHistory?.length || 0) - (a.saleHistory?.length || 0),
    );
    return sortedProducts.slice(0, 5); // Return top 5 most sold products
  };

  const getMostCommentedProducts = (products) => {
    if (!products || products.length === 0) {
      return [];
    }

    const sortedProducts = [...products].sort(
      (a, b) => (b.comments?.length || 0) - (a.comments?.length || 0),
    );
    return sortedProducts.slice(0, 5); // Return top 5 most commented products
  };

  const getMostFavoritedProducts = (products) => {
    if (!products || products.length === 0) {
      return [];
    }

    const sortedProducts = [...products].sort(
      (a, b) => (b.favorites?.length || 0) - (a.favorites?.length || 0),
    );
    return sortedProducts.slice(0, 5); // Return top 5 most favorited products
  };

  const getHighestRatedProducts = (products) => {
    if (!products || products.length === 0) {
      return [];
    }

    const sortedProducts = [...products].sort(
      (a, b) => calculateAverageRating(b) - calculateAverageRating(a),
    );
    return sortedProducts.slice(0, 5); // Return top 5 highest rated products
  };

  const getPaymentMethodsUsed = (products) => {
    if (!products || products.length === 0) {
      return [];
    }

    const paymentMethods = new Set();
    products.forEach((product) => {
      product.saleHistory?.forEach((sale) => {
        paymentMethods.add(sale.payment?.paymentMethod);
      });
    });
    return Array.from(paymentMethods);
  };

  const getPriceVariation = (product) => {
    if (!product || !product.priceHistory || product.priceHistory.length <= 1) {
      return 0; // No variation if there's only one price or no price history
    }

    const priceHistory = product.priceHistory;
    const initialPrice = priceHistory[0].price;
    const latestPrice = priceHistory[priceHistory.length - 1].price;
    return ((latestPrice - initialPrice) / initialPrice) * 100;
  };

  // Helper function to calculate average rating
  const calculateAverageRating = (product) => {
    if (!product || !product.ratings || product.ratings.length === 0) {
      return 0;
    }

    const sum = product.ratings.reduce(
      (total, rating) => total + rating.value,
      0,
    );
    return sum / product.ratings.length;
  };

  // Metrics Calculation
  const mostSoldProducts = getMostSoldProducts(products);
  const mostCommentedProducts = getMostCommentedProducts(products);
  const mostFavoritedProducts = getMostFavoritedProducts(products);
  const highestRatedProducts = getHighestRatedProducts(products);
  const paymentMethodsUsed = getPaymentMethodsUsed(products);

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Product Metrics</h2>

      <h3 className="text-lg font-bold mt-6">Most Sold Products</h3>
      <ul className="mt-2">
        {mostSoldProducts.map((product) => (
          <li key={product.productId} className="text-gray-900">
            {product.name}
          </li>
        ))}
      </ul>

      <h3 className="text-lg font-bold mt-6">Most Commented Products</h3>
      <ul className="mt-2">
        {mostCommentedProducts.map((product) => (
          <li key={product.productId} className="text-gray-900">
            {product.name}
          </li>
        ))}
      </ul>

      <h3 className="text-lg font-bold mt-6">Most Favorited Products</h3>
      <ul className="mt-2">
        {mostFavoritedProducts.map((product) => (
          <li key={product.productId} className="text-gray-900">
            {product.name}
          </li>
        ))}
      </ul>

      <h3 className="text-lg font-bold mt-6">Highest Rated Products</h3>
      <ul className="mt-2">
        {highestRatedProducts.map((product) => (
          <li key={product.productId} className="text-gray-900">
            {product.name}
          </li>
        ))}
      </ul>

      <h3 className="text-lg font-bold mt-6">Payment Methods Used</h3>
      <ul className="mt-2">
        {paymentMethodsUsed.map((method) => (
          <li key={method} className="text-gray-900">
            {method}
          </li>
        ))}
      </ul>
    </div>
  );
}

export { UserMetrics, ProductMetrics };
