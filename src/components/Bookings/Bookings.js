import { useState } from 'react';
import { getWeek } from '../../utils/date-wrangler';
import { useBookingsParams, useBookings } from './bookingsHooks';
import WeekPicker from './WeekPicker';
import BookingsGrid from './BookingsGrid';
import BookingDetails from './BookingDetails';

export default function Bookings({ bookable }) {
    const [booking, setBooking] = useState(null);
    const { date } = useBookingsParams();
    const week = getWeek(date);
    const { bookings } = useBookings(bookable?.id, week.start, week.end);
    const selectedBooking = bookings?.[booking?.session]?.[booking?.date];

    return (
        <div className="bookings">
            <div>
                <WeekPicker />
                <BookingsGrid week={week} bookable={bookable} booking={booking} setBooking={setBooking} />
            </div>
            <BookingDetails booking={selectedBooking || booking} bookable={bookable} />
        </div>
    )
}
