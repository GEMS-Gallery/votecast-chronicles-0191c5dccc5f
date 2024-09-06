import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { styled } from '@mui/system';

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderLeft: `4px solid ${theme.palette.primary.main}`,
}));

interface BlogPost {
  id: number;
  title: string;
  content: string;
  image: Uint8Array | null;
  timestamp: bigint;
}

interface BlogPostListProps {
  posts: BlogPost[];
}

const BlogPostList: React.FC<BlogPostListProps> = ({ posts }) => {
  return (
    <Grid container spacing={2}>
      {posts.map((post) => (
        <Grid item xs={12} key={post.id}>
          <StyledCard>
            <CardContent>
              <Typography variant="h5" component="div">
                {post.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {new Date(Number(post.timestamp) / 1000000).toLocaleString()}
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                {post.content}
              </Typography>
              {post.image && (
                <img
                  src={URL.createObjectURL(new Blob([post.image], { type: 'image/jpeg' }))}
                  alt="Post image"
                  style={{ maxWidth: '100%', marginTop: '16px' }}
                />
              )}
            </CardContent>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default BlogPostList;
