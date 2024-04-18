import { useState } from "react";
import data from "../../static.json";

export default function BookablesList() {
    const { bookables } = data;
    const group = "Rooms";
    const bookablesInGroup = bookables.filter(b => b.group === group);
    const [bookablesIndex, setBookablesIndex] = useState(0);

    return (
        <ul className="items-list-nav">
            {bookablesInGroup.map((b, i) => (
                <li key={b.id} className={i === bookablesIndex ? "selected" : null}>
                    <button className="btn" onClick={() => setBookablesIndex(i)}>
                        {b.title}
                    </button>
                </li>
            ))}
        </ul>
    );
}
