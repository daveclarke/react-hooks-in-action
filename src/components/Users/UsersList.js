import { useState } from "react";
import data from "../../static.json";

export default function BookablesList() {
    const { users } = data;
    const [usersIndex, setUsersIndex] = useState(0);

    return (
        <ul className="items-list-nav">
            {users.map((u, i) => (
                <li key={u.id} className={i === usersIndex ? "selected" : null}>
                    <button className="btn" onClick={() => setUsersIndex(i)}>
                        {u.name}
                    </button>
                </li>
            ))}
        </ul>
    );
}
