import React, { useEffect } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import "chartjs-plugin-datalabels";

axios.defaults.baseURL = "http://localhost:3001";

function getRandomColors(length) {
  const colors = [
    "rgba(75, 192, 192, 0.8)",
    "rgba(54, 162, 235, 0.8)",
    "rgba(255, 99, 132, 0.8)",
    "rgba(255, 206, 86, 0.8)",
    "rgba(255, 159, 64, 0.8)",
    "rgba(153, 102, 255, 0.8)",
    "rgba(255, 0, 0, 0.8)", // Red
    "rgba(0, 255, 0, 0.8)", // Green
    "rgba(0, 0, 255, 0.8)", // Blue
    "rgba(255, 255, 0, 0.8)", // Yellow
    "rgba(255, 0, 255, 0.8)", // Magenta
    "rgba(0, 255, 255, 0.8)", // Cyan
  ];

  return Array.from({ length }, (_, index) => colors[index % colors.length]);
}

const UserStatistics = () => {
  useEffect(() => {
    axios
      .get("/users")
      .then((response) => {
        const users = response.data;

        // Chart for Users by Age
        const userAges = users.map((user) => calculateAge(user.birthDate));
        const sortedUserAges = [...userAges].sort((a, b) => a - b);
        const userNames = users
          .map((user) => user.firstName)
          .sort((a, b) => userAges.indexOf(a) - userAges.indexOf(b));
        const colors = getRandomColors(userNames.length);

        const ctxUserAge = document
          .getElementById("userAgeChart")
          .getContext("2d");

        // Destroy existing chart instance
        Chart.getChart(ctxUserAge)?.destroy();

        new Chart(ctxUserAge, {
          type: "line",
          data: {
            labels: userNames,
            datasets: [
              {
                label: "Age",
                data: sortedUserAges,
                backgroundColor: colors,
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            aspectRatio: 1.5,
            scales: {
              x: {
                display: true,
                title: {
                  display: true,
                  text: "User",
                  font: {
                    weight: "bold",
                  },
                },
                ticks: {
                  display: false,
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Age",
                  font: {
                    weight: "bold",
                  },
                },
              },
            },
            plugins: {
              legend: {
                display: false,
              },
            },
          },
        });

        // Chart for Age Statistics
        const ages = users.map((user) => calculateAge(user.birthDate));
        const minAge = Math.min(...ages);
        const maxAge = Math.max(...ages);
        const averageAge = calculateAverage(ages);

        const ctxAge = document.getElementById("ageChart").getContext("2d");

        // Destroy existing chart instance
        Chart.getChart(ctxAge)?.destroy();

        new Chart(ctxAge, {
          type: "bar",
          data: {
            labels: ["Minimum Age", "Maximum Age", "Average Age"],
            datasets: [
              {
                label: "Age Statistics",
                data: [minAge, maxAge, averageAge],
                backgroundColor: [
                  "rgba(75, 192, 192, 0.8)",
                  "rgba(54, 162, 235, 0.8)",
                  "rgba(255, 99, 132, 0.8)",
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            aspectRatio: 1.5,
            indexAxis: "y",
            scales: {
              x: {
                display: true,
                title: {
                  display: false,
                },
              },
              y: {
                title: {
                  display: false,
                  text: "Age",
                  font: {
                    weight: "bold",
                  },
                },
              },
            },
            plugins: {
              legend: {
                display: false,
              },
            },
          },
        });

        // Chart for Users by Nationality
        const nationalityCount = users.reduce((count, user) => {
          const nationality = user.country;
          count[nationality] = (count[nationality] || 0) + 1;
          return count;
        }, {});

        const labels = Object.keys(nationalityCount);
        const values = Object.values(nationalityCount);

        const ctxUser = document.getElementById("userChart").getContext("2d");

        // Destroy existing chart instance
        Chart.getChart(ctxUser)?.destroy();

        new Chart(ctxUser, {
          type: "pie",
          data: {
            labels: labels,
            datasets: [
              {
                label: "Users by Nationality",
                data: values,
                backgroundColor: getRandomColors(labels.length),
                borderWidth: 1,
              },
            ],
          },
          options: {
            aspectRatio: 1.5,
            plugins: {
              legend: {
                position: "bottom",
              },
              datalabels: {
                color: "#fff",
                font: {
                  size: 12,
                },
                formatter: (value, context) => {
                  const label = context.chart.data.labels[context.dataIndex];
                  return {
                    text: `${label}: ${value}`,
                  };
                },
              },
            },
          },
        });
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });

    function calculateAge(birthdate) {
      const today = new Date();
      const birthdateObj = new Date(birthdate);
      let age = today.getFullYear() - birthdateObj.getFullYear();
      const monthDiff = today.getMonth() - birthdateObj.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthdateObj.getDate())
      ) {
        age--;
      }

      return age;
    }

    function calculateAverage(numbers) {
      const sum = numbers.reduce((total, num) => total + num, 0);
      return sum / numbers.length;
    }
  }, []);

  return (
    <div>
      <div>
        <h1 className="font-bold mt-4 mb-4 text-center">Users by Age</h1>
        <canvas
          id="userAgeChart"
          style={{ width: "600px", height: "300px" }}
        ></canvas>
      </div>
      <div>
        <h1 className="font-bold mt-4 mb-4 text-center">Users Age Average</h1>
        <canvas
          id="ageChart"
          style={{ width: "600px", height: "300px" }}
        ></canvas>
      </div>
      <div>
        <h1 className="font-bold mt-4 mb-4 text-center">
          Users by Nationality
        </h1>
        <canvas
          id="userChart"
          style={{ width: "600px", height: "300px" }}
        ></canvas>
      </div>
    </div>
  );
};

const ProductStatistics = () => {
  useEffect(() => {
    axios
      .get("/products")
      .then((response) => {
        const products = response.data;

        const manufacturers = products.map((product) => product.manufacturer);
        const manufacturerCount = getCountByProperty(manufacturers);

        const manufacturerLabels = Object.keys(manufacturerCount);
        const manufacturerValues = Object.values(manufacturerCount);

        const ctxManufacturer = document
          .getElementById("manufacturerChart")
          .getContext("2d");
        new Chart(ctxManufacturer, {
          type: "bar",
          data: {
            labels: manufacturerLabels,
            datasets: [
              {
                label: "Amount",
                data: manufacturerValues.map(Math.round),
                backgroundColor: getRandomColors(manufacturerValues.length),
                borderWidth: 1,
              },
            ],
          },
          options: {
            plugins: {
              legend: {
                display: false, // Hide the legend
              },
            },
            // Configure chart options, such as title, axes, tooltips, etc.
          },
        });

        const origins = products.map((product) => product.origin);
        const originCount = getCountByProperty(origins);

        const originLabels = Object.keys(originCount);
        const originValues = Object.values(originCount);

        const ctxOrigin = document
          .getElementById("originChart")
          .getContext("2d");
        new Chart(ctxOrigin, {
          type: "pie",
          data: {
            labels: originLabels,
            datasets: [
              {
                label: "Amount",
                data: originValues,
                backgroundColor: getRandomColors(originValues.length),
                borderWidth: 1,
              },
            ],
          },
          options: {
            plugins: {
              legend: {
                display: true,
                position: "bottom", // Set the legend position to 'bottom'
              },
              datalabels: {
                color: "#fff", // Set the color of the labels
                font: {
                  size: 12, // Set the font size of the labels
                },
                formatter: (value, context) => {
                  const label = context.chart.data.labels[context.dataIndex];
                  return {
                    text: `${label}: ${value}`,
                  };
                },
              },
            },
            aspectRatio: 1.5,
          },
        });

        const prices = products
          .map((product) => ({
            price: parseFloat(product.price),
            name: product.name,
          }))
          .sort((a, b) => a.price - b.price)
          .map((product) => product.price);

        const productNames = products
          .map((product) => ({
            price: parseFloat(product.price),
            name: product.name,
          }))
          .sort((a, b) => a.price - b.price)
          .map((product) => product.name);

        const ctxPrice = document.getElementById("priceChart").getContext("2d");
        new Chart(ctxPrice, {
          type: "line",
          data: {
            labels: productNames,
            datasets: [
              {
                data: prices,
                backgroundColor: getRandomColors(prices.length),
                borderColor: getRandomColors(prices.length),
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              x: {
                display: true,
                title: {
                  display: true,
                  text: "Product",
                  font: {
                    weight: "bold",
                  },
                },
                ticks: {
                  display: false, // Hide the x-axis labels
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Price",
                  font: {
                    weight: "bold",
                  },
                },
              },
            },
            plugins: {
              legend: {
                display: false, // Hide the legend
              },
            },
          },
        });
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });

    function getCountByProperty(propertyArray) {
      return propertyArray.reduce((count, property) => {
        count[property] = (count[property] || 0) + 1;
        return count;
      }, {});
    }
  }, []);

  return (
    <div>
      <div>
        <h1 className="font-bold mt-4 mb-4 text-center">
          Products by Manufacturer
        </h1>
        <canvas
          id="manufacturerChart"
          style={{ width: "600px", height: "300px" }}
        ></canvas>
      </div>
      <div>
        <h1 className="font-bold mt-4 mb-4 text-center">Products by Origin</h1>
        <canvas
          id="originChart"
          style={{ width: "600px", height: "300px" }}
        ></canvas>
      </div>
      <div>
        <h1 className="font-bold mt-4 mb-4 text-center">Products by Price</h1>
        <canvas
          id="priceChart"
          style={{ width: "600px", height: "300px" }}
        ></canvas>
      </div>
    </div>
  );
};

export { UserStatistics, ProductStatistics };
