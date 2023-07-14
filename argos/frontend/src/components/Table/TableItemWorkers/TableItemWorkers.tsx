import React, { FC, useState } from 'react';
import classes from './TableItemWorkers.module.scss';
import ModalCard from '../../UI/ModalCard/ModalCard';
import EmployeeCard from '../../EmployeeCard/EmployeeCard';
import { IWorker } from '../../../types/IWorker';
import DeleteWorkerModal from '../../DeleteWorkerModal/DeleteWorkerModal';
import WorkerService from '../../../API/WorkerService';

interface TableItemWorkersProps {
    worker: IWorker,
    reloadCallback: () => void,
}

const TableItemWorkers: FC<TableItemWorkersProps> = ({worker, reloadCallback}) => {
  const [modalActive, setModalActive] = useState(false);
  const [deleteOn, setDeleteOn] = useState(false);
  const handleClickOpenModal = () => {
    setModalActive(!modalActive);
  };
  const handleClickDeleteModal = () => {
    setDeleteOn(true);
    setModalActive(false);
  };
  const handleClickDeleteCancellation = () => {
    setDeleteOn(false);
    setModalActive(true);
  };
  const handleClickDeleteWorker = () => {
    WorkerService.deleteWorker(worker).then(() => {
        reloadCallback();
    });
    setDeleteOn(false);
  };

  return (
    <div className={classes.row}>
      <div className={classes.row__block} onClick={handleClickOpenModal}>
        <p>{worker.name}</p>
      </div>
      <div className={classes.row__block}>
        <p>{worker.department}</p>
      </div>
      <div className={classes.row__block}>
        <p>{worker.occupation}</p>
      </div>
      <ModalCard title={'Карточка сотрудника'} modalActive={modalActive} setModalActive={setModalActive}
                 variant={'long'} styleButton={[{
        text: 'Редактировать',
        buttonColor: 'violet',
      },
        { text: 'Отчет', buttonColor: 'grey', border: true },
        { text: 'Удалить', buttonColor: 'redText' }]}
                 handlerButton={[handleClickDeleteModal, handleClickDeleteModal, handleClickDeleteModal]}>
        <EmployeeCard name={worker.name} department={worker.department} occupation={worker.occupation}
                      other_info={{}} />
      </ModalCard>
      <ModalCard modalActive={deleteOn} setModalActive={setDeleteOn}
                 title={'Удалить данные о сотруднике?'}
                 styleButton={[{ text: 'Удалить', buttonColor: 'red' }, { text: 'Отмена', buttonColor: 'grey' }]}
                 handlerButton={[handleClickDeleteWorker, handleClickDeleteCancellation]}>
        <DeleteWorkerModal name={worker.name} />
      </ModalCard>
    </div>
  );
};

export default TableItemWorkers;