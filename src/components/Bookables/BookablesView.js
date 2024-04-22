import { useState, Fragment } from "react";
import BookablesList from "./BookablesList";
import BookablesDetails from "./BookablesDetails";

export default function BookablesView() {
    const [bookable, setBookable] = useState();

    return (
        <Fragment>
            <BookablesList bookable={bookable} setBookable={setBookable} />
            <BookablesDetails bookable={bookable} />
        </Fragment>
    )
}