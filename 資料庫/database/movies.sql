-- director table
CREATE TABLE IF NOT EXISTS directors(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50)
);

-- movie table
CREATE TABLE IF NOT EXISTS movies(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    title_year INT NOT NULL,
    director_id INT,
    gross BIGINT NOT NULL,
    imdb_score FLOAT DEFAULT 0,
    FOREIGN KEY (director_id) 
        REFERENCES directors(id)
        ON DELETE CASCADE
);

INSERT INTO directors(first_name, last_name) VALUES
    ('Christopher', 'Nolan'),
    ('Anthony', 'Russo'),
    ('Doug', 'Liman'),
    ('Andrew', 'Stanton'),
    ('Dean', 'DeBlois'),
    ('Pete', 'Docter'),
    ('James', 'Gunn'),
    ('Peter', 'Jackson'),
    ('Bryan', 'Singer'),
    ('Lee', 'Unkrich'),
    ('Dean', 'DeBlois'),
    ('Don', 'Hall'),
    ('Joss', 'Whedon'),
    ('Jon', 'Favreau'),
    ('James', 'Cameron'),
    ('Nathan', 'Greno');

INSERT INTO movies(title, title_year, gross, imdb_score, director_id) VALUES
    ('The Avengers', 2012, 623279547, 8.1,13),
    ('X-Men: Days of Future Past', 2014, 233914986, 8, 9),
    ('The Dark Knight', 2008, 533316061, 9, 1),
    ('Big Hero 6', 2014, 222487711, 7.9, 12),
    ('Inception', 2010, 292568851, 8.8, 1),
    ('How to Train Your Dragon', 2010, 217387997, 8.2, 5),
    ('Interstellar', 2014, 187991439, 8.6, 1),
    ('Avatar', 2009, 760505847, 7.9, 15),
    ('The Dark Knight Rises', 2012, 448130642, 8.5, 1),
    ('Guardians of the Galaxy', 2014, 333130696, 8.1, 7),
    ('The Hobbit: The Desolation of Smaug', 2013, 258355354, 7.9, 8),
    ('Toy Story 3', 2010, 414984497, 8.3, 10),
    ('The Hobbit: An Unexpected Journey', 2012, 303001229, 7.9, 8),
    ('Up', 2009, 292979556, 8.3, 6),
    ('Tangled', 2010, 200807262, 7.8, 16),
    ('Captain America: Civil War', 2016, 407197282, 8.2, 2),
    ('Inside Out', 2015, 356454367, 8.3, 6),
    ('Edge of Tomorrow', 2014, 100189501, 7.9, 3),
    ('WALL·E', 2008, 223806889, 8.4, 4),
    ('Iron Man', 2008, 318298180, 7.9, 14);


SELECT
    first_name,
    last_name,count(*) AS total_moves,
    CONVERT(AVG(imdb_score), DECIMAL(2,1)) AS imdb_avg
FROM directors 
INNER JOIN movies ON directors.id=movies.director_id
GROUP BY directors.id
ORDER BY imdb_avg DESC;