import { useState, useEffect } from "react";
import Spinner from "../UI/Spinner";
import { useUser } from "./UserContext";

export default function UserPicker() {
    const [users, setUsers] = useState(null);
    const [user, setUser] = useUser();

    useEffect(() => {
        fetch("http://localhost:3001/users")
            .then((resp) => resp.json())
            .then((data) => {
                setUsers(data);
                setUser(data[0]);
            });
    }, [setUser]);

    function handleSelect(e) {
        const selectedId = parseInt(e.target.value, 10);
        const selectedUser = users.find(u => parseInt(u.id, 10) === selectedId);
        setUser(selectedUser);
    }

    if (users === null) return <Spinner />;

    return (
        <select className="user-picker" onChange={handleSelect} value={user?.id}>
            {users.map(u => (
                <option key={u.id} value={u.id}>{u.name}</option>
            ))}
        </select>
    );
}