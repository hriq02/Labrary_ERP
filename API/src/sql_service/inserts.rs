use sqlx::PgPool;

use crate::endpoints::entities::{Book, EmployeeData, Order};

use super::{id_gen, tables::OrderStatus};

pub async fn insert_book(pool: &PgPool, book: Book) -> Result<Book, sqlx::Error> {
    sqlx::query_as(
        "INSERT INTO books (id,name, author, price, genres, in_stock, publisher, storage_id, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *"
    )
    .bind(id_gen::book_id_gen())
    .bind(&book.name)
    .bind(&book.author)
    .bind(&book.price)
    .bind(&book.genres)
    .bind(&book.in_stock)
    .bind(&book.publisher)
    .bind("")
    .bind(OrderStatus::Blocked as i32)
    .fetch_one(pool)
    .await
}

pub async fn insert_order(pool: &PgPool, order : Order) -> Result<Order, sqlx::Error>{
    sqlx::query_as(
        "INSERT INTO orders (id,book_id, tracking_code, status, insert_date, delivery_date, delivery_address, delivery_ein) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *"
    )
    .bind(id_gen::order_id_gen())
    .bind(&order.book_id)
    .bind(&order.tracking_code)
    .bind(&order.status)
    .bind(&order.insert_date)
    .bind(&order.delivery_date)
    .bind(&order.delivery_address)
    .bind(&order.delivery_ein)
    .fetch_one(pool)
    .await
}

pub async fn insert_employee(pool: &PgPool, employee : EmployeeData) -> Result<EmployeeData, sqlx::Error>{
    sqlx::query_as(
        "INSERT INTO employees (id, name, role,email, phone, address, salary, birth_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *"
    )
    .bind(id_gen::employee_id_gen())
    .bind(&employee.name)
    .bind(&employee.role)
    .bind(&employee.email)
    .bind(&employee.phone)
    .bind(&employee.address)
    .bind(&employee.salary)
    .bind(&employee.birth_date)
    .fetch_one(pool)
    .await
}