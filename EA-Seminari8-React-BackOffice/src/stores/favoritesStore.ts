import AsyncStorage from '@react-native-async-storage/async-storage';
import { atom } from 'nanostores';
import type { Book } from '../models';

const STORAGE_KEY = 'favorites-books';

export const favoritesStore = atom<Book[]>([]);

export async function loadFavorites() {
  try {
    const saved = await AsyncStorage.getItem(STORAGE_KEY);
    if (saved) {
      favoritesStore.set(JSON.parse(saved));
    }
  } catch {
  }
}

favoritesStore.listen(async (books: readonly Book[]) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  } catch {
  }
});

export function toggleFavorite(book: Book) {
  const current = favoritesStore.get();
  const exists = current.some((b: Book) => b._id === book._id);

  if (exists) {
    favoritesStore.set(current.filter((b: Book) => b._id !== book._id));
  } else {
    favoritesStore.set([...current, book]);
  }
}