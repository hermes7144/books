import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getBooks, addNewBook, getUserSellBooks } from '../api/firebase';

export default function useBooks(uid?, search?) {
  const queryClient = useQueryClient();

  const booksQuery = useQuery({ queryKey: ['books'], queryFn: getBooks, staleTime: 5000 * 60 });
  const searchBooks = useQuery({ queryKey: ['books', search], queryFn: () => getBooks(search), staleTime: 5000 * 60 });

  const sellBooks = useQuery({ queryKey: ['sellBooks', uid], queryFn: () => getUserSellBooks(uid), staleTime: 5000 * 60 });

  const addBook = useMutation({ mutationFn: (book: any) => addNewBook(book), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['books'] }) });

  return { booksQuery, searchBooks, addBook, sellBooks };
}
