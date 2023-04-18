import {promises as fs} from "fs";

export default class ProductManager {
    constructor() {
        this.patch = "./products.txt";
        this.productos = [];
    }

    static id = 0

    addProduct = async (title, description, price, img, code, stock) => {

        ProductManager.id++

        let newProduct = {
            id: ProductManager.id,
            title,
            description,
            price,
            img,
            code,
            stock
        }

        this.productos.push(newProduct)


        await fs.writeFile(this.patch, JSON.stringify(this.productos))
    };

    readProducts = async() => {
        let respuesta =await fs.readFile(this.patch, "utf-8")
        return JSON.parse(respuesta)
    }

    getProducts = async () => {
      try {
        let respuesta2 = await this.readProducts();
        console.log(respuesta2);
        return respuesta2;
      } catch (error) {
        console.error('Error in getProducts:', error);
      }
    };

    getProductsById = async(id) => {
        try {
            const products = await this.readProducts();
            const product = products.find(product => product.id === id);
        
            if (product) {
              return console.log(product);
            } else {
              throw new Error('Product not found');
            }
          } catch (error) {
            console.log(error.message);
          }

    };

    deleteProductsById = async (id) => {
        try {
          const products = await this.readProducts();
          const productFilter = products.filter(product => product.id !== id);
          await fs.writeFile(this.patch, JSON.stringify(productFilter));
        } catch (error) {
            console.log(error.message);
        }
    };

    updateProduct = async ({id, ...product}) => {
        try {
          await this.deleteProductsById(id);
          let productOld = await this.readProducts();
          let productsModif = [{id, ...product}, ...productOld];
          await fs.writeFile(this.patch, JSON.stringify(productsModif));
        } catch (error) {
          console.error('Error in updateProduct:', error);
        }
      };

}

/*const products = new ProductManager
products.addProduct("Titulo 1", "Description 1", 1000, "img1", "abc123", 5)
products.addProduct("Titulo 2", "Description 2", 2000, "img2", "abc123", 5)
products.addProduct("Titulo 3", "Description 3", 3000, "img3", "abc123", 5)
products.addProduct("Titulo 4", "Description 4", 4000, "img4", "abc123", 5)
products.addProduct("Titulo 5", "Description 5", 5000, "img5", "abc123", 5)
products.addProduct("Titulo 6", "Description 6", 6000, "img6", "abc123", 5)
products.addProduct("Titulo 7", "Description 7", 7000, "img7", "abc123", 5)
products.addProduct("Titulo 8", "Description 8", 8000, "img8", "abc123", 5)
products.addProduct("Titulo 9", "Description 9", 9000, "img9", "abc123", 5)
products.addProduct("Titulo 10", "Description 10", 10000, "img10", "abc123", 5)*/

//products.getProducts()

// products.getProductsById(2);

// products.deleteProductsById(2)

// products.updateProduct({
//     id: 2,
//     title: 'Titulo UPDATE',
//     description: 'Description UPDATE',
//     price: 4000,
//     img: 'img1',
//     code: 'abc123',
//     stock: 5
// })