import './modal.scss';

const Modal = ({onSetModal, text}) => {
    return (
        <div className={`modal`}>
            <div className="modal-content">
                <button className="modal-close" onClick={onSetModal}>&times;</button>
                <div className="modal-text">{text}</div>
        </div>
    </div>
    );
}

export default Modal;
