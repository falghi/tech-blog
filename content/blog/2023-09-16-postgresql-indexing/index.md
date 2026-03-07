---
title: "PostgreSQL Indexing with Examples"
date: "2023-09-16"
description: "Learn how to optimize PostgreSQL database performance using different types of indexes including B-Tree, Hash, GIN, GiST, and SP-GiST with practical examples and use cases."
category: "backend"
author: "Firdaus Al Ghifari"
topimage: "./postgresql_indexing.png"
topimagedesc: "PostgreSQL Indexing"
---

PostgreSQL is one of the most popular relational database management systems (RDBMSs) on the market. Continuous updates and extensive features make up for its fame. PostgreSQL can help developers save data in persistent storage and query the data using SQL (Structured Query Language). When the data is small (50k rows or below), performance is rarely a problem. But when the data is big, things are going to get tricky.

There are many variables to consider when we are trying to scale a system. Our focus right now is how can we make sure that our PostgreSQL query can run quickly when the data is big (especially on 1 million rows or above). In this article, I'm going to explain how you can use different types of PostgreSQL indexes to improve your database performance.

## Setup

To make our experiments easier, you can use the data from [PostgresPro Demonstration Database](https://postgrespro.com/community/demodb). Use the biggest one (demo-big-en.zip) for the best experience. Make sure PostgreSQL is installed and then you can follow the demo database installation instruction.

## Indexes

*"Indexes are a common way to enhance database performance. An index allows the database server to find and retrieve specific rows much faster than it could do without an index. But indexes also add overhead to the database system as a whole, so they should be used sensibly"* — Quoted from [PostgreSQL Documentation](https://www.postgresql.org/docs/current/indexes.html).

For example, adding an index to a table can make retrieving data faster. But insert, update, and delete operations will be a little slower. One rule of thumb is that a table should have a maximum of 15 indexes.

### B-Tree

The most popular type of index is B-Tree. B-Tree is popular because it is the default index, the data is stored in sorted order (can improve order by queries), and provides efficient retrieval and update operations.

For example, let's look at the table tickets:

```
 Column     |     Type    | Modifiers    |          Description
----------------+-------------+--------------+-----------------------------
 ticket_no      | char(13)    | not null     | Ticket number
 book_ref       | char(6)     | not null     | Booking number
 passenger_id   | varchar(20) | not null     | Passenger ID
 passenger_name | text        | not null     | Passenger name
 contact_data   | jsonb       |              | Passenger contact information
Indexes:
    PRIMARY KEY, btree (ticket_no)
Foreign-key constraints:
    FOREIGN KEY (book_ref) REFERENCES bookings(book_ref)
Referenced by:
    TABLE "ticket_flights" FOREIGN KEY (ticket_no) REFERENCES tickets(ticket_no)
```

Let's say we want to make a query that can search tickets using its passenger_id:

```sql
SELECT * FROM tickets WHERE passenger_id = '6361 804387'
```

If you try to run the query above, it will be pretty slow (around 2 seconds). But if you do indexing using B-tree:

```sql
CREATE INDEX tickets_passenger_id_idx ON tickets (passenger_id)
```

Note that the above query is the same as:

```sql
CREATE INDEX tickets_passenger_id_idx ON tickets USING btree (passenger_id)
```

Because B-Tree is the default indexing method. Now, if you run the select query again, it will be much faster (around 70 ms). To remove an index, you can use this query:

```sql
DROP INDEX tickets_passenger_id_idx
```

B-Tree indexes can improve performance in a comparison that uses one of these operators:

```
<   <=   =   >=   >
```

The time complexity of CRUD (create/read/update/delete) of a single element using B-Tree indexes is O(log(N)).

### Hash

The use case of hash indexes is similar to B-Tree indexes. However, hash indexes can only improve query performance that's using the `=` operator. To create a hash index for the same problem above, you can use this query:

```sql
CREATE INDEX tickets_passenger_id_hash_idx ON tickets USING hash (passenger_id)
```

The time complexity of CRUD of a single element using hash indexes is O(1), so it is significantly faster than B-Tree. But since O(log(N)) is already fast even for very large sets of data, hash indexes are rarely used.

Also note that before PostgreSQL 10 was released, hash indexes are not WAL-logged: Which means that they are not 100% reliable for crashes (the index has to be reconstructed and wrong response could happen on replications). For those of you using PostgreSQL 10 and above, hash indexes are already WAL-logged, so it's cool to use.

### GIN

GIN indexes were first released in Postgres 8.2 on December 5, 2006. GIN indexes are very interesting because it is able to deal with data types that are subdividable and you want to search for individual component values (array elements, lexemes in a text document, etc). Here are some popular use cases.

#### Indexing Full-Text Searches

Full-Text Search is a technique for searching documents using natural language understanding and optionally sorting the result by relevance to the query. For example, if we want to search tickets with a passenger_name that contains "viktor belov", we can use this query:

```sql
SELECT * FROM tickets
WHERE to_tsvector('simple', passenger_name) @@ to_tsquery('simple', 'viktor & belov')
LIMIT 10
```

To improve the query above, we can create a GIN index using TS Vector.

```sql
CREATE INDEX tickets_passenger_name_tsvector_idx ON tickets USING GIN (to_tsvector('simple', passenger_name))
```

The speed of the example query above was not that slow though (around 200 ms before we do any indexing). After using GIN indexes, the query becomes slightly faster, around 120 ms.

GIN TS Vector indexes can improve performance in a comparison that uses `@@` operator (full-text search operator).

#### Indexing LIKE or ILIKE Searches

Example query:

```sql
SELECT * FROM tickets WHERE passenger_id LIKE '%804386%'
```

To improve LIKE query speed, we can create a GIN index using GIN Trigram Operator (`gin_trgm_ops`).

```sql
CREATE INDEX tickets_passenger_id_trgm_idx ON tickets USING gin (passenger_id gin_trgm_ops)
```

The speed of the example query above was slow (around 2 seconds before we did any indexing). After using GIN indexes, the query became much faster, around 70 ms.

GIN Trigram Operator indexes can improve performance in a comparison that uses one of these operators:

```
LIKE, ILIKE, ~, ~* and =
```

#### Indexing JSONB Column Searches

Example query:

```sql
SELECT * FROM tickets WHERE contact_data @> '{"phone": "+70210914833"}'
```

To improve the above query speed, we can create a GIN index using either `jsonb_ops` or `jsonb_path_ops` operator. `jsonb_path_ops` is an optimized GIN index structure that only indexes the values (not the keys) of the JSONB element. Example of making a `jsonb_ops` index:

```sql
CREATE INDEX tickets_contact_data_idx ON tickets USING gin (contact_data)
```

The speed of the example query above was slow (around 2 seconds before we did any indexing). After using GIN indexes, the query became much faster, around 120 ms.

GIN JSONB Operator indexes can improve performance in a comparison that uses these operators:

- **jsonb_ops** (default): `?`, `?|`, `?&`, `@>`, `@@`, `@?`
- **jsonb_path_ops**: `@>`, `@@`, `@?`

One thing to note when indexing JSONB indexes is that you can also use B-Tree or Hash indexes to index on expressions, for example:

```sql
CREATE INDEX tickets_contact_data_phone_idx ON tickets USING btree ((data->>'phone'))
```

This way, you can improve the speed of queries that are trying to match `data->>'phone'`. This approach is cheaper because you only index attributes that you need to search for.

#### Things to Consider

GIN Indexes are special because it contains multiple index entries per single row of data. However, this specialty also comes with a risk, a single row of data can cause 10s or worst case 100s of index entries to be updated. There is a special feature called `fastupdate` to reduce its index update loads. But it still can be quite heavy, compared to B-Tree and Hash indexes. So, use GIN indexes wisely. Watch out, especially on tables that are frequently updated.

Under the hood, GIN uses a B-Tree which makes it very efficient with O(log(N)) average time complexity. But as stated above, the constant can get pretty big on update operations.

### GiST

GiST stands for Generalized Search Tree. Similar to GIN indexes, GiST is an index type that has many different indexing strategies available. Depending on your problem, you should choose a suitable indexing strategy (by choosing the operator class). For example, if you want to index 2D coordinates data, you can use `point` data type to store the coordinates and then use gist indexing. The operator class that will be used for the point data type is `point_ops` which optimizes these operators for conditional query:

```
|>>, <<|, >>, <<, <@, ~=
```

Also this operator for ordering queries (can be used to sort data by distance):

```
<->
```

The full list of operator classes is documented at [PostgreSQL GiST Built-in Operator Classes](https://www.postgresql.org/docs/current/gist-builtin-opclasses.html). Other than the operators, some PostGIS measurement functions are also optimized for conditional queries such as `ST_Distance`, `ST_DistanceSphere`, `ST_DWithin`, etc.

Let's try indexing 2D coordinates data using GIST. Since there is not enough data on the demo database, we should try creating a bunch of dummy data. Here is a query that you can use to create a city table and seed the data using random coordinates inside Kalimantan Island.

```sql
CREATE TABLE cities (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  coordinates POINT NOT NULL
)

INSERT INTO cities(name, coordinates)
SELECT substr(md5(random()::text), 1, 10) name,
(ST_Dump(ST_GeneratePoints('POLYGON((110.436405 -2.704324, 110.478258 0.475465, 116.672446 1.396090, 115.688909 -2.662517, 110.436405 -2.704324))', 2000000))).geom::point coordinates
```

The query above will create 2 million rows of dummy cities with their coordinates. Now, if you run this query, which is going to search cities that are 150 km or shorter to a sample coordinate (116.116268, -3.900428) and select the top 10 closest to it.

```sql
SELECT * FROM cities
WHERE ST_DWithin(coordinates::geometry::geography, st_makepoint(116.116268, -3.900428)::geography, 150000)
ORDER BY coordinates <-> st_makepoint(116.116268, -3.900428)::point
LIMIT 10
```

It's going to be slow, around 4.7 seconds. If we make a GiST index on the coordinates column:

```sql
CREATE INDEX ON cities USING gist(coordinates)
```

Then, run the query again. It will be very quick now, around 30 ms. The data structure that is used behind GiST to index spatial data is an R-tree. It is a very efficient data structure for spatial datasets having an average time complexity of O(log(N)).

Other than indexing spatial data, GiST can also be used to optimize intervals and exclusion constraints search and full-text search. For full-text searches, GiST indexes are faster to update than GIN indexes. However, for searching, GIN indexes are about three times faster than GiST indexes.

### SP-GiST

SP-GiST stands for Space-Partitioned Generalized Search Tree. Similar to GiST, SP-GiST can be used to index spatial data. In fact, using the same example problem above (on the GiST section), we can also improve the query using SP-GiST indexing.

```sql
CREATE INDEX ON cities USING spgist(coordinates)
```

Which also significantly improves the query retrieval performance to around 30 ms. SP-GiST permits the implementation of a wide range of different non-balanced disk-based data structures, such as quadtrees, k-d trees, and radix trees (tries). For spatial data, the implementation will use quadtrees which have an average time complexity of O(log(N)).

When the data have a lot of overlaps, GiST works better than SP-GiST. When there is less overlap, then SP-GiST will perform better than GIST. SP-GiST already supports k-nearest neighbor search but still has fewer operators' support than GiST. So, generally, you want to use GiST because of its powerful features and proven track record. But if you are looking for the best performance possible, SP-GiST might be the answer.

## Additional Features & Techniques

You have seen the pros and cons of each indexing type. However, to actually index your database and improve query performance, you also need to understand what's causing the issue and know some indexing best practices.

### Unique Indexes

Database indexing doesn't normally restrict any data changes on the table. However, if you want to make one or more columns unique in a table, you can create a unique index on them. One example of a unique index that is always created is when you have a primary key. Currently, unique indexes are only supported on B-tree indexes. Example of creating a unique index:

```sql
CREATE UNIQUE index airports_data_airport_code_timezone_idx ON airports_data (airport_code, timezone)
```

With unique indexes, two rows with equal indexed values are not allowed. However, two null values are not considered equal. In multicolumn unique indexing, new data will only get rejected when all indexed columns are equal with another row.

### Multicolumn Indexes

One index can contain more than one column. For example, if we want to optimize a query like this:

```sql
SELECT * FROM boarding_passes WHERE boarding_no = 1 AND seat_no = '27G'
```

The best optimization can be obtained using a multicolumn index like this:

```sql
CREATE INDEX boarding_passes_boarding_no_seat_no_idx ON boarding_passes using btree (boarding_no, seat_no)
```

However, note that a multicolumn index `(a, b)` can only optimize query conditions in the form of `WHERE a` and `WHERE a AND b`. A query with only `WHERE b` will not be optimized. You need to add another index `(b)` to handle this case.

Also, as the documentation suggests, an index on a single column will be sufficient for most cases. Indexes with more than three columns are unlikely to be helpful unless the usage of the table is extremely customized.

### Indexes and Order By

Oftentimes, we want to do a query that also orders its result using order by and use limit for paginations. Example:

```sql
SELECT * FROM bookings ORDER BY book_date desc nulls last LIMIT 10
```

We can create an index to optimize the query above like this:

```sql
CREATE INDEX bookings_book_date_idx ON bookings using btree (book_date desc nulls last)
```

For now, only B-tree indexes can produce sorted results. Because the underlying implementation of B-tree is a sorted tree, the SQL doesn't need to do any additional sorting step. However, when the result is large, an explicit sort is likely to be faster. That's why this indexing strategy is well suited when you use both order by and limit in the query.

You can adjust the ordering of the index using `ASC`, `DESC`, `NULLS FIRST`, and/or `NULLS LAST`. Multicolumn indexing can also be used to improve order by queries on multiple columns.

### Indexes on Expressions

PostgreSQL indexing is not limited to one or multiple columns. You can also index various expressions. For example, if we have a query like this for searching data on table tickets:

```sql
SELECT * FROM tickets WHERE (passenger_name || ' ' || (contact_data->>'email')) ILIKE '%lpetrova%'
```

We can optimize the query by creating an index this way:

```sql
CREATE INDEX tickets_passenger_name_email_idx ON tickets using gin ((passenger_name || ' ' || (contact_data->>'email')) gin_trgm_ops)
```

Run the query again and it will perform much faster. Also, note that indexing each column separately will not improve this kind of query. Indexes on expression are very useful for this kind of situation and should always be considered when you try to optimize queries.

## Indexing Tips

Lastly, there are various techniques that can't be covered in this article alone. I might cover some of them in the future though, such as Cursor Based Pagination, Materialized View, Database Normalization, and Database Denormalization. Depending on your use case, you might need a different solution. You always need to analyze the situation properly, investigate the bottlenecks, and optimize effectively. For PostgreSQL, you can also use `EXPLAIN ANALYZE` to help you profile your query and discover the bottlenecks. Copy the output of Explain Analyze to a helper website like [https://explain.depesz.com/](https://explain.depesz.com/).

That's all from me. Thank you for reading this article 😄. If you have any feedback, questions, or suggestions, you can reach me via [LinkedIn](https://www.linkedin.com/in/alghi/) or other social media platforms.

## References

1. [PostgreSQL Documentation - Indexes](https://www.postgresql.org/docs/current/indexes.html)
2. [How Many Indexes Should I Create?](https://www.itprotoday.com/sql-server/how-many-indexes-should-i-create)
3. [PostgreSQL 10 Features: Hash Indexes](https://medium.com/@jorsol/postgresql-10-features-hash-indexes-484f319db281)
4. [PostgreSQL's Hash Indexes Are Now Cool](https://www.enterprisedb.com/blog/postgresqls-hash-indexes-are-now-cool)
5. [PostgreSQL Mailing List - GIN Implementation](https://www.postgresql.org/message-id/flat/26038.1559516834%40sss.pgh.pa.us#ccb004aefc151d913e7a274a9b30c631)
6. [GIN Index](https://pganalyze.com/blog/gin-index)
7. [Using JSONB in PostgreSQL](https://scalegrid.io/blog/using-jsonb-in-postgresql-how-to-effectively-store-index-json-data-in-postgresql/)
8. [Text Search Indexes](https://www.postgresql.org/docs/9.4/textsearch-indexes.html)
9. [The Many Spatial Indexes of PostGIS](https://www.crunchydata.com/blog/the-many-spatial-indexes-of-postgis)
10. [GIN Implementation](https://www.postgresql.org/docs/current/gin-implementation.html)
