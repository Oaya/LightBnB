SELECT properties.* , avg(rating) AS average_rating
FROM properties
JOIN property_reviews
ON properties.id = property_reviews.property_id
WHERE city LIKE '%ancouver%'
GROUP BY properties.id
HAVING avg(property_reviews.rating) >=4
ORDER BY cost_per_night
LIMIT 10;
