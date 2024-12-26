import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import { faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Modal } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Label, FileInput } from 'flowbite-react';

import { toast } from 'react-toastify';

import { getAllColor, CreateColor, UpdateColor, getByIdColor } from '~/app/reducers/Color'


const colorObj = {
    id: '',
    colorName: '',
    img: '',
    status: 1
};

const colorSchema = Yup.object().shape({
    colorName: Yup.string().required('Tên thể loại không được để trống'),
    // img: Yup.string().required('Ảnh không được để trống'),
});

function ColorManage() {
    const [visibleDeleteColor, setVisibleDeleteColor] = useState(false);
    const [visibleUpdateColor, setVisibleUpdateColor] = useState(false);
    const [visibleAddColor, setVisibleAddColor] = useState(false);
    const [visibleActivateColor, setVisibleActivateColor] = useState(false);
    const [valueSearch, setValueSearch] = useState('');
    const [valueSearch1, setValueSearch1] = useState('');
    const [valueSearch2, setValueSearch2] = useState('1');
    const [color, setColor] = useState(colorObj);
    const Colors = useSelector((state) => state.color.colors);

    const Color = useSelector((state) => state.color.color);
    const [image, setImage] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllColor());
        setColor(Color);
        // eslint-disable-next-line
    }, [Color]);

    function openAddColor() {
        setVisibleAddColor(true);
    }

    function getIdDeleteColor(id) {
        dispatch(getByIdColor(id));
        setVisibleDeleteColor(true);
    }

    function getIdUpdateColor(id) {
        dispatch(getByIdColor(id));
        setVisibleUpdateColor(true);
    }

    function getIdActivateColor(id) {
        dispatch(getByIdColor(id));
        setVisibleActivateColor(true);
    }

    function handleActivateByIdColor() {
        setColor(color);
        dispatch(UpdateColor({ ...color, status: '1' }));
        toast.success('Kích thành công', { autoClose: 2000 });
        setVisibleActivateColor(false);
    }

    function handleDeleteByIdColor() {
        setColor(color);
        dispatch(UpdateColor({ ...color, status: '0' }));
        toast.success('Xóa thành công', { autoClose: 2000 });
        setVisibleDeleteColor(false);
    }

    function handleUpdateColor(dataType) {
        setColor(color);
        let colorUpdate = {
            id: dataType.id,
            colorName: dataType.colorName,
            img: dataType.img,
            status: color.status
        };
        dispatch(UpdateColor(colorUpdate));
        toast.success('Cập nhật thành công', { autoClose: 2000 });
        setVisibleUpdateColor(false);
    }

    function handleAddColor(dataType) {
        const data = new FormData();
        data.append('file', image);
        let colorCreate = {
            id: '',
            colorName: dataType.colorName,
            img: '',
            status: 1
        };
        axios
            .post("http://localhost:8080/api/admin/upload", data, {
                headers: {
                    'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
                    "content-type": "multipart/form-data",
                },
            })
            .then((response) => {
                colorCreate.img = response.data+image.name;
                dispatch(CreateColor(colorCreate));
            });
        toast.success('Thêm mới thành công', { autoClose: 2400 });
        setVisibleAddColor(false);
    }

    return (
        <div>
            <div className="grid grid-cols-7">
                <div className="col-start-1 flex justify-center items-center">
                    <p>Tìm kiếm thể loại</p>
                </div>
                <div className="col-start-2 col-end-4">
                    <div className="relative">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </div>
                        <input
                            type="search"
                            onChange={(e) => setTimeout(() => setValueSearch(e.target.value), 1000)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Tìm kiếm..."
                        />
                    </div>
                </div>

                <div className='px-5'>
                    <p>Trạng thái</p>
                </div>
                <div className="mb-[0.125rem] me-4 inline-block min-h-[1.5rem] ps-[1.5rem] mr-5">
                    <input
                        className="relative float-left -ms-[1.5rem] mr-2 me-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-secondary-500 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-checkbox before:shadow-transparent before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-checkbox checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] rtl:float-right dark:border-neutral-400 dark:checked:border-primary"
                        onChange={(e) =>
                            setTimeout(
                                () =>
                                    setValueSearch2(
                                        '1'
                                    ),
                                1000,
                            )
                        }
                        type="radio"
                        name="inlineRadioOptions"
                        id="inlineRadio1"
                        value="option1" />
                    <label
                        className="mt-px inline-block ps-[0.15rem] hover:cursor-pointer"
                        htmlFor="inlineRadio1"
                    >Hoạt động</label>
                </div>

                <div className="mb-[0.125rem] me-4 inline-block min-h-[1.5rem] ps-[1.5rem]">
                    <input
                        className="relative float-left -ms-[1.5rem] mr-2 me-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-secondary-500 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-checkbox before:shadow-transparent before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-checkbox checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] rtl:float-right dark:border-neutral-400 dark:checked:border-primary"
                        onChange={(e) =>
                            setTimeout(
                                () =>
                                    setValueSearch2(
                                        '0'
                                    ),
                                1000,
                            )
                        }
                        type="radio"
                        name="inlineRadioOptions"
                        id="inlineRadio2"
                        value="option2" />
                    <label
                        className="mt-px inline-block ps-[0.15rem] hover:cursor-pointer"
                        htmlFor="inlineRadio2"
                    >Không hoạt động</label>
                </div>
                <div className="col-start-7 flex justify-center items-center">
                    <button
                        type="button"
                        onClick={() => {
                            openAddColor();
                        }}
                        className="py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        <FontAwesomeIcon icon={faPlus} />
                        <span className="mx-2">Thêm</span>
                    </button>
                </div>
            </div>
            <div className="mt-4 p-2">
                <div className="overflow-x-auto relative">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="py-3 px-6">
                                    Tên màu
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Hình ảnh
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Trạng thái
                                </th>
                                <th scope="col" className="py-3 px-6" colSpan={2}>
                                    Hành động
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {Colors
                                .filter((x) => x.colorName.toLowerCase().includes(valueSearch))
                                .filter((x) => (x.status + '').toLowerCase().includes(valueSearch2))
                                .map((x) => (
                                    <tr className="bg-white dark:bg-gray-800" key={x.id}>
                                        <td className="py-4 px-6">{x.colorName}</td>
                                        <td className="py-4 px-6"><img
                                            src={`http://localhost:8080/public/files/`+x.img}
                                            className="max-w-xl h-auto rounded-sm"
                                            alt="image description"
                                            width={100}
                                        /></td>
                                        <td className="py-4 px-6">{x.status === 1 ? 'Hoạt động' : 'Không tồn tại'}</td>
                                        <td className="py-4 px-6">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    getIdUpdateColor(x.id);
                                                }}
                                                className="py-2 px-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                            >
                                                <span className="mx-2">Sửa</span>
                                            </button>
                                        </td>
                                        <td className="py-4 px-2">
                                            {
                                                x.status === 1 ? <button
                                                    type="button"
                                                    onClick={() => {
                                                        getIdDeleteColor(x.id);
                                                    }}
                                                    className="py-2 px-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                                >
                                                    <span className="mx-2">Xóa</span>
                                                </button> : <button
                                                    type="button"
                                                    onClick={() => {
                                                        getIdActivateColor(x.id);
                                                    }}
                                                    className="py-2 px-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                                >
                                                    <span className="mx-2">kích hoạt</span>
                                                </button>
                                            }

                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                    {/* Modal delete */}
                    <Modal show={visibleDeleteColor} size="md" popup={true} onClose={() => setVisibleDeleteColor(false)}>
                        <Modal.Header />
                        <Modal.Body>
                            <div className="text-center">
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                    Xác nhận loại bỏ thể loại ?
                                </h3>
                                <div className="flex justify-center gap-4">
                                    <Button
                                        color="failure"
                                        onClick={() => {
                                            handleDeleteByIdColor();
                                        }}
                                    >
                                        Đồng ý
                                    </Button>
                                    <Button color="gray" onClick={() => setVisibleDeleteColor(false)}>
                                        Không, đóng
                                    </Button>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                    <Modal show={visibleActivateColor} size="md" popup={true} onClose={() => setVisibleActivateColor(false)}>
                        <Modal.Header />
                        <Modal.Body>
                            <div className="text-center">
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                    Xác nhận kích hoạt thể loại  ?
                                </h3>
                                <div className="flex justify-center gap-4">
                                    <Button
                                        color="failure"
                                        onClick={() => {
                                            handleActivateByIdColor();
                                        }}
                                    >
                                        Đồng ý
                                    </Button>
                                    <Button color="gray" onClick={() => setVisibleDeleteColor(false)}>
                                        Không, đóng
                                    </Button>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                    {/* Modal update */}
                    <Modal show={visibleUpdateColor} size="4xl" popup={true} onClose={() => setVisibleUpdateColor(false)}>
                        <Modal.Header />
                        <Modal.Body>
                            {(
                                <Formik
                                    enableReinitialize
                                    initialValues={{
                                        ...colorObj,
                                        colorName: color.colorName || '',
                                        img: color.img || '',
                                    }}
                                    validationSchema={colorSchema}
                                    onSubmit={(values) => {
                                        handleUpdateColor(values);
                                    }}
                                >
                                    {({ errors, touched, values }) => (
                                        <Form>
                                            <div className="grid grid-cols-2 gap-5">
                                                <div>
                                                    <label
                                                        htmlFor="name"
                                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                                    >
                                                        Tên thể loại
                                                    </label>
                                                    <Field
                                                        name="name"
                                                        className={`
                                                    bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                                                    ${errors.name && touched.name ? 'border-2 border-rose-600' : ''} `}
                                                    />
                                                    {errors.name && touched.name ? (
                                                        <div className="text-sm text-red-600 mt-2">{errors.name}</div>
                                                    ) : null}
                                                </div>
                                                <div>

                                                </div>
                                            </div>
                                            <div className="flex justify-center gap-4 mt-6">
                                                <Button type="submit">sửa</Button>
                                                <Button color="gray" onClick={() => setVisibleAddColor(false)}>
                                                    Đóng
                                                </Button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            ) || ''}
                        </Modal.Body>
                    </Modal>
                    {/* Modal add */}
                    <Modal show={visibleAddColor} size="4xl" popup={true} onClose={() => setVisibleAddColor(false)}>
                        <Modal.Header />
                        <Modal.Body>
                            <Formik
                                initialValues={colorObj}
                                validationSchema={colorSchema}
                                onSubmit={(values) => {
                                    handleAddColor(values);
                                }}
                            >
                                {({ errors, touched }) => (
                                    <Form encType="multipart/form-data">
                                        <div className="grid grid-cols-2 gap-5">
                                            <div>
                                                <label
                                                    htmlFor="colorName"
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                                >
                                                    Tên màu
                                                </label>
                                                <Field
                                                    name="colorName"
                                                    className={`
                                                    bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                                                    ${errors.colorName && touched.colorName ? 'border-2 border-rose-600' : ''} `}
                                                />
                                                {errors.colorName && touched.colorName ? (
                                                    <div className="text-sm text-red-600 mt-2">{errors.colorName}</div>
                                                ) : null}
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="img"
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                                >
                                                    Ảnh
                                                </label>
                                                <FileInput
                                                    id="file"
                                                    onChange={(e) => setImage(e.target.files[0])}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex justify-center gap-4 mt-6">
                                            <Button type="submit">Thêm</Button>
                                            <Button color="gray" onClick={() => setVisibleAddColor(false)}>
                                                Đóng
                                            </Button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

export default ColorManage;
