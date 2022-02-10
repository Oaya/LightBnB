SELECT city, count(reservations) AS total_reservations
FROM properties
JOIN reservations
ON properties.id = reservations.property_id
GROUP BY city
ORDER BY total_reservations DESC;