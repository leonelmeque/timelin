type UploadResult = {
  downloadURL: string;
};

export const uploadImage = async (
  imagePath: string,
  metadata?: Record<string, any>
): Promise<UploadResult> => {
  const res = await fetch(imagePath);
  const blob = await res.blob();

  const formData = new FormData();
  formData.append('file', blob);
  if (metadata) {
    formData.append('metadata', JSON.stringify(metadata));
  }

  const response = await fetch('/api/storage/upload', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Upload failed');
  }

  return response.json();
};
