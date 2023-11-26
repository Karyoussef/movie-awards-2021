import modalStyle from '../styles/modalStyle.module.css';
import { useTransition, animated, easings } from "@react-spring/web";
import { useEffect, useRef } from 'react';

const SuccessModal = ({ results, show, handleCloseModal }) => {
    const modalRef = useRef();

    const overlayTransition = useTransition(show, {
		from: { opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0 },
        config: {duration: 500}
	});

    const modalTransition = useTransition(show, {
		from: { y: 800 },
		enter: { y: 0 },
		leave: { y: 800 },
        config: {duration: 500, easing: easings.easeOutQuart}
	});
    
    useEffect(() => {
        if (show) {
            modalRef?.current.classList.add(modalStyle.highZindex);
        } else {
            setTimeout(() => {
                modalRef?.current.classList.remove(modalStyle.highZindex);
            }, 550);
        }
    }, [show])

    function formatResults() {
        let formattedResults = results.map((nomination) => {
            let selectedActor = nomination.nominees.find((nominee) => nominee.id === nomination.selectedId);
            return { categoryTitle: nomination.title , name: selectedActor.name};
        })
        return formattedResults;
    }

    function renderResults() {
        let formattedResults = formatResults();
        return formattedResults.map((fr, index) => (
            <div key={index}>
                {fr.categoryTitle}: {fr.name}
            </div>
        ));
    }

    return (
        <div ref={modalRef} className={modalStyle.modalWrapper}>            
            {overlayTransition((overlayStyle, overlayShow) => {
                if (overlayShow) {
                    return (
                        <animated.div
                            onClick={() => handleCloseModal()}
                            style={overlayStyle}
                            className={modalStyle.customOverlay}
                        >
                        </animated.div>
                    )
                }
            })}

            {modalTransition((modalBoxStyle, modalShow) => {
                if (modalShow) {
                    return (
                        <animated.div
                            style={modalBoxStyle}
                            className={modalStyle.modalBox}
                        >   
                            <div onClick={() => handleCloseModal()} className={modalStyle.closeBtn}>
                                X
                            </div>
                            You have successfully submitted your nominations ballot as follows:
                            <div className={modalStyle.resultsWrapper}>
                                {renderResults()}
                            </div>
                        </animated.div>
                    )
                }
            })}
        </div>
    )
}

export default SuccessModal;