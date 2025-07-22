use sqlx::PgPool;

use super::sql_serv_error::SqlServErr;

pub async fn run_query(query: &str, pool: &PgPool) -> Option<SqlServErr> {
    match sqlx::query(query)
        .execute(pool)
        .await{
            Ok(_) => None,
            Err(e) => Some(SqlServErr::SQLError(e.to_string())),
        }
        
}


pub fn gen_id(text: Vec<char>, size: usize) -> String {
    let valid_chars = "abcdefghijklmnopqrstuvwxyz1234567890";
    let mut chars: Vec<char> = Vec::with_capacity(size);
    let mut hash: usize = 0;

    for i in 0..text.len() {
        hash += text[i] as usize;
    }

    for i in 0..size {
        let index: usize = (hash + (text[i % text.len()] as usize * (i + 1))) % valid_chars.len();
        chars.push(valid_chars.chars().nth(index).unwrap());
    }

    chars.iter().collect()
}

#[allow(dead_code)]
pub fn gen_book_id(name: String, author: String) -> String {
    let combined: Vec<char> = name.chars().chain(author.chars()).collect();
    gen_id(combined, 8)
}

#[allow(dead_code)]
pub fn gen_genres_id(name: String) -> String {
    gen_id(name.chars().collect(), 10)
}
