import React, { useEffect, useState } from 'react';
import TableItemWorkers from './TableItemWorkers/TableItemWorkers';
import { useFetching } from '../../hooks/useFetching';
import WorkerService from '../../API/WorkerService';
import { IWorker } from '../../types/IWorker';
import Loading from '../Loading/Loading';
import Pagination from '../UI/Pagination/Pagination';

const TableListWorkers = () => {
  const [reloadPage, setReloadPage] = useState(false);

  const reloadPageCallback = () => {
    setReloadPage(!reloadPage)
  }

  const [workers, setWorkers] = useState<IWorker[]>([]);
  const [activePage, setActivePage] = useState(1);

  const [fetchProduct, isLoading, isError] = useFetching(async () => {
    const response = await WorkerService.getWorker(activePage, 10);
    const data = await response.json();
    setWorkers(data.workers)
  });

  useEffect(() => {
    fetchProduct().then()
  }, [activePage, reloadPage])


  if (isLoading) {
    return <Loading/>
  } else if (isError) {
    return <div>Error fetching</div>
  } else {
    console.log(workers)
    return (
      <>
        {workers.map((worker) => (
          <TableItemWorkers key={worker.id} worker={worker} reloadCallback={reloadPageCallback}/>
        ))}
        <Pagination totalPages={20} activePage={activePage} setActivePage={setActivePage}/>
      </>
    )
  }
};

export default TableListWorkers;