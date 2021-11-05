import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ChevronLeftIcon, TrashIcon } from "@heroicons/react/outline";
import { useForm } from "react-hook-form";

import useDeleteUser from "../hooks/useDeleteUser";
import useSaveUser from "../hooks/useSaveUser";
import type { User } from "../types";
import { emailPattern } from "../constants/regExs";

import TextInput from "./forms/TextInput";
import Button from "./forms/Button";
import TextInputSkeleton from "./skeletons/forms/TextInputSkeleton";
import ButtonSkeleton from "./skeletons/forms/ButtonSkeleton";

interface Props {
    user?: User;
    isLoading?: boolean;
}

const UserForm: React.FC<Props> = ({ user = {}, isLoading = false }) => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({ mode: "onBlur" });

    const saveUser = useSaveUser({
        onSuccess: () => {
            router.push("/");
        },
    });

    const deleteUserMutation = useDeleteUser({
        onSuccess: () => {
            router.push("/");
        },
        removeOnSuccess: true,
    });

    const onSubmit = (data: User) => {
        saveUser.mutate(data);
    };

    // set the initial form values
    useEffect(() => {
        Object.entries(user).forEach(([key, value]) => {
            setValue(key, value);
        });
    }, [user]);

    return (
        <>
            <Link href="/">
                <a className="flex gap-2 mb-6 text-white/70 text-lg font-bold hover:text-white">
                    <ChevronLeftIcon className="w-6" />
                    Home
                </a>
            </Link>
            <div className="bg-white text-gray-700 rounded p-6 shadow-xl">
                {isLoading ? (
                    <div className="animate-pulse">
                        <div className="flex items-center gap-2 mb-8">
                            <div className="bg-gray-300 rounded h-8 w-36"></div>
                            <div className="bg-gray-300 rounded h-8 w-36"></div>
                        </div>
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <TextInputSkeleton />
                                <TextInputSkeleton />
                            </div>
                            <TextInputSkeleton />
                            <ButtonSkeleton />
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="flex items-center justify-between mb-6">
                            <h1 className="text-3xl font-bold">
                                {user?.id
                                    ? `Editing ${user?.firstName} ${user?.lastName}`
                                    : "Create User"}
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
                                    validation={{ required: true }}
                                    placeholder="John"
                                />
                                <TextInput
                                    label="Surname"
                                    register={register}
                                    errors={errors}
                                    name="lastName"
                                    validation={{ required: true }}
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
                                    pattern: {
                                        value: emailPattern,
                                        message: "Please enter a valid email",
                                    },
                                }}
                                placeholder="john.doe@example.com"
                            />
                            <Button as="button" type="submit" fit>
                                Save
                            </Button>
                        </form>
                    </>
                )}
            </div>
        </>
    );
};

export default UserForm;
