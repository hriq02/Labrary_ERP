use tide::StatusCode;
use tide::Request;
use crate::{sql_service::inserts, AppState};
use super::handlers::{handle_error, handle_response};



pub async fn post_book(mut req: Request<AppState>) -> tide::Result {
    let book  = req.body_json().await.map_err(|e| {
        tide::Error::from_str(StatusCode::BadRequest, e.to_string())
    })?;

    let pool = &req.state().pool;
    match inserts::insert_book(pool, book).await{
        Ok(book) => handle_response(book),
        Err(e) => handle_error(&req, e)
    }
}


pub async fn post_order(mut req: Request<AppState>) -> tide::Result {
    let order  = req.body_json().await.map_err(|e| {
        tide::Error::from_str(StatusCode::BadRequest, e.to_string())
    })?;

    let pool = &req.state().pool;
    match inserts::insert_order(pool, order).await{
        Ok(order) => handle_response(order),
        Err(e) => handle_error(&req, e)
    }
}

pub async fn post_employee_data(mut req: Request<AppState>) -> tide::Result {
    let employee  = req.body_json().await.map_err(|e| {
        tide::Error::from_str(StatusCode::BadRequest, e.to_string())
    })?;

    let pool = &req.state().pool;
    match inserts::insert_employee(pool, employee).await{
        Ok(employee) => handle_response(employee),
        Err(e) => handle_error(&req, e)
    }
}