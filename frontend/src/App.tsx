import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, AppBar, Toolbar, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/system';
import BlogPostList from './components/BlogPostList';
import BlogPostForm from './components/BlogPostForm';
import { backend } from 'declarations/backend';

const StyledFab = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
}));

const App: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const fetchedPosts = await backend.getPosts();
      setPosts(fetchedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleAddPost = async (title: string, content: string, image: File | null) => {
    try {
      let imageBlob = null;
      if (image) {
        const arrayBuffer = await image.arrayBuffer();
        imageBlob = new Uint8Array(arrayBuffer);
      }
      await backend.addPost(title, content, imageBlob);
      await fetchPosts();
      setIsFormOpen(false);
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            USA Election Blog
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <BlogPostList posts={posts} />
        <StyledFab color="secondary" aria-label="add" onClick={() => setIsFormOpen(true)}>
          <AddIcon />
        </StyledFab>
        <BlogPostForm open={isFormOpen} onClose={() => setIsFormOpen(false)} onSubmit={handleAddPost} />
      </Container>
    </Box>
  );
};

export default App;
