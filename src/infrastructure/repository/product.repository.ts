import Product from "../../domain/product/entity/product";
import ProductRepositoryInterface from "../../domain/product/repository/product.repository.interface";
import ProductModel from "../db/sequelize/model/product.model";

export default class ProductRepository implements ProductRepositoryInterface {
	async create(entity: Product): Promise<void> {
		await ProductModel.create({
			id: entity.id,
			name: entity.name,
			price: entity.price,
		});
	}

	async update(entity: Product): Promise<void> {
		await ProductModel.update(
			{
				name: entity.name,
				price: entity.price,
			},
			{
				where: { id: entity.id },
			}
		);
	}

	async findById(id: string): Promise<Product> {
		const productModel = await ProductModel.findOne({ where: { id } });

		return new Product(productModel.id, productModel.name, productModel.price);
	}

	async findAll(): Promise<Product[]> {
		const productsModel = await ProductModel.findAll();

		return productsModel.map(
			(productModel) =>
				new Product(productModel.id, productModel.name, productModel.price)
		);
	}
}
