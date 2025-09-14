import "./bootstrap";
import "../css/app.css";
import "regenerator-runtime/runtime";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { ThemeProvider } from "./contexts/themeContext";
import { ErrorProvider } from "@/contexts/ErrorContext";

const appName =
    window.document.getElementsByTagName("title")[0]?.innerText || "VIRA";

createInertiaApp({
    title: (title) => `${title}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <ErrorProvider>
                <ThemeProvider>
                    <App {...props} />
                </ThemeProvider>
            </ErrorProvider>
        );
    },
    progress: {
        color: "#4B5563",
    },
});
