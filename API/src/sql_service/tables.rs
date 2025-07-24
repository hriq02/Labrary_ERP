
use sql_query_builder as sql;
use sqlx::PgPool;

use super::{actions::run_query, sql_serv_error::SqlServErr};

#[allow(dead_code)]
#[derive(Debug)]
pub enum OrderStatus {
    Pending = 0,
    Shipped = 1,
    Delivered = 2,
    Cancelled = 3,
}


pub async fn setupd_db(pool: &PgPool) -> Result<(),SqlServErr> {

    async fn create_table(name: &str, pool: &PgPool, query: &str) -> Option<SqlServErr> {
        match sqlx::query(query)
            .execute(pool)
            .await{
                Ok(_) => None,
                Err(e) => Some(SqlServErr::CreatingTable(name.to_string(),e.to_string())),
            }
    } 

    create_table("users", pool,
            &sql::CreateTable::new()
        .create_table_if_not_exists("books")
        .column("id         CHAR(10)    PRIMARY KEY")
        .column("name       TEXT        NOT NULL")
        .column("author     TEXT        NOT NULL")
        .column("price      SMALLINT    NOT NULL")
        .column("genres     TEXT        NOT NULL")
        .column("in_stock   SMALLINT    NOT NULL")
        .column("publisher  TEXT        NOT NULL")
        .column("storage_id CHAR(10)    NOT NULL")
        .column("status     CHAR(10)     NOT NULL")
        .as_string()
    ).await;


    create_table("orders", pool, 
        sql::CreateTable::new()
        .create_table_if_not_exists("orders")
        .column("id                 CHAR(25)        PRIMARY KEY")
        .column("book_id            CHAR(8)         NOT NULL")
        .column("tracking_code      VARCHAR(50)     UNIQUE NOT NULL")
        .column("status             CHAR(1)         NOT NULL")
        .column("insert_date        DATE            NOT NULL")
        .column("delivered_date     DATE")
        .column("delivery_address   TEXT            NOT NULL")
        .column("delivery_ein       CHAR(9)         NOT NULL")
        .as_string()
        .as_str(),
    ).await;

    create_table("employees", pool, 
        sql::CreateTable::new()
        .create_table_if_not_exists("employees")
        .column("id                 CHAR(10)        PRIMARY KEY")
        .column("name               TEXT            NOT NULL")
        .column("role               TEXT            NOT NULL")
        .column("email              TEXT    UNIQUE  NOT NULL")
        .column("phone              TEXT    UNIQUE  NOT NULL")
        .column("address            TEXT            NOT NULL")
        .column("total_work_time    SMALLINT        NOT NULL")
        .column("total_work_days    SMALLINT        NOT NULL")
        .column("total_leave        SMALLINT        NOT NULL")
        .column("total_absence      SMALLINT        NOT NULL")
        .column("total_overtime     SMALLINT        NOT NULL")
        .column("total_early_leave  SMALLINT        NOT NULL")
        .column("salary             SMALLINT        NOT NULL")
        .column("birth_date         DATE            NOT NULL")
        .as_string()
        .as_str()
    ).await;

    create_table("storages", pool, 
    sql::CreateTable::new()
        .create_table_if_not_exists("storages")
        .column("id         CHAR(10)    PRIMARY KEY")
        .column("name       TEXT        NOT NULL")
        .column("address    TEXT        NOT NULL")
        .as_string()
        .as_str()
    ).await;

    create_table("suppliers", pool, 
    sql::CreateTable::new()
        .create_table_if_not_exists("suppliers")
        .column("id         CHAR(10)    PRIMARY KEY")
        .column("name       TEXT        NOT NULL")
        .column("EIN        CHAR(10)    NOT NULL")
        .as_string()
        .as_str()
    ).await;

    create_table("users", pool, 
    sql::CreateTable::new()
            .create_table_if_not_exists("users")
            .column("id             CHAR(10)    PRIMARY KEY")
            .column("name           TEXT        NOT NULL")
            .column("email          TEXT        NOT NULL")
            .column("hash_password  TEXT        NOT NULL")
            .column("user_group     CHAR(5)     NOT NULL")
            .as_string()
            .as_str(),
    ).await;
    
    run_query(
        sql::CreateTable::new()
            .raw("CREATE EXTENSION IF NOT EXISTS pg_trgm;")
            .as_string()
            .as_str(),
        pool,
    ).await;

    Ok(())
}
