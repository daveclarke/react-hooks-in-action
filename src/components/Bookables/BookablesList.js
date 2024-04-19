import { useState, Fragment } from "react";
import data from "../../static.json";
import { FaArrowRight } from "react-icons/fa";

export default function BookablesList() {
    const { bookables, days, sessions } = data;
    const [group, setGroup] = useState("Kit");
    const bookablesInGroup = bookables.filter(b => b.group === group);
    const [bookablesIndex, setBookablesIndex] = useState(0);
    const groups = [...new Set(bookables.map(b => b.group))];
    const bookable = bookablesInGroup[bookablesIndex];
    const [hasDetails, setHasDetails] = useState(false);

    function changeGroup(e) {
        setGroup(e.target.value);
        setBookablesIndex(0);
    }

    function nextBookable() {
        setBookablesIndex((i) => (i + 1) % bookablesInGroup.length);
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
                            <button className="btn" onClick={() => setBookablesIndex(i)}>
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
                                    <input type="checkbox" checked={hasDetails} onChange={() => setHasDetails(hasDetails => !hasDetails)} />
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
