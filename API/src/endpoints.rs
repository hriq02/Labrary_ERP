use crate::{sql_service::fetches, AppState};
use serde::Serialize;
use tide::{Request, Response, StatusCode};

pub async fn get_books(req: Request<AppState>) -> tide::Result {
    let pool = &req.state().pool;
    let page = req.param("page").unwrap_or("1");
    let limit = "10";

    match fetches::fetch_books(pool, limit,page,"").await {
        Ok(books) => handle_response(books),
        Err(e) => handle_error(&req, e)
    }
}


pub async fn get_orders(req: Request<AppState>) -> tide::Result {
    let pool = &req.state().pool;
    let page = req.param("page").unwrap_or("1");
    let limit = "10";
    

    match fetches::fetch_orders(pool,limit,page,"","").await {
        Ok(orders) => handle_response(orders),
        Err(e) => handle_error(&req, e)
    }
}


pub async fn get_stocks(req: Request<AppState>) -> tide::Result {
    let pool = &req.state().pool;
    let page = req.param("page").unwrap_or("1");
    let limit = "10";
    
    match fetches::fetch_stock(pool, limit, page, "").await{
        Ok(stocks) => handle_response(stocks),
        Err(e) => handle_error(&req, e)
    }
}

pub async  fn get_employee(req: Request<AppState>) -> tide::Result {
    let pool = &req.state().pool;
    let employee_id = req.param("id").unwrap_or("1");

    match fetches::fetch_employee_data(pool, employee_id, "").await{
        Ok(employee) => handle_response(employee),
        Err(e) => handle_error(&req, e)
    }
}

pub async fn get_birth_dates(req: Request<AppState>) -> tide::Result {
    let pool = &req.state().pool;
    let limit = "10";

    match fetches::fetch_birth_dates(pool, limit).await{
        Ok(birth_dates) => handle_response(birth_dates),
        Err(e) => handle_error(&req, e)
    }
}



fn handle_response<T: Serialize>(t: T) -> tide::Result{
    Ok(Response::builder(StatusCode::Ok)
        .body(serde_json::to_string(&t)?)
        .content_type("application/json")
        .build()
    )
}

fn handle_error(req: &Request<AppState>, e: sqlx::Error) -> tide::Result {
    let error = e.to_string();
    match req.state().
    logger.lock(){
        Ok(mut logger) => 
            logger.add_log_error(&e.into()),
        Err(e) => 
            println!("Failed to log error: {}", e),
    }
    Ok(Response::builder(StatusCode::InternalServerError)
        .body(format!("Failed to fetch: {:?}", error))
        .build()
    )
}