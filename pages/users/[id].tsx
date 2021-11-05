import { useRouter } from "next/router";

import useUser from "../../hooks/useUser";

import UserForm from "../../components/UserForm";

const User: React.FC = () => {
    const router = useRouter();
    const id = router.query.id?.toString() ?? "";
    const { isLoading, data: user } = useUser(id);

    return <UserForm user={user} isLoading={isLoading} />;
};

export default User;
