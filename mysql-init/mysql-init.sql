USE test;

CREATE TABLE IF NOT EXISTS books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2),
    cover VARCHAR(255) DEFAULT NULL
);

INSERT INTO books (title, description, price, cover) VALUES
('The Great Gatsby', 'A classic novel.', 10.99, 'https://example.com/gatsby.jpg'),
('To Kill a Mockingbird', 'A story of justice.', 12.50, 'https://example.com/mockingbird.jpg'),
('1984', 'A dystopian novel.', 9.99, 'https://example.com/1984.jpg');
