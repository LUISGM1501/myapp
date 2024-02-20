import AsyncStorage from '@react-native-async-storage/async-storage';

// Definición de la estructura del producto
interface Product {
  id: string;
  name: string;
  quantity: number;
  costPrice: number;
  sellingPrice: number;
  soldQuantity: number;
}

// Guardar productos
const saveProducts = async (products: Product[]) => {
  try {
    // Validar que la lista de productos no esté vacía
    if (products.length === 0) {
      console.error('No se pueden guardar productos vacíos.');
      return;
    }

    // Verificar si hay productos duplicados por ID o nombre
    const ids = new Set();
    const names = new Set();

    for (const product of products) {
      // Validar que todos los campos requeridos tengan valores válidos
      if (!product.id || !product.name || isNaN(product.quantity) || isNaN(product.costPrice) || isNaN(product.sellingPrice) || isNaN(product.soldQuantity)) {
        console.error('El producto tiene campos inválidos:', product);
        return;
      }

      if (ids.has(product.id)) {
        console.error(`Producto con ID duplicado: ${product.id}`);
        return;
      }
      ids.add(product.id);

      if (names.has(product.name)) {
        console.error(`Producto con nombre duplicado: ${product.name}`);
        return;
      }
      names.add(product.name);
    }

    // Si pasa las validaciones, guardar los productos
    await AsyncStorage.setItem('products', JSON.stringify(products));
    console.log('Productos guardados correctamente');
  } catch (error) {
    console.error('Error al guardar productos:', error);
  }
};


// Obtener productos
const getProducts = async (): Promise<Product[]> => {
  try {
    const productsJSON = await AsyncStorage.getItem('products');
    if (productsJSON !== null) {
      return JSON.parse(productsJSON);
    }
    return [];
  } catch (error) {
    console.error('Error al obtener productos:', error);
    return [];
  }
};

// Eliminar productos
const deleteProducts = async () => {
  try {
    await AsyncStorage.removeItem('products');
    console.log('Productos eliminados correctamente');
  } catch (error) {
    console.error('Error al eliminar productos:', error);
  }
};

export { saveProducts, getProducts, deleteProducts };  export type { Product };

