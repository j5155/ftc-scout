import adapter from "@sveltejs/adapter-node";
import preprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: preprocess(),
    kit: {
        adapter: adapter(),
        files: {
            hooks: "src/hooks.server.ts",
        },
        csp: {
            directives: {
                "default-src": ["self", "ftc-scout-server.fly.dev", "www.google-analytics.com"],
                "script-src": ["self", "www.googletagmanager.com"],
                "style-src": ["self", "unsafe-inline", "fonts.googleapis.com"],
                "img-src": ["self", "fonts.googleapis.com", "ftc-scout-server.fly.dev"],
                "font-src": ["self", "fonts.gstatic.com", "fonts.googleapis.com"],
                "frame-ancestors": ["self"],
                "upgrade-insecure-requests": true,
            },
        },
    },
};

export default config;
