import adapter from "@sveltejs/adapter-node";
import { vitePreprocess } from "@sveltejs/kit/vite";

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://kit.svelte.dev/docs/integrations#preprocessors
    // for more information about preprocessors
    preprocess: vitePreprocess(),

    kit: {
        // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
        // If your environment is not supported or you settled on a specific environment, switch out the adapter.
        // See https://kit.svelte.dev/docs/adapters for more information about adapters.
        adapter: adapter(),
        csp: {
            directives: {
                "default-src": [
                    "self",
                    "ws:",
                    "ftc-scout-server.fly.dev",
                    "api.ftcscout.org",
                    "www.api.ftcscout.j5155.page",
                    "2025worldsclips.reduxrobotics.com",
                ],
                "script-src": ["self", "www.googletagmanager.com"],
                "style-src": ["self", "unsafe-inline", "fonts.googleapis.com"],
                "img-src": [
                    "self",
                    "data:",
                    "fonts.googleapis.com",
                    "ftc-scout-server.fly.dev",
                    "www.api.ftcscout.j5155.page",
                    "2025worldsclips.reduxrobotics.com",
                ],
                "font-src": ["self", "fonts.gstatic.com", "fonts.googleapis.com"],
                "frame-ancestors": ["self"],
                "upgrade-insecure-requests": true,
            },
        },
    },
};

export default config;
