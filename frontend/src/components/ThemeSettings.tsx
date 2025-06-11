// src/components/ThemeSettings.tsx
import { useTheme } from "../Context/ThemeProvider";

const ThemeSettings = () => {
    const { colorTheme, setColorTheme } = useTheme();

    const gradientMap: Record<string, string> = {
        purple: "#7e5af0, #ec4899",
        blue: "#3b82f6, #10b981",
        red: "#ef4444, #f59e0b",
        green: "#22c55e, #eab308",
    };

    return (
        <div
            className="mt-4 p-4 rounded-lg border shadow-md"
            style={{
                backgroundColor: "var(--bg-surface)",
                color: "var(--text-primary)",
            }}
        >
            <h2 className="text-lg font-semibold mb-2 text-center">Select Theme</h2>
            <div className="flex justify-center gap-4">
                {Object.entries(gradientMap).map(([theme, gradient]) => (
                    <button
                        key={theme}
                        onClick={() => setColorTheme(theme as any)}
                        className={`w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                            colorTheme === theme ? "ring-2 ring-offset-2 ring-white" : "border-transparent"
                        }`}
                        style={{
                            backgroundImage: `linear-gradient(to right, ${gradient})`,
                            backgroundSize: "cover",
                        }}
                        title={theme}
                    />
                ))}
            </div>
        </div>
    );
};

export default ThemeSettings;
