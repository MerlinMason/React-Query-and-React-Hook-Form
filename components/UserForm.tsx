import { useRouter } from "next/router";
import Link from "next/link";
import { ChevronLeftIcon, TrashIcon } from "@heroicons/react/outline";
import { useForm } from "react-hook-form";

import useDeleteUser from "../hooks/useDeleteUser";
import type { UserFull } from "../types";
import TextInput from "./forms/TextInput";
import { useEffect } from "react";
import { emailPattern } from "../constants/regExs";
import Button from "./forms/Button";

interface Props {
    user?: UserFull;
}

const UserForm: React.FC<Props> = ({ user = {} }) => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({ mode: "onBlur" });
    const onSubmit = (data: UserFull) => alert(JSON.stringify(data));

    useEffect(() => {
        Object.entries(user).forEach(([key, value]) => {
            setValue(key, value);
        });
    }, [user]);

    const deleteUserMutation = useDeleteUser({
        onSuccess: () => {
            router.push("/");
        },
    });

    return (
        <>
            <Link href="/">
                <a className="flex gap-2 mb-6 text-white/70 text-lg font-bold hover:text-white">
                    <ChevronLeftIcon className="w-6" />
                    Home
                </a>
            </Link>
            <div className="bg-white text-gray-700 rounded p-6 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold">
                        {user?.id ? `Editing ${user?.firstName} ${user?.lastName}` : "Create User"}
                    </h1>
                    {user?.id ? (
                        <button
                            onClick={() => deleteUserMutation.mutate(user.id)}
                            disabled={deleteUserMutation.isLoading}
                            className="disabled:opacity-50"
                        >
                            <TrashIcon className="w-6 h-6"></TrashIcon>
                        </button>
                    ) : null}
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <TextInput
                            label="Forename"
                            register={register}
                            errors={errors}
                            name="firstName"
                            placeholder="John"
                        />
                        <TextInput
                            label="Surname"
                            register={register}
                            errors={errors}
                            name="lastName"
                            placeholder="Doe"
                        />
                    </div>
                    <TextInput
                        label="Email"
                        register={register}
                        errors={errors}
                        name="email"
                        validation={{
                            required: true,
                            pattern: { value: emailPattern, message: "Please enter a valid email" },
                        }}
                        placeholder="john.doe@example.com"
                    />
                    <Button as="button" type="submit" fit>
                        Save
                    </Button>
                </form>
            </div>
        </>
    );
};

export default UserForm;
