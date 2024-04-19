import { useState, Fragment } from "react";
import data from "../../static.json";
import { FaArrowRight } from "react-icons/fa";

export default function BookablesList() {
    const { users } = data;
    const [usersIndex, setUsersIndex] = useState(0);
    const user = users[usersIndex];

    function nextUser() {
        setUsersIndex((i) => (i + 1) % users.length);
    }

    return (
        <Fragment>
            <div>
                <ul className="items-list-nav">
                    {users.map((u, i) => (
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
