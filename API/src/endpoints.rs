use crate::{sql_service::fetches, AppState};
use tide::{Request, Response, StatusCode};

pub async fn get_books(req: Request<AppState>) -> tide::Result {
    let pool = &req.state().pool;
    let page = req.param("page").unwrap_or("1");
    let limit = "10";

    match fetches::fetch_books(pool, limit,page,"").await {
        Ok(books) => Ok(Response::builder(StatusCode::Ok)
            .body(serde_json::to_string(&books)?)
            .content_type("application/json")
            .build()),
        Err(e) => {
            eprintln!("Database error: {:?}", e);
            Ok(Response::builder(StatusCode::InternalServerError)
                .body(format!("Failed to fetch books: {:?}", e))
                .build())
        }
    }
}


pub async fn get_orders(req: Request<AppState>) -> tide::Result {
    let pool = &req.state().pool;
    let page = req.param("page").unwrap_or("1");
    let limit = "10";
    

    match fetches::fetch_orders(pool,limit,page,"","").await {
        Ok(orders) => Ok(Response::builder(StatusCode::Ok)
            .body(serde_json::to_string(&orders)?)
            .content_type("application/json")
            .build()
        ),
        Err(e) => {
            eprintln!("Database error: {:?}", e);
            Ok(Response::builder(StatusCode::InternalServerError)
                .body(format!("Failed to fetch orders: {:?}", e))
                .build()
            )
        }
    }
}

