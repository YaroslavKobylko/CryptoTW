import { getDatabase, ref, get } from 'firebase/database';
import db from '../../firebase';

// Функція для отримання даних користувача з бази даних
export const fetchUserData = async (userId) => {
  try {
    const userDataRef = ref(db, `users/${userId}`);
    const snapshot = await get(userDataRef);
    return snapshot.val(); // Повертаємо дані користувача з бази даних
  } catch (error) {
    console.error('Error fetching user data from database:', error);
    throw error; // Передача помилки назад для обробки в компоненті
  }
};