

import './App.css'
import MainLayout from './layout/MainLayout'
import {ToastContainer } from 'react-toastify'


function App() {


  return (
    <main>
      <MainLayout />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </main>
  )
}

export default App
