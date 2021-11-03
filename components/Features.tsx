import { ShieldCheckIcon } from "@heroicons/react/outline";

const Features: React.FC = () => {
    const features = [
        "Typescript",
        "Tailwind (with JIT)",
        "Heroicons",
        "Eslint (with Airbnb, jsx-a11y etc)",
        "Prettier",
        "Jest (with Testing Library)",
        "Cypress (with Testing Library)",
    ];

    return (
        <ul className="divide-y divide-gray-200">
            {features.map((feature) => (
                <li key={feature} className="flex items-center space-x-2 py-3">
                    <ShieldCheckIcon className="w-6 text-green-600" />
                    <span>{feature}</span>
                </li>
            ))}
        </ul>
    );
};

export default Features;
