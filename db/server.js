const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./db');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

app.post('/store-data', async (req, res) => {
  const { accessToken, resources, posts } = req.body;
  // console.log("posts = ",posts);
  try {
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      for (const resource of resources) {
        const { id, name, url } = resource;
        const resourceWithPosts = { ...resource, posts: posts.filter(post => post.resourceId === id) };
        await client.query(
          `INSERT INTO resources (resource_id, name, url, access_token, posts)
           VALUES ($1, $2, $3, $4, $5::jsonb)
           ON CONFLICT (name)
           DO UPDATE SET resource_id = EXCLUDED.resource_id, url = EXCLUDED.url, access_token = EXCLUDED.access_token, posts = EXCLUDED.posts`,
          [id, name, url, accessToken, JSON.stringify(posts)]
        );
      }

      await client.query('COMMIT');
      res.status(200).send('Data stored successfully');
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Error storing data:', error);
      res.status(500).send('Error storing data');
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error connecting to database:', error);
    res.status(500).send('Error connecting to database');
  }
});



app.get('/get-data/:name', async (req, res) => {
  const { name } = req.params;

  try {
    const client = await pool.connect();

    try {
      const result = await client.query(
        'SELECT * FROM resources WHERE name = $1',
        [name]
      );

      if (result.rows.length > 0) {
        res.status(200).json(result.rows[0]);
      } else {
        res.status(404).send('Resource not found');
      }
    } catch (error) {
      console.error('/get-data/:name error', error);
      res.status(500).send('/get-data/:name error');
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error connecting to database:', error);
    res.status(500).send('Error connecting to database');
  }
});


app.get('/get-posts-data/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const client = await pool.connect();

    try {
      const result = await client.query(
        'SELECT * FROM posts_data WHERE page_id = $1',
        [id]
      );

      if (result.rows.length > 0) {
        res.status(200).json(result.rows[0]);
      } else {
        res.status(404).send('Resource not found');
      }
    } catch (error) {
      console.error('/get-posts-data/:id error', error);
      res.status(500).send('/get-posts-data/:id error');
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error connecting to database:', error);
    res.status(500).send('Error connecting to database');
  }
});




app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});



app.post('/store-page-data', async (req, res) => {
  const { pageId, content } = req.body;

  try {
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      await client.query(
        `INSERT INTO posts_data (page_id, content)
         VALUES ($1, $2)
         ON CONFLICT (page_id)
         DO UPDATE SET content = EXCLUDED.content`,
        [pageId, content]
      );

      await client.query('COMMIT');
      res.status(200).send('Data stored successfully');
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Error storing data:', error);
      res.status(500).send('Error storing data');
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error connecting to database:', error);
    res.status(500).send('Error connecting to database');
  }
});

