import { useState } from 'react';

export default function Home() {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('https://your-api.up.railway.app/caption', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    setCaption(data.caption);
    setLoading(false);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🖼️ Image Captioning</h1>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Generate Caption</button>
      {loading && <p>Loading...</p>}
      {caption && <p><strong>Caption:</strong> {caption}</p>}
    </div>
  );
}
