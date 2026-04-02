import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import Header from '../components/Header';
import { Upload, Bold, Italic, Underline, List } from 'lucide-react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import UnderlineExtension from '@tiptap/extension-underline';

interface Insight {
  title: string;
  content: string;
  image_url: string;
  author_id?: string;
}

const InsightEditor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [insight, setInsight] = useState<Insight>({
    title: '',
    content: '',
    image_url: '',
  });
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (insight.content) {
      editor?.commands.setContent(insight.content);
    }
  }, [insight.content]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      UnderlineExtension,
    ],
    content: insight.content,
    onUpdate: ({ editor }) => {
      setInsight(prev => ({
        ...prev,
        content: editor.getHTML()
      }));
    },
  });

  useEffect(() => {
    if (id) {
      fetchInsight();
    }
  }, [id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB');
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async () => {
    if (!imageFile) return null;
    
    try {
      setUploading(true);
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Math.random().toString(36).slice(2)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('blog-images')
        .upload(filePath, imageFile);

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    } finally {
      setUploading(false);
    }
  };

  const fetchInsight = async () => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching insight:', error);
      return;
    }

    if (data) {
      setInsight(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      setUploading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setError('You must be logged in to create or edit insights');
        return;
      }

      let imageUrl = insight.image_url;
      if (imageFile) {
        imageUrl = await uploadImage();
        if (!imageUrl) {
          setError('Failed to upload image');
          return;
        }
      }

      if (id) {
        const { error: updateError } = await supabase
          .from('blog_posts')
          .update({ ...insight, image_url: imageUrl })
          .eq('id', id);

        if (updateError) {
          setError(updateError.message);
          return;
        }
      } else {
        const { error: insertError } = await supabase
          .from('blog_posts')
          .insert([{
            ...insight,
            image_url: imageUrl,
            author_id: user.id
          }]);

        if (insertError) {
          setError(insertError.message);
          return;
        }
      }

      navigate('/insights');
    } catch (err) {
      console.error('Error saving insight:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          {id ? 'Edit Insight' : 'New Insight'}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded">
              {error}
            </div>
          )}
          
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={insight.title}
              onChange={(e) => setInsight({ ...insight, title: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Image
            </label>
            <div className="mt-1 flex items-center space-x-4">
              <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                <div className="flex items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-indigo-500">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <span>Upload image</span>
                      <input
                        id="image"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                  </div>
                </div>
              </label>
              {(imagePreview || insight.image_url) && (
                <div className="relative h-32 w-32">
                  <img
                    src={imagePreview || insight.image_url}
                    alt="Preview"
                    className="h-full w-full object-cover rounded-md"
                  />
                </div>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Content
            </label>
            <div className="border rounded-md overflow-hidden">
              <div className="flex items-center gap-2 p-2 border-b bg-gray-50">
                <button
                  type="button"
                  onClick={() => editor?.chain().focus().toggleBold().run()}
                  className={`p-1 rounded hover:bg-gray-200 ${editor?.isActive('bold') ? 'bg-gray-200' : ''}`}
                >
                  <Bold className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => editor?.chain().focus().toggleItalic().run()}
                  className={`p-1 rounded hover:bg-gray-200 ${editor?.isActive('italic') ? 'bg-gray-200' : ''}`}
                >
                  <Italic className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => editor?.chain().focus().toggleUnderline().run()}
                  className={`p-1 rounded hover:bg-gray-200 ${editor?.isActive('underline') ? 'bg-gray-200' : ''}`}
                >
                  <Underline className="w-5 h-5" />
                </button>
                <div className="w-px h-5 bg-gray-300 mx-1" />
                <button
                  type="button"
                  onClick={() => editor?.chain().focus().toggleBulletList().run()}
                  className={`p-1 rounded hover:bg-gray-200 ${editor?.isActive('bulletList') ? 'bg-gray-200' : ''}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
              <EditorContent
                editor={editor}
                className="prose max-w-none p-4 min-h-[300px] focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate('/insights')}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              {uploading ? 'Uploading...' : `${id ? 'Update' : 'Create'} Insight`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InsightEditor;