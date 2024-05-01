import { useEffect } from "react";
import Spinner from "../UI/Spinner";
import { useUser } from "./UserContext";
import useFetch from "../../utils/useFetch";

export default function UserPicker() {
    const [user, setUser] = useUser();
    const { data: users = [], status, error } = useFetch("http://localhost:3001/users");

    useEffect(() => {
        if (users?.[0]) setUser(users[0]);
    }, [users, setUser]);

    function handleSelect(e) {
        const selectedId = parseInt(e.target.value, 10);
        const selectedUser = users.find(u => parseInt(u.id, 10) === selectedId);
        setUser(selectedUser);
    }

    if (status === "loading") return <Spinner />;

    if (status === "error") return <p>{error.message}</p>;

    return (
        <select className="user-picker" onChange={handleSelect} value={user?.id}>
            {users.map(u => (
                <option key={u.id} value={u.id}>{u.name}</option>
            ))}
        </select>
    );
}