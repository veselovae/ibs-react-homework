const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@pages": path.resolve(__dirname, "src/pages"),
      "@src": path.resolve(__dirname, "src"),
      "@icons": path.resolve(__dirname, "src/components/icons"),
    },
  },
  typescript: {
    enableTypeChecking: false,
  },
};
