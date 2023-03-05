import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { categoriesMapSelector, selectCategoriesIsLoading } from "../../store/category/category.selector";
import ProductCard from '../../components/product-card/product-card.component';
import './category.styles.scss';
import Spinner from '../../components/spinner/spinner.component';

const Category = () => {
    const { category } = useParams()
    const isLoading = useSelector(selectCategoriesIsLoading);
    const categoriesMap = useSelector(categoriesMapSelector);
    const [products, setProducts] = useState(categoriesMap[category])
    useEffect(() => {
        setProducts(categoriesMap[category])
    }, [categoriesMap, category])

    return (
        <Fragment>
            <h2 className='category-title'>
                {category}
            </h2>
            {
                isLoading ? (<Spinner />) : (<div className='category-container'>
                    {products &&
                        products.map((product) => <ProductCard key={product.id} product={product} />)
                    }
                </div>)
            }

        </Fragment>

    )
}

export default Category;