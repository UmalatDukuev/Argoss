import React from 'react';
import ModalButton from './ModalButton';

const Semen: React.FC = () => {
  return (
    <div>
      <h1>Semen Component</h1>
      <ModalButton path="/semen" element={<Semen />} />
    </div>
  );
};

export default Semen;