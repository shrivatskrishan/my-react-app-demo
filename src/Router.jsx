import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router';
const TodoList = lazy(() => import('./todo-dashboard'));

const Router = () => {
  return (
    <>
      <Suspense fallback={<div>loading</div>}>
        <Routes>
          <Route path="/" element={<TodoList />} />
        </Routes>
      </Suspense>
    </>
  );
};
export default Router;
