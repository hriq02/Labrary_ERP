use crate::sql_service;
use serde_json::json;
use sql_query_builder as sql;
use sqlx::PgPool;
use tide::{Request, Response, StatusCode};

pub async fn get_books(req: Request<PgPool>) -> tide::Result {
    let pool = req.state();
    let page = req.param("page").unwrap_or("1");
    let limit = "10";

    let query = sql::Select::new()
        .select("id,name,author,price,genres,cover,publisher")
        .from("books")
        .offset(format!("(({}-1) * {})", page, limit).as_str())
        .limit(&limit)
        .as_string();

    match sql_service::fetch_books(pool, &query).await {
        Ok(books) => Ok(Response::builder(StatusCode::Ok)
            .body(serde_json::to_string(&books)?)
            .content_type("application/json")
            .build()),
        Err(e) => {
            eprintln!("Database error: {:?}", e);
            Ok(Response::builder(StatusCode::InternalServerError)
                .body(format!("Failed to fetch books: {:?}", e))
                .build())
        }
    }
}

