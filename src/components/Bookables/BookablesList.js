import { useEffect, useRef } from "react";
import { FaArrowRight } from "react-icons/fa";
import getData from "../../utils/api";
import Spinner from "../UI/Spinner";


export default function BookablesList({ state, dispatch }) {
    const { group, bookablesIndex, bookables, isLoading, error } = state;
    const bookablesInGroup = bookables.filter(b => b.group === group);
    const groups = [...new Set(bookables.map(b => b.group))];
    const nextButtonRef = useRef();

    // run once
    useEffect(() => {
        dispatch({ type: "FETCH_BOOKABLES_REQUEST" });
        getData("http://localhost:3001/bookables")
            .then(bookables => dispatch({ type: "FETCH_BOOKABLES_SUCCESS", payload: bookables }))
            .catch(error => dispatch({ type: "FETCH_BOOKABLES_ERROR", payload: error }))
    }, [dispatch]);


    function changeGroup(e) {
        dispatch({ type: "SET_GROUP", payload: e.target.value });
    }

    function changeBookable(i) {
        dispatch({ type: "SET_BOOKABLE", payload: i });
        nextButtonRef.current.focus();
    }

    function nextBookable() {
        dispatch({ type: "NEXT_BOOKABLE" });
    }

    if (error) return <p>{error.message}</p>;

    if (isLoading) return <p><Spinner /> Loading bookables...</p>;

    return (
        <div>
            <select value={group} onChange={changeGroup}>
                {groups.map(g => <option value={g} key={g}>{g}</option>)}
            </select>
            <ul className="bookables items-list-nav">
                {bookablesInGroup.map((b, i) => (
                    <li key={b.id} className={i === bookablesIndex ? "selected" : null}>
                        <button className="btn" onClick={() => changeBookable(i)}>
                            {b.title}
                        </button>
                    </li>
                ))}
            </ul>
            <p>
                <button className="btn" onClick={nextBookable} ref={nextButtonRef} autoFocus>
                    <FaArrowRight />
                    <span>Next</span>
                </button>
            </p>
        </div>
    );
}
