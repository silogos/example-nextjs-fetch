import sqlite3 from "sqlite3";
const SQLite3 = sqlite3.verbose();
const db = new SQLite3.Database("main.db", SQLite3.OPEN_READONLY, (err) => {
  if (err) {
    throw err;
  }
});

export async function getCategories() {
  return new Promise((res) => {
    db.all("SELECT * FROM tags;", (err, rows) => {
      if (!err) {
        res(rows);
      } else {
        res([]);
      }
    });
  });
}

export async function getPosts() {
  return new Promise((res) => {
    const query = `
      SELECT 
        p.post_id, 
        p.title, 
        p.tag, 
        p.created_at, 
        t.name as tag_name 
      FROM posts p 
      JOIN tags t ON p.tag = t.tag_id;
    `;
    db.all(query, (err, rows) => {
      if (!err) {
        res(rows);
      } else {
        res([]);
      }
    });
  });
}

export async function getPostById(id) {
  return new Promise((res) => {
    const query = `
      SELECT 
        p.*, 
        t.name as tag_name 
      FROM posts p 
      JOIN tags t ON p.tag = t.tag_id
      WHERE p.post_id=${id};
    `;

    db.get(query, (err, row) => {
      if (!err && row) {
        res(row);
      } else {
        res(null);
      }
    });
  });
}

export async function getPostIds(limit = 2) {
  return new Promise((res) => {
    const query = `SELECT post_id FROM posts LIMIT ${limit};`;
    db.all(query, (err, rows) => {
      if (!err) {
        res(rows);
      } else {
        res([]);
      }
    });
  });
}

export async function getPostsByTag(tag) {
  return new Promise((res) => {
    db.all(`SELECT * FROM posts WHERE tag=${tag};`, (err, rows) => {
      if (!err) {
        res(rows);
      } else {
        res([]);
      }
    });
  });
}
