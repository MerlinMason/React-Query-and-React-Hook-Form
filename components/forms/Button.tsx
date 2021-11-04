import Link from "next/link";

interface CommonProps {
    fit?: boolean;
}
type AsProps =
    | { as: "button"; href?: never; type: "button" | "submit" }
    | { as: "link"; href: string; type?: never };

type Props = CommonProps & AsProps;

const Button: React.FC<Props> = ({ fit, as, href, type, children }) => {
    const wrapperClass = `${
        fit ? "w-full" : ""
    } rounded relative overflow-hidden inline-flex group items-center justify-center px-6 py-2 cursor-pointer border-b-4 border-l-2 active:border-purple-600 active:shadow-none shadow-lg bg-gradient-to-tr from-purple-600 to-purple-500 border-purple-700 text-white`;
    const innerClass =
        "absolute w-0 h-0 transition-all duration-300 ease-out bg-gradient-radial from-white/10 via-transparent to-transparent rounded-full group-hover:w-80 group-hover:h-36";
    const childrenClass = "relative";

    if (as === "link") {
        return (
            <Link href={String(href)}>
                <a className={wrapperClass}>
                    <span className={innerClass}></span>
                    <span className={childrenClass}>{children}</span>
                </a>
            </Link>
        );
    } else {
        return (
            <button type={type} className={wrapperClass}>
                <span className={innerClass}></span>
                <span className={childrenClass}>{children}</span>
            </button>
        );
    }
};

export default Button;
