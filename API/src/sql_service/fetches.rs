use std::error::Error;

use crate::entities::Book;
use sql_query_builder as sql;
use sqlx::Row;
use sqlx::{PgPool, QueryBuilder};

use super::actions::gen_genres_id;

pub async fn fetch_books(pool: &PgPool, query: &str) -> Result<Vec<Book>, sqlx::Error> {
    QueryBuilder::new(query)
        .build_query_as::<Book>()
        .fetch_all(pool)
        .await
}

#[allow(dead_code)]
pub async fn fetch_name_list(
    pool: &PgPool,
    name_to_find: &str,
    limit: usize,
) -> Result<Vec<String>, Box<dyn Error>> {
    if name_to_find.len() < 3 {
        return Ok(Vec::new());
    }

    let qry = sql::Select::new()
        .select("name")
        .from("books")
        .order_by(format!("similarity(name, '{}') DESC", name_to_find).as_str())
        .limit(&limit.to_string())
        .as_string()
        + ";";

    let rows = sqlx::query(&qry).fetch_all(pool).await?;

    gen_genres_id("fiction".to_string());
    let book_names = rows.iter().map(|row| row.get("name")).collect();

    Ok(book_names)
}

pub async fn fetch_orders(pool: &PgPool, query: &str) -> Result<Vec<Book>, sqlx::Error> {

    QueryBuilder::new(query)
        .build_query_as::<Book>()
        .fetch_all(pool)
        .await


}
