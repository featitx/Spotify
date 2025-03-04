import postcss from "rollup-plugin-postcss";

export default {
  input: "src/main.jsx", 
  output: { /* ... */ },
  plugins: [
    postcss({
      extensions: [".scss", ".css"],
      inject: true, // Injects styles into JS
      extract: false // Or set to "styles.css" to extract
    })
  ]
};