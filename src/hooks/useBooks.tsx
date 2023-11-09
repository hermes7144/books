import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getBooks, addNewBook } from '../api/firebase';

export default function useBooks() {
  const queryClient = useQueryClient();

  const booksQuery = useQuery({ queryKey: ['books'], queryFn: getBooks, staleTime: 5000 * 60 });

  const addBook = useMutation({ mutationFn: (book: any) => addNewBook(book), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['books'] }) });

  return { booksQuery, addBook };
}
