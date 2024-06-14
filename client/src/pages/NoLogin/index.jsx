import React, { useEffect } from 'react';
import DefaultLayout from '../../layouts/DefaultLayout';
import { login } from '../../api/auth';
import { useDispatch } from 'react-redux';

function NoLogin() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(login());
  });

  return (
    <>
      <DefaultLayout>

      </DefaultLayout>
    </>
  );
}

export default NoLogin;
