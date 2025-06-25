use sqlx::PgPool;
use tide::{
    StatusCode,
    http::headers::HeaderValue,
    security::{CorsMiddleware, Origin},
};

mod endpoints;
mod entities;
mod sql_service;

#[tokio::main]

async fn main() -> tide::Result<()> {
    let database_url = "postgresql://admin:123456@localhost:5433/database?sslmode=disable";
    let ip = "http://localhost:5010";

    let cors = CorsMiddleware::new()
        .allow_methods("GET, POST, OPTIONS".parse::<HeaderValue>().unwrap())
        .allow_origin(Origin::from("*"))
        .allow_credentials(false);

    let pool = match PgPool::connect(&database_url).await {
        Ok(pool) => {
            println!("Connected to database successfully!");
            pool
        }
        Err(e) => {
            eprintln!("Failed to connect to database: {:?}", e);
            return Err(tide::Error::from_str(
                StatusCode::InternalServerError,
                "Database connection failed",
            ));
        }
    };

    let mut app = tide::with_state(pool);
    app.with(cors);
    //endpoints

    app.at("/api/BookInfo").get(endpoints::get_books);

    println!("Server running on {}", ip);
    app.listen(ip).await?;

    Ok(())
}
