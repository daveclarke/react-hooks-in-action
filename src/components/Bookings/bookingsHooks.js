import { shortISO, isDate } from '../../utils/date-wrangler';
import useFetch from '../../utils/useFetch';
import { transformBookings } from './gridBuilder';
import { useMemo } from 'react';
import { getGrid } from './gridBuilder';
import { useSearchParams } from 'react-router-dom';

export function useBookings(bookableId, startDate, endDate) {
    const start = shortISO(startDate);
    const end = shortISO(endDate);
    const urlRoot = "http://localhost:3001/bookings";
    const queryString = `bookableId=${bookableId}`;
    const query = useFetch(`${urlRoot}?${queryString}`);

    return {
        bookings: query.data ? transformBookings(query.data) : {}, ...query
    };
}

export function useGrid(bookable, startDate) {
    return useMemo(
        () => bookable ? getGrid(bookable, startDate) : {},
        [bookable, startDate]
    );
}

export function useBookingsParams() {
    const [searchParams, setSearchParams] = useSearchParams();
    const searchDate = searchParams.get("date");
    const bookableId = searchParams.get("bookableId");
    const date = isDate(searchDate) ? new Date(searchDate) : new Date();
    const id = parseInt(bookableId, 10);
    const hasId = !isNaN(id);

    function setBookingsDate(date) {
        const params = {};
        if (hasId) params.bookableId = bookableId;
        if (isDate(date)) params.date = date;
        if (params.date || params.bookableId !== undefined) {
            setSearchParams(params, { replace: true });
        }
    }

    return { date, bookableId: hasId ? id : undefined, setBookingsDate };
}