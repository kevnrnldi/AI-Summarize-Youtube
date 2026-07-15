import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3000/api/:path*", // Proxy to Backend
      },
    ];
  },
};

export default nextConfig;

//proxy supaya tidak kena CORS error
// cors adalah (cross origin resource sharing) mekanisme keamanan browser yang memblokir aplikasi web (frontend)
// saat mencoba mengambil data atau aset dari server(backend) yang memiliki
//protokol atau port berbeda

//error terjadi ketika cors memblokir request antara frontend dan backend
