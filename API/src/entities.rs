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

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct Order {
    pub id: String,
    pub book_id: String,
    pub tracking_code: String,
    pub status: u8,
}

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct Stock {
    pub id: String,
    pub book_id: String,
    pub in_stock: i32,
    pub number_of_orders: i32,
    pub storage_id: String,
    pub status: u8,

}


#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct Employee{
    pub id : String,
    pub name : String,
    pub password : String,
    pub role : String,
    pub email : String,
    pub phone : String,
    pub address : String,
    pub total_work_time : i32,
    pub total_work_days : i32,
    pub total_leave : i32,
    pub total_absence : i32,
    pub total_overtime : i32,
    pub total_holyday : i32,
    pub total_early_leave : i32,
    pub salary : i32,
    pub birth_date : String,
    pub status : u8
}
