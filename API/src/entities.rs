use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct Book {
    pub id: String,
    pub name: String,
    pub author: String,
    pub price: f64,
    pub genres: String,
    pub cover: String,
    pub publisher: String,
}
