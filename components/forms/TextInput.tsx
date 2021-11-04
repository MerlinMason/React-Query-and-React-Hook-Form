import { UseFormRegister, FieldValues, FieldError } from "react-hook-form";
import ValidationMessage from "./ValidationMessage";

interface Props {
    register: UseFormRegister<FieldValues>;
    name: string;
    label: string;
    validation?: { [key: string]: any };
    errors: { [key: string]: FieldError };
    placeholder?: string;
}

const TextInput: React.FC<Props> = ({
    register,
    name,
    label,
    validation = {},
    errors,
    placeholder = "",
}) => {
    return (
        <div>
            <label className="font-bold mb-1 block" htmlFor={name}>
                {label}
            </label>
            <input
                {...register(name, validation)}
                id={name}
                placeholder={placeholder}
                aria-invalid={errors?.[name] ? "true" : "false"}
                className="px-3 py-3 text-lg bg-white rounded border border-gray-300 shadow outline-none focus:outline-none focus:ring ring-purple-500 w-full"
            />

            {errors?.[name] && errors[name].type === "required" && (
                <ValidationMessage>This is required</ValidationMessage>
            )}

            {errors?.[name] && errors[name].type === "maxLength" && (
                <ValidationMessage>Max length exceeded</ValidationMessage>
            )}

            {/* Assumuption here that if you provide a pattern you must also provide a message */}
            {errors?.[name] && errors[name].type === "pattern" && (
                <ValidationMessage>{errors[name].message}</ValidationMessage>
            )}
        </div>
    );
};

export default TextInput;
