import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ErrorBoundary from '../error-boundary/error-boundary';
import Routes from '../route/route';
import Header from '../header/header';
import { useSelector } from 'react-redux';
import { AppState, useAppThunkDispatch } from '../../redux/store';
import 'react-toastify/dist/ReactToastify.css';
import { sampleApi, updateCount } from '../../redux/actions/common';
import { ToastContainer } from 'react-toastify';

const App = () => {
    const count = useSelector((state: AppState) => state.common.count);
    const dispatch = useAppThunkDispatch();

    return (
        <>
        <ToastContainer />
            <Router>
                {/* <ErrorBoundary>
                    <Header />
                </ErrorBoundary>
                <div>
                    <div>
                        <div>
                            <ErrorBoundary>
                                <Routes />
                            </ErrorBoundary>
                        </div>
                        {count}
                        <button onClick={() => dispatch(updateCount())}>Add</button>
                        <button onClick={() => dispatch(sampleApi())}>API Check</button>
                    </div>
                </div> */}
                <div>
                            <ErrorBoundary>
                                <Routes />
                            </ErrorBoundary>
                        </div>
            </Router>
        </>
    );
};
export default App as any;
