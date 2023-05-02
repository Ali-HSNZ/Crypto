/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    // './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    // './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend : {
      fontFamily : {
        'iranyekan-regular' : ['iranyekan-regular'],
        'iranyekan-bold' : ['iranyekan-bold'],
        'iranyekan-thin' : ['iranyekan-thin'],
        'iranyekan-light' : ['iranyekan-light'],
        'iranyekan-medium' : ['iranyekan-medium'],
        'iranyekan-extraBold' : ['iranyekan-extraBold'],
        'iranyekan-black' : ['iranyekan-black'],
        'iranyekan-extraBlack' : ['iranyekan-extraBlack'],
      }
    }
  },
  plugins: [],
}
