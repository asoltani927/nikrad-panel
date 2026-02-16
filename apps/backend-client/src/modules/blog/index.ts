/**
 * TASKS: @reza
 * @description: we can use redis to store those data for 24 hours and update them every 24 hours to reduce the load on the database and improve the performance of the home page (we can use a cron job to update the data every 24 hours)
 * 1. Create a public route to fetch blog posts for the home page, sorted by newest first (just fetch 10 items sorted by createdAt descending) using dokamerce sdk (it is a public route without login for home page) *
 */
