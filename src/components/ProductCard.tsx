import { Product } from '../types';

interface Props {
	product: Product
}

export const ProductCard = (
	{ product: { name, description, price, category, image }
	}: Props) => {
	
	return (
		<>
			<div className='cardUser'>
				<img src={image} alt={name} />
				<h4>Nombre: {name}</h4>
				<p>{description}</p>
				<h5>Categoría: {category} </h5>
				<p>Precio: {price}</p>
			</div>
		</>
	)
}
