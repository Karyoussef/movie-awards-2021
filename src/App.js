import { useState } from 'react';
import { useGetAwardsListQuery } from './services/awards';
import appStyle from './styles/appStyle.module.css';
import CategoryWrapper from './components/CategoryWrapper';
import SuccessModal from './components/SuccessModal';
import { ColorRing } from 'react-loader-spinner';

function App() {

    const [showModal, setShowModal] = useState(false);
    const { data, error, isLoading } = useGetAwardsListQuery();

    function isAllSelected() {
        if (!data) {
            return false;
        }
        
        let res = data.every((award) => award.selectedId !== null);

        return res;
    }

    function renderCategories() {
        return data.map((category) => (
            <CategoryWrapper key={category.id} category = {category} />
        ));
    }

    function renderSubmitButton() {
        if (!isAllSelected()) {
            return null;
        }
        return (
            <button onClick={() => setShowModal(true)} className={appStyle.submitButton}>
                Submit Ballot
            </button>
        )
    }

    function renderMainContent() {
        
        if (isLoading) {
            return (
                <ColorRing
                    visible={true}
                    height="120"
                    width="120"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass={appStyle.loaderWrapper}
                    colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                />
            )
        }

        if (error) {
            return (
                <h1>
                    ERROR
                </h1>
            )
        }

        return (
            <div>
                {renderCategories()}
                {renderSubmitButton()}
            </div>
        );
    }

    return (
        <div className={appStyle.app}>
            <h1 className={appStyle.appTitle}>
                Awards 2021
            </h1>
            {renderMainContent()}
            <SuccessModal results = {data} show = {showModal} handleCloseModal={() => setShowModal(false)} />            
        </div>
    );
}

export default App;
