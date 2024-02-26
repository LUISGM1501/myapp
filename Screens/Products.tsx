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
// Función para eliminar productos por nombre o ID
// Función para eliminar productos por nombre o ID
const deleteProducts = async (identifier: string, byName: boolean): Promise<Product | null> => {
  try {
    // Obtener la lista de productos actual
    const productsJSON = await AsyncStorage.getItem('products');
    if (productsJSON !== null) {
      const products: Product[] = JSON.parse(productsJSON);

      // Filtrar productos según el nombre o ID
      const updatedProducts = products.filter(product => {
        if (byName) {
          return product.name !== identifier;
        } else {
          return product.id !== identifier;
        }
      });

      // Guardar la lista actualizada de productos
      await AsyncStorage.setItem('products', JSON.stringify(updatedProducts));
      console.log('Producto(s) eliminado(s) correctamente');

      // Encontrar el producto eliminado en caso de que haya sido eliminado por ID
      const deletedProduct = products.find(product => {
        if (!byName && product.id === identifier) {
          return true;
        }
        return false;
      });

      return deletedProduct || null;
    } else {
      console.log('No hay productos para eliminar');
      return null;
    }
  } catch (error) {
    console.error('Error al eliminar producto(s):', error);
    throw error;
  }
};

export { saveProducts, getProducts, deleteProducts };  export type { Product };

