import { useState, useEffect, Fragment } from "react";
import { FaArrowRight } from "react-icons/fa";
import Spinner from "../UI/Spinner";

export default function BookablesList() {
    const [users, setUsers] = useState(0);
    const [usersIndex, setUsersIndex] = useState(0);
    const user = users[usersIndex];

    useEffect(() => {
        fetch("http://localhost:3001/users")
            .then((resp) => resp.json())
            .then((data) => setUsers(data));
    }, []);

    if (users === null) return <Spinner />;

    function nextUser() {
        setUsersIndex((i) => (i + 1) % users.length);
    }

    return (
        <Fragment>
            <div>
                <ul className="items-list-nav">
                    {users && users.map((u, i) => (
                        <li key={u.id} className={i === usersIndex ? "selected" : null}>
                            <button className="btn" onClick={() => setUsersIndex(i)}>
                                {u.name}
                            </button>
                        </li>
                    ))}
                </ul>
                <p>
                    <button className="btn" onClick={nextUser}>
                        <FaArrowRight />
                        <span>Next</span>
                    </button>
                </p>

            </div>
            {user && (
                <div className="bookable-details">
                    <div className="item">
                        <div className="item-header">
                            <h2>{user.name}</h2>
                        </div>
                        <h3>{user.title}</h3>
                        <p>{user.notes}</p>

                    </div>
                </div >
            )}
        </Fragment>
    );
}
