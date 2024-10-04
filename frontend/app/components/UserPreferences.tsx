import React, { useState } from 'react';

interface Preference {
  source: string;
  category: string;
  author: string;
}

const UserPreferences: React.FC<{ onSave: (prefs: Preference) => void }> = ({ onSave }) => {
  const [source, setSource] = useState('');
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ source, category, author });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Source:
          <input type="text" value={source} onChange={(e) => setSource(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Category:
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Author:
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
        </label>
      </div>
      <button type="submit">Save Preferences</button>
    </form>
  );
};

export default UserPreferences;
