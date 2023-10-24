import './popUp.scss';

const PopUp = () => {
    return (
        <div className="modal none">
            <div className="modal-content">
                <button className="modal-close">&times;</button>
                <div className="modal-text">
            </div>
        </div>
    </div>
    );
}

export default PopUp;
