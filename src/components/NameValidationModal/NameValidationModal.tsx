import React from 'react';

interface NameValidationModalProps {
  onClose: () => void;
}

const NameValidationModal: React.FC<NameValidationModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-gray-100 p-8 rounded-lg shadow-xl text-center">
        <h2 className="text-2xl font-bold mb-4 text-[#6BA76B]">Nom Invalide</h2>
        <p className="mb-4 text-gray-700">Le nom doit contenir entre 3 et 12 caractères.</p>
        <button
          className="bg-[#95C695] hover:bg-[#6BA76B] text-white font-bold py-2 px-4 rounded transition-colors duration-300"
          onClick={onClose}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default NameValidationModal;
