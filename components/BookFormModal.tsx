
import React, { useState, useEffect, useRef } from 'react';
import { Book, Genre } from '../types';
import { GENRES } from '../constants';
import { XIcon } from './icons/XIcon';
import { ImageIcon } from './icons/ImageIcon';

interface BookFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (book: any) => void;
  initialData: Book | null;
}

const BookFormModal: React.FC<BookFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState<Genre>(GENRES[0]);
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setAuthor(initialData.author);
      setGenre(initialData.genre);
      setCoverUrl(initialData.coverUrl);
    } else {
      setTitle('');
      setAuthor('');
      setGenre(GENRES[0]);
      setCoverUrl(null);
    }
  }, [initialData, isOpen]);
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && author.trim()) {
      onSave(initialData ? { ...initialData, title, author, genre, coverUrl } : { title, author, genre, coverUrl });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md" role="dialog" aria-modal="true">
        <div className="flex justify-between items-center p-5 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            {initialData ? 'Edit Book' : 'Add New Book'}
          </h2>
          <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-600" aria-label="Close modal">
            <XIcon className="h-6 w-6"/>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="author" className="block text-sm font-medium text-gray-700">
                Author
              </label>
              <input
                id="author"
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Book Cover
                </label>
                <div className="flex items-center space-x-4">
                    <div className="w-24 h-36 rounded-md bg-gray-100 flex items-center justify-center overflow-hidden border">
                        {coverUrl ? (
                            <img src={coverUrl} alt="Cover preview" className="w-full h-full object-cover" />
                        ) : (
                            <ImageIcon className="w-10 h-10 text-gray-300" />
                        )}
                    </div>
                    <div>
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            className="hidden"
                        />
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="px-3 py-2 text-sm bg-white text-gray-700 border border-gray-300 rounded-md font-semibold hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Upload Image
                        </button>
                        {coverUrl && (
                            <button
                                type="button"
                                onClick={() => setCoverUrl(null)}
                                className="ml-2 px-3 py-2 text-sm text-red-700 hover:text-red-900 font-medium"
                            >
                                Remove
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <div>
              <label htmlFor="genre" className="block text-sm font-medium text-gray-700">
                Genre
              </label>
              <select
                id="genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value as Genre)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-white"
              >
                {GENRES.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3 rounded-b-lg">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md font-semibold hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white border border-transparent rounded-md font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookFormModal;
