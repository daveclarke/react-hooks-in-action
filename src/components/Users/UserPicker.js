import { useState } from "react";
import data from "../../static.json";

export default function UserPicker() {
    const { users } = data;
    const [usersIndex, setUsersIndex] = useState(0);

    return (
        <select>
            <option>Users</option>
            {users.map((u, i) => (
                <option key={u.id} className={i === usersIndex ? "selected" : null} onClick={() => setUsersIndex(i)}>
                    {u.name}
                </option>
            ))}
        </select>
    );
}