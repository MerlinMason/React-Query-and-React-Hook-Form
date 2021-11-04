import { useRouter } from "next/router";

import useUser from "../../hooks/useUser";

import UserForm from "../../components/UserForm";

const User: React.FC = () => {
    const router = useRouter();
    const id = router.query.id?.toString() ?? "";
    const { isLoading, isError, data: user } = useUser(id);

    if (!user || isLoading) {
        return <>Loading...</>;
    }

    return <UserForm user={user} />;
};

export default User;
