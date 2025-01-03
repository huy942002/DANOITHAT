import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import { toast } from 'react-toastify';
import logo from '~/assets/images/logo250x250.png';

import axios from 'axios';

import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const objLogin = {
    username: '',
    password: '',
};


const LoginSchema = Yup.object().shape({
    username: Yup.string().max(255, 'Vượt quá 255 kí tự').required('Tên tài khoản không được để trống'),
    password: Yup.string()
        .min(8, 'Mật khẩu ít nhất 8 kí tự')
        .max(255, 'Vượt quá 255 kí tự')
        .required('Mật khẩu không được để trống'),
});

const url = 'http://localhost:8080/auth/signin';

function LoginAdmin() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('username');
        window.localStorage.removeItem('dateTimeStart');
        window.localStorage.removeItem('role');
    }, []);

    const handleLogin = async (data) => {
        const now = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000)
            .toISOString()
            .replace('T', ' ')
            .slice(0, 16);
        await axios
            .post(url, data)
            .then((res) => {
                console.log(res.data);
                window.localStorage.setItem('token', res.data.token);
                window.localStorage.setItem('username',  data.username);
                window.localStorage.setItem('dateTimeStart', now);
                window.localStorage.setItem('role', res.data.role);
                navigate('/admin/product-category');
                window.location.reload();
            })
            .catch((error) => {
                toast.error('Sai thông tin đăng nhập', { autoClose: 2000 });
                throw Error(error);
            });
    };

    return (
        <div className="grid grid-cols-3 gap-4 place-content-center p-8 bg-admin-login-hotel bg-cover h-screen">
            <div className="col-start-2 bg-gray-100 p-8 rounded">
                <div className="flex justify-center items-center">
                    <img src={logo} alt="logo" />
                </div>
                <h1 className="mb-5 text-3xl text-center font-bold text-blue-400">Welcome</h1>
                <Formik
                    enableReinitialize
                    initialValues={objLogin}
                    validationSchema={LoginSchema}
                    onSubmit={(values) => {
                        handleLogin(values);
                    }}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    Tên đăng nhập
                                </label>
                                <div className="relative">
                                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                        <FontAwesomeIcon icon={faUser} />
                                    </div>
                                    <Field
                                        name="username"
                                        type="text"
                                        className={`
                                        bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                                        ${errors.username && touched.username ? 'border-2 border-rose-600' : ''} `}
                                    />
                                </div>
                                {errors.username && touched.username ? (
                                    <div className="text-sm text-red-600 mt-2">{errors.username}</div>
                                ) : null}
                            </div>
                            <div className="mt-4">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    Mật khẩu
                                </label>
                                <div className="relative">
                                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                        <FontAwesomeIcon icon={faLock} />
                                    </div>
                                    <Field
                                        name="password"
                                        type="password"
                                        className={`
                                        bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                                        ${errors.password && touched.password ? 'border-2 border-rose-600' : ''} `}
                                    />
                                </div>
                                {errors.password && touched.password ? (
                                    <div className="text-sm text-red-600 mt-2">{errors.password}</div>
                                ) : null}
                            </div>
                            <div className="mt-4">
                                <button
                                    type="submit"
                                    className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                >
                                    Đăng nhập
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default LoginAdmin;
