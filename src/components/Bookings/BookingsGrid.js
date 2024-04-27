import { useEffect, useMemo, useState, Fragment } from 'react';
import { getGrid, transformBookings } from './gridBuilder';
import { getBookings } from '../../utils/api';
import Spinner from '../UI/Spinner';

export default function BookingsGrid({ week, bookable, booking, setBooking }) {
    const [bookings, setBookings] = useState(null);
    const [error, setError] = useState(false);
    const { grid, sessions, dates } = useMemo(
        () => bookable ? getGrid(bookable, week.start) : {},
        [bookable, week.start]
    )

    useEffect(() => {
        if (bookable) {
            let doUpdate = true;
            setBookings(null);
            setError(false);
            setBooking(null);

            getBookings(bookable.id, week.start, week.end)
                .then(resp => {
                    if (doUpdate) {
                        setBookings(transformBookings(resp));
                    }
                })
                .catch(setError);

            // return clean up function to invalidate previous response data
            return () => doUpdate = false;
        }
    }, [week, bookable, setBooking]);

    function cell(session, date) {
        const cellData = bookings?.[session]?.[date] || grid[session][date];
        const isSelected = booking?.session === session && booking?.date === date;

        return (
            <td key={date} className={isSelected ? "selected" : null} onClick={bookings ? () => setBooking(cellData) : null}>
                {cellData.title}
            </td>
        );
    }

    return (
        !grid ? <p>Loading...</p> :
            <Fragment>
                {error && (
                    <p className="bookingsError">
                        {`There was a problem loading the bookings: (${error})`}
                    </p>
                )}
                <table className={bookings ? "bookingsGrid active" : "bookingsGrid"}>
                    <thead>
                        <tr>
                            <th>
                                <span className="status"><Spinner /></span>
                            </th>
                            {dates.map(d => (
                                <th key={d}>{(new Date(d)).toDateString()}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {sessions.map(session => (
                            <tr key={session}>
                                <th>{session}</th>
                                {dates.map(date => cell(session, date))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Fragment>
    )
}