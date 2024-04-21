import { useReducer, useEffect, Fragment } from "react";
import { FaArrowRight } from "react-icons/fa";
import Spinner from "../UI/Spinner";
import getData from "../../utils/api";
import reducer from "./userReducer";

const initialState = {
    usersIndex: 0,
    users: null,
    error: false,
    isLoading: true
};

export default function BookablesList() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { usersIndex, users, error, isLoading } = state;
    const user = users && users[usersIndex];

    // run once
    useEffect(() => {
        dispatch({ type: "FETCH_USERS_REQUEST" });
        getData("http://localhost:3001/users")
            .then(users => dispatch({ type: "FETCH_USERS_SUCCESS", payload: users }))
            .catch(error => dispatch({ type: "FETCH_USERS_ERROR", payload: error }))
    }, []);

    function nextUser() { dispatch({ type: "NEXT_USER" }); }

    if (error) return <p>{error.message}</p>;

    if (isLoading) return <p><Spinner /> Loading users...</p>;

    return (
        <Fragment>
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
