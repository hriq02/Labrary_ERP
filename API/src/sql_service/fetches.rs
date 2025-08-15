use std::error::Error;

use crate::entities::{Book, EmployeeData, Order, Stock};
use sql_query_builder as sql;
use sqlx::Row;
use sqlx::{PgPool, QueryBuilder};

use super::actions::gen_genres_id;

pub async fn fetch_books(
    pool: &PgPool, 
    limit : &str,
    page : &str, 
    filter : &str
) -> Result<Vec<Book>, sqlx::Error> {
    QueryBuilder::new(
        sql::Select::new()
        .select("id,name,author,price,genres,in_stock,publisher,storage_id,status")
        .from("books")
        .raw(if filter != "" {filter} else {"1=1"})
        .offset(format!("(({}-1) * {})", page, limit).as_str())
        .limit(&limit)
        .as_string()
    )
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

pub async fn fetch_orders(
    pool: &PgPool, 
    limit : &str,
    page : &str, 
    filter : &str,
    order_by : &str
) -> Result<Vec<Order>, sqlx::Error> {

    QueryBuilder::new(
        sql::Select::new()
            .select("
                id,
                book_id,
                tracking_code,
                status,
                insert_date,
                delivery_date,
                delivery_address
                delivery_ein
            ")
            .from("orders")
            .where_clause(if filter != "" {filter} else {"1=1"})
            .order_by(if order_by != "" {order_by} else {"data"})
            .offset(format!("(({}-1) * {})", page, limit).as_str())
            .limit(&limit)
            .as_string()
    )
    .build_query_as::<Order>()
    .fetch_all(pool)
    .await
}


#[allow(dead_code)]
pub async fn fetch_stock(
    pool: &PgPool,
    limit : &str,
    page : &str,
    filter : &str
) -> Result<Vec<Stock>, sqlx::Error> {
    QueryBuilder::new(
        sql::Select::new()
            .select("
                book_id,
                in_stock,
                storage_id,
                status, 
                COUNT(orders.book_id) as number_of_orders
            ")
            .from("books on books.id = orders.book_id")
            .left_join("orders")
            .where_clause(if filter != "" {filter} else {"1=1"})
            .offset(format!("(({}-1) * {})", page, limit).as_str())
            .limit(&limit)
            .as_string()
    )
    .build_query_as::<Stock>()
    .fetch_all(pool)
    .await
}


pub async fn fetch_employee_data(
    pool: &PgPool, 
    id : &str,
    filter: &str
) -> Result<EmployeeData, sqlx::Error> {

    QueryBuilder::new(
        sql::Select::new()
            .select("
                    id,
                    name,
                    role,
                    email,
                    phone,
                    address,
                    total_work_hours,
                    holiday_left,
                    salary,
                    birth_date
                ")
            .from("employees")
            .left_join("hour_bank on employees.id = hour_bank.employee_id")
            .where_clause(&format!("id = {id}"))
            .where_clause(if filter != "" {filter} else {"1=1"})
            .as_string()
    )
    .build_query_as::<EmployeeData>()
    .fetch_one(pool)
    .await
}


pub async fn fetch_birth_dates(
    pool: &PgPool,
    limit : &str
) -> Result<Vec<String>, sqlx::Error> {
    Ok(
        sqlx::query(
            &sql::Select::new()
                .select("birth_date")
                .from("employees")
                .order_by("birth_date")
                .limit(&limit)
                .as_string()
        ).fetch_all(pool).await?
        .iter()
        .map(|row| row.get("birth_date")).collect()
    )
}