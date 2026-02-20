// Use string plugin keys to keep the PostCSS config simple and statically
// analyzable by Turbopack / Next. PostCSS loader will resolve these plugin
// package names from the frontend's node_modules.
// Minimal PostCSS config to avoid plugin resolution issues during development.
// If you need Tailwind, re-enable plugins once module resolution is stable.
module.exports = {
  plugins: {},
};
