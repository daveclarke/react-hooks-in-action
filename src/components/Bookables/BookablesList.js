import { useReducer, Fragment } from "react";
import data from "../../static.json";
import { FaArrowRight } from "react-icons/fa";
import reducer from "./reducer"

const { bookables, days, sessions } = data;
const initialState = {
    group: "Rooms",
    bookablesIndex: 0,
    hasDetails: true,
    bookables
};

export default function BookablesList() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { group, bookablesIndex, bookables, hasDetails } = state;
    const bookablesInGroup = bookables.filter(b => b.group === group);
    const groups = [...new Set(bookables.map(b => b.group))];
    const bookable = bookablesInGroup[bookablesIndex];

    function changeGroup(e) {
        dispatch({ type: "SET_GROUP", payload: e.target.value });
    }

    function changeBookable(i) {
        dispatch({ type: "SET_BOOKABLE", payload: i });
    }

    function nextBookable() {
        dispatch({ type: "NEXT_BOOKABLE" });
    }

    function toggleDetails() {
        dispatch({ type: "TOGGLE_HAS_DETAILS" });
    }

    return (
        <Fragment>
            <div>
                <select value={group} onChange={changeGroup}>
                    {groups.map(g => <option value={g} key={g}>{g}</option>)}
                </select>
                <ul className="items-list-nav">
                    {bookablesInGroup.map((b, i) => (
                        <li key={b.id} className={i === bookablesIndex ? "selected" : null}>
                            <button className="btn" onClick={() => changeBookable(i)}>
                                {b.title}
                            </button>
                        </li>
                    ))}
                </ul>
                <p>
                    <button className="btn" onClick={nextBookable}>
                        <FaArrowRight />
                        <span>Next</span>
                    </button>
                </p>
            </div>
            {bookable && (
                <div className="bookable-details">
                    <div className="item">
                        <div className="item-header">
                            <h2>{bookable.title}</h2>
                            <span className="controls">
                                <label>
                                    <input type="checkbox" checked={hasDetails} onChange={toggleDetails} />
                                    Show Details
                                </label>
                            </span>
                        </div>

                        <p>{bookable.notes}</p>

                        {hasDetails && (
                            <div className="item-details">
                                <h3>Availability</h3>
                                <div className="bookable-availability">
                                    <ul>
                                        {bookable.days.sort().map(d => <li key={d}>{days[d]}</li>)}
                                    </ul>
                                    <ul>
                                        {bookable.sessions.map(s => <li key={s}>{sessions[s]}</li>)}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </div >
            )
            }

        </Fragment >
    );
}
