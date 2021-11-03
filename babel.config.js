// just used by Jest
module.exports = {
    presets: [
        [
            "next/babel",
            {
                "@babel/preset-react": {
                    runtime: "automatic",
                },
            },
        ],
    ],
};
