import { useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import Spinner from "../UI/Spinner";
import getData from "../../utils/api";

export default function UsersList({ state, dispatch }) {
    const { usersIndex, users, error, isLoading } = state;

    // run once
    useEffect(() => {
        dispatch({ type: "FETCH_USERS_REQUEST" });
        getData("http://localhost:3001/users")
            .then(users => dispatch({ type: "FETCH_USERS_SUCCESS", payload: users }))
            .catch(error => dispatch({ type: "FETCH_USERS_ERROR", payload: error }))
    }, [dispatch]);

    function nextUser() { dispatch({ type: "NEXT_USER" }); }

    if (error) return <p>{error.message}</p>;

    if (isLoading) return <p><Spinner /> Loading users...</p>;

    return (
        <div>
            <ul className="items-list-nav">
                {users && users.map((u, i) => (
                    <li key={u.id} className={i === usersIndex ? "selected" : null}>
                        <button className="btn" onClick={() => dispatch({ type: "SET_USER", payload: i })}>
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
    );
}
