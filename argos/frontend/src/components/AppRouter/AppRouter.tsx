import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import SideBarLayout from '../SideBarLayout/SideBarLayout';
import Lexa4 from '../../dev/lexa4/lexa4';
import Lexa2 from '../../dev/lexa2/lexa2';
import NoticePopUp from '../../dev/noticePopUp/noticePopUp';
import UploadTemplate from '../UploadTemplate/UploadTemplate';
import ModalButton from '../../dev/semen/ModalButton';
import Semen from '../../dev/semen/semen';
import Layout from '../../pages/Layout/Layout';
import Table from '../Table/Table';

const AppRouter = () => {
  const [page, setPage] = useState(false);

  return (
    <Routes>
      <Route path="/" element={<SideBarLayout page={page} setPage={setPage} />}>
        <Route path="/"  element={<Layout/>}>
          <Route index element={<Table page={page} />}/>
        </Route>
      </Route>


      <Route path={'/lexa'} element={<Lexa4 />} />
      <Route path={'/lexa2'} element={<Lexa2 />} />
      <Route path='/noticePopUp' element={<NoticePopUp />} />
      <Route path={'/upload'} element={<UploadTemplate />} />
      <Route path='/semen' element={<ModalButton path='/semen' element={<Semen />} />} />
    </Routes>
  );
};

export default AppRouter;