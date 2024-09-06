import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

interface BlogPostFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (title: string, content: string, image: File | null) => void;
}

const BlogPostForm: React.FC<BlogPostFormProps> = ({ open, onClose, onSubmit }) => {
  const { control, handleSubmit, reset } = useForm();
  const [image, setImage] = useState<File | null>(null);

  const handleFormSubmit = (data: any) => {
    onSubmit(data.title, data.content, image);
    reset();
    setImage(null);
  };

  const handleClose = () => {
    reset();
    setImage(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Blog Post</DialogTitle>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent>
          <Controller
            name="title"
            control={control}
            defaultValue=""
            rules={{ required: 'Title is required' }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Title"
                fullWidth
                margin="normal"
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
          <Controller
            name="content"
            control={control}
            defaultValue=""
            rules={{ required: 'Content is required' }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Content"
                fullWidth
                multiline
                rows={4}
                margin="normal"
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Add Post
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default BlogPostForm;
