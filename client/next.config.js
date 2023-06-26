/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
          {
            // Permitir el acceso desde cualquier origen durante el desarrollo
            source: "/product/create",
            headers: [
              {
                key: "Access-Control-Allow-Origin",
                value: "*",
              },
            ],
          },
        ];
      },
}

module.exports = nextConfig
