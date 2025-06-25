use std::error::Error;

use crate::entities::Book;
use sql_query_builder as sql;
use sqlx::Row;
use sqlx::{PgPool, QueryBuilder};

pub async fn setupd_db(pool: &PgPool) -> bool {
    let mut is_ok;
    is_ok = run_query(
        sql::CreateTable::new()
            .create_table_if_not_exists("books")
            .column("id         CHAR(8)    PRIMARY KEY")
            .column("name       TEXT        NOT NULL")
            .column("author     TEXT        NOT NULL")
            .column("price      FLOAT       NOT NULL")
            .column("genres     TEXT        NOT NULL")
            .column("cover      TEXT        NOT NULL")
            .column("publisher  TEXT        NOT NULL")
            .as_string()
            .as_str(),
        pool,
        "Error when creating table books",
    )
    .await;
    is_ok = run_query(
        sql::CreateTable::new()
            .create_table_if_not_exists("genres")
            .column("id         CHAR(6)     PRIMARY KEY")
            .column("name       TEXT        NOT NULL")
            .column("subgenres  TEXT        NOT NULL")
            .as_string()
            .as_str(),
        pool,
        "error when creating table genres",
    )
    .await
        && is_ok;

    is_ok = run_query(
        sql::CreateTable::new()
            .create_table_if_not_exists("subgenres")
            .column("id         CHAR(10)    PRIMARY KEY")
            .column("name       TEXT        NOT NULL")
            .as_string()
            .as_str(),
        pool,
        "error when creating table subgenres",
    )
    .await
        && is_ok;

    is_ok = run_query(
        sql::CreateTable::new()
            .raw("CREATE EXTENSION IF NOT EXISTS pg_trgm;")
            .as_string()
            .as_str(),
        pool,
        "error when setting pg_trgm extension",
    )
    .await
        && is_ok;
    is_ok
}

async fn run_query(query: &str, pool: &PgPool, err_msg: &str) -> bool {
    sqlx::query(query)
        .execute(pool)
        .await
        .inspect_err(|error| println!("{}\n{}", err_msg, error))
        .is_ok()
}

pub async fn fetch_books(pool: &PgPool, query: &str) -> Result<Vec<Book>, sqlx::Error> {
    QueryBuilder::new(query)
        .build_query_as::<Book>()
        .fetch_all(pool)
        .await
}

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

pub fn gen_id(text: Vec<char>, size: usize) -> String {
    let valid_chars = "abcdefghijklmnopqrstuvwxyz1234567890";
    let mut chars: Vec<char> = Vec::with_capacity(size);
    let mut hash: usize = 0;

    for i in 0..text.len() {
        hash += text[i] as usize;
    }

    for i in 0..size {
        let index: usize = (hash + (text[i % text.len()] as usize * (i + 1))) % valid_chars.len();
        chars.push(valid_chars.chars().nth(index).unwrap());
    }

    chars.iter().collect()
}

#[allow(dead_code)]
pub fn gen_book_id(name: String, author: String) -> String {
    let combined: Vec<char> = name.chars().chain(author.chars()).collect();
    gen_id(combined, 8)
}

#[allow(dead_code)]
pub fn gen_genres_id(name: String) -> String {
    gen_id(name.chars().collect(), 10)
}
