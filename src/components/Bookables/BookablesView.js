import { useState, useCallback, Fragment } from "react";
import BookablesList from "./BookablesList";
import BookablesDetails from "./BookablesDetails";

export default function BookablesView() {
    const [bookable, setBookable] = useState();

    const updateBookable = useCallback(selected => {
        if (selected) {
            selected.lastShown = Date.now();
            setBookable(selected);
        }
    }, []);

    return (
        <Fragment>
            <BookablesList bookable={bookable} setBookable={updateBookable} />
            <BookablesDetails bookable={bookable} />
        </Fragment>
    )
}