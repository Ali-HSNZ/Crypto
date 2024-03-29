/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                // iranyekan font
                'iranyekan-regular': ['iranyekan-regular'],
                'iranyekan-bold': ['iranyekan-bold'],
                'iranyekan-thin': ['iranyekan-thin'],
                'iranyekan-light': ['iranyekan-light'],
                'iranyekan-medium': ['iranyekan-medium'],
                'iranyekan-extraBold': ['iranyekan-extraBold'],
                'iranyekan-black': ['iranyekan-black'],
                'iranyekan-extraBlack': ['iranyekan-extraBlack'],

                // quicksand font
                'quicksand-bold': ['quicksand-bold'],
                'quicksand-light': ['quicksand-light'],
                'quicksand-medium': ['quicksand-medium'],
                'quicksand-regular': ['quicksand-regular'],
            },
        },
    },
    plugins: [],
}
