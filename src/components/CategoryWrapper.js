import categoryWrapperStyle from '../styles/categoryWrapperStyle.module.css';
import NomineeCard from './NomineeCard';

const CategoryWrapper = ({ category }) => {
    
    function renderNomineesCards(nominees) {
        let renderedCards = nominees.map((nominee) => (
            <NomineeCard key={nominee.id} categoryId = {category.id} selectedId = {category.selectedId} nominee = {nominee} />
        ))
        return (
            <div className={categoryWrapperStyle.nomineesWrapper}>
                {renderedCards}
            </div>
        )
    }

    return (
        <div className={categoryWrapperStyle.categoryWrapper}>
            <h2 className={categoryWrapperStyle.categoryTitle}>
                {category.title}
            </h2>
            {renderNomineesCards(category.nominees)}
        </div>
    )
}

export default CategoryWrapper;