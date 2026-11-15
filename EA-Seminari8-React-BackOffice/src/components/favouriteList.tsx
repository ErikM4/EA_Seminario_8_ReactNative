import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useStore } from '@nanostores/react';
import { Ionicons } from '@expo/vector-icons';
import type { Book } from '../models';
import { favoritesStore, toggleFavorite } from '../stores/favoritesStore';
import { BookCard } from './BookCard';
import { ViewToggle, ViewMode } from './ViewToggle';

export function FavouriteList() {
  const router = useRouter();
  const favorites = useStore(favoritesStore);
  const [viewMode, setViewMode] = useState<ViewMode>('list');

  const handleEdit = (book: Book) => {
    router.push({
      pathname: '/(tabs)/books/[id]/edit',
      params: { id: book._id },
    });
  };

  const handleDetail = (book: Book) => {
    router.push({
      pathname: '/(tabs)/books/[id]',
      params: { id: book._id },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Mis Favoritos</Text>
          <Text style={styles.subtitle}>
            {favorites.length} {favorites.length === 1 ? 'libro guardado' : 'libros guardados'}
          </Text>
        </View>
      </View>

      {favorites.length > 0 ? <ViewToggle mode={viewMode} onChange={setViewMode} /> : null}

      <FlatList
        data={favorites}
        keyExtractor={(item: Book) => item._id}
        renderItem={({ item }: { item: Book }) => (
          <BookCard
            book={item}
            viewMode={viewMode}
            onEdit={handleEdit}
            onDelete={toggleFavorite}
            onPress={() => handleDetail(item)}
          />
        )}
        contentContainerStyle={favorites.length === 0 ? styles.emptyList : styles.list}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="heart-outline" size={48} color="#94A3B8" />
            <Text style={styles.emptyTitle}>No tienes libros favoritos</Text>
            <Text style={styles.emptySubtitle}>
              Marca libros desde el catálogo para verlos aquí
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
  },
  subtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
  },
  list: {
    paddingBottom: 24,
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    gap: 8,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#475569',
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#94A3B8',
  },
});