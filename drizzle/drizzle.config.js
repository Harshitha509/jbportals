export default{
    schema:"./DB/schema.js",
    out:"./drizzle",
    driver:"pg",
    dbCredentials:{
        connectionString: process.env.DATABASE_URL,
    },
}