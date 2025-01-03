import { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminLayout from './layouts/AdminVer2/admin-layout';

import authoService from '~/services/authorServices';

import '~/global/global.css';

import { privateRoutes, publicRoutes, privateRoutesDirect } from '~/routes/routes';
import LoginAdmin from './pages/Admin/LoginAdmin';
import NotFound from './pages/Notfound';

function App() {
    useEffect(() => {
        
    }, []);

    return (
        <Router>
            <div>
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = Fragment;
                        if (route.layout) {
                            Layout = route.layout;
                        }
                        return <Route key={index} path={route.path} element={
                            <Layout>
                                <Page />
                            </Layout>
                        } />;
                    })}
                    {privateRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = AdminLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    authoService.role === 'ADMIN' ? (
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    ) : (
                                        <LoginAdmin />
                                    )
                                }
                            />
                        );
                    })}
                    {privateRoutesDirect.map((route, index) => {
                        const Page = route.component;
                        let Layout = AdminLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    authoService.role === 'ADMIN' ? (
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    ) : (
                                        <NotFound />
                                    )
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
