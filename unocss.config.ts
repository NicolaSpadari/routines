import {
    defineConfig,
    presetTagify,
    presetAttributify,
    presetIcons,
    presetTypography,
    presetUno,
    presetWebFonts,
    transformerDirectives,
    transformerVariantGroup
} from "unocss";

export default defineConfig({
    shortcuts: [
        ["crate-xs", "max-w-xs mx-auto"],
        ["crate-sm", "max-w-sm mx-auto"],
        ["crate-md", "max-w-md mx-auto"],
        ["crate-lg", "max-w-lg mx-auto"],
        ["crate-xl", "max-w-xl mx-auto"],
        ["crate-max", "max-w-5xl mx-auto"]
    ],
    presets: [
        presetUno(),
        presetTagify(),
        presetAttributify(),
        presetIcons({
            extraProperties: {
                "display": "inline-block",
                "vertical-align": "middle"
            }
        }),
        presetTypography(),
        presetWebFonts({
            fonts: {
                heading: {
                    name: "Montserrat",
                    weights: ["400", "700"]
                },
                sans: {
                    name: "DM Sans",
                    weights: ["400", "700"]
                }
            }
        })
    ],
    theme: {
        colors: {
            azure: "#f3f6ff",
            light: "#e0e8f5",
            night: "#36338c",
            broncos: "#002244"
        },
        breakpoints: {
            sm: "576px",
            md: "768px",
            lg: "992px",
            xl: "1200px",
            xxl: "1400px",
            uw: "2000px"
        }
    },
    transformers: [
        transformerDirectives(),
        transformerVariantGroup()
    ]
});
