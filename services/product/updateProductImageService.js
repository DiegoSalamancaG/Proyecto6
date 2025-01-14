import { Product } from "../../models/product";

export async function updateProductImageService(id, imageUrl) {
    try {
        const product = await Product.findOneAndUpdate({ _id: id, activo: true }, { image: imageUrl }, { new: true }).select("-password -activo");
        return product;
    } catch (error) {
        throw new error("Error al procesar el servicio de actualización de producto", error);
    }
}