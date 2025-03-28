import { supabase } from './supabase';

export const uploadImage = async (file) => {
  const fileName = `comments/${Date.now()}_${file.name}`;

  const { data, error } = await supabase.storage
    .from('comments')
    .upload(fileName, file);

  if (error) {
    throw error;
  }

  const { data: urlData } = supabase
    .storage
    .from('comments')
    .getPublicUrl(fileName);

  return urlData.publicUrl;
};
