
use sql_query_builder as sql;
use sqlx::PgPool;

use super::{actions::run_query, sql_serv_error::SqlServErr};

pub async fn setupd_db(pool: &PgPool) -> Result<(),SqlServErr> {
    match run_query(
        sql::CreateTable::new()
            .create_table_if_not_exists("books")
            .column("id         CHAR(10)    PRIMARY KEY")
            .column("name       TEXT        NOT NULL")
            .column("author     TEXT        NOT NULL")
            .column("price      SMALLINT    NOT NULL")
            .column("genres     TEXT        NOT NULL")
            .column("in_stock   SMALLINT    NOT NULL")
            .column("publisher  TEXT        NOT NULL")
            .column("storage_id CHAR(10)    NOT NULL")
            .column("status     CHAR(1)     NOT NULL")
            .as_string()
            .as_str(),
        pool,
    )
    .await{
        None => {},
        Some(e) => return Err(SqlServErr::CreatingTable("books".to_string(), e.to_string())),
    };

    match run_query(
        sql::CreateTable::new()
            .create_table_if_not_exists("orders")
            .column("id             CHAR(15)        PRIMARY KEY")
            .column("book_id        CHAR(8)         NOT NULL")
            .column("tracking_code  VARCHAR(50)     UNIQUE NOT NULL")
            .column("status         CHAR(1)         NOT NULL")
            .as_string()
            .as_str(),
        pool,
    )
    .await{
        None => {},
        Some(e) => return Err(SqlServErr::CreatingTable("orders".to_string(), e.to_string())),
    };

    match run_query(
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
            .column("status             CHAR(1)         NOT NULL")
            .as_string()
            .as_str(),
        pool,
    )
    .await{
        None => {},
        Some(e) => return Err(SqlServErr::CreatingTable("employees".to_string(), e.to_string())),
    };

    match run_query(
        sql::CreateTable::new()
            .create_table_if_not_exists("storages")
            .column("id         CHAR(10)    PRIMARY KEY")
            .column("name       TEXT        NOT NULL")
            .column("address    TEXT        NOT NULL")
            .as_string()
            .as_str(),
        pool
    )
    .await{
        None => {},
        Some(e) => return Err(SqlServErr::CreatingTable("storages".to_string(), e.to_string())),
    };
        
    match run_query(
        sql::CreateTable::new()
                .create_table_if_not_exists("users")
                .column("id             CHAR(10)    PRIMARY KEY")
                .column("name           TEXT        NOT NULL")
                .column("email          TEXT        NOT NULL")
                .column("hash_password  TEXT        NOT NULL")
                .column("user_group     CHAR(5)     NOT NULL")
                .as_string()
                .as_str(),
            pool,
    ).await{
        None => {},
        Some(e) => return Err(SqlServErr::CreatingTable("users".to_string(), e.to_string())),
    };

    match run_query(
        sql::CreateTable::new()
            .raw("CREATE EXTENSION IF NOT EXISTS pg_trgm;")
            .as_string()
            .as_str(),
        pool,
    )
    .await{
        None => {},
        Some(e) => return Err(SqlServErr::CreatingTable("users".to_string(), e.to_string())),
    }
    Ok(())
}
