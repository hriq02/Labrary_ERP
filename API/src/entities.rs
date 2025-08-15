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
    pub in_stock: i32,
}

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct Order {
    pub id: String,
    pub book_id: String,
    pub tracking_code: String,
    pub status: i32,
    pub insert_date: String,
    pub delivery_date: String,
    pub delivery_address: String,
    pub delivery_ein: String
}

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct Stock {
    pub id: String,
    pub book_id: String,
    pub in_stock: i32,
    pub number_of_orders: i32,
    pub storage_id: String,
    pub status: i32,

}


#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct EmployeeData{
    pub id : String,
    pub name : String,
    pub role : String,
    pub email : String,
    pub phone : String,
    pub address : String,
    pub total_work_hours : i32,
    pub holiday_left : i32,
    pub salary : i32,
    pub birth_date : String,
}
