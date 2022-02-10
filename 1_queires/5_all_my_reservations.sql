SELECT reservations.*, properties.*, avg(rating) AS average_rating
FROM properties
JOIN reservations
ON properties.id  = reservations.property_id
JOIN property_reviews
ON property_reviews.reservation_id = reservations.id
WHERE reservations.guest_id = 1
AND end_date < now()::date
GROUP BY reservations.id, properties.id
ORDER BY start_date
LIMIT 10;