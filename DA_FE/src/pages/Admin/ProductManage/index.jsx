import { Link } from 'react-router-dom';
import config from '~/config';
import { toast } from 'react-toastify';

import axios from 'axios';

import { faChevronRight, faPlus, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Label, FileInput } from 'flowbite-react';
import { getAllProduct, getByIdProduct, UpdateProduct } from '~/app/reducers/Product'
import { getAllMaterial } from '~/app/reducers/Materials';
import { getAllProductCategory } from '~/app/reducers/ProductCategory';

import { getAllColor } from '~/app/reducers/Color'
import { getAllDimension } from '~/app/reducers/Dimension'
import { getColorDetailByproductId } from '~/app/reducers/ColorDetail'
import { getDimensionDetailByproductId, CreateDimensionDetail } from '~/app/reducers/DimensionDetail'

import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';

import { useNavigate } from 'react-router-dom';

const productObj = {
    id: '',
    name: '',
    img: '',
    img1: '',
    img2: '',
    img3: '',
    annotate: '',
    category: {
        id: '',
        name: '',
        totalCategory: {
            id: '',
            name: '',
            status: ''
        },
        status: ''
    },
    materials: {
        id: '',
        name: '',
        price: 0,
        materialCategory: {
            id: '',
            name: '',
            status: ''
        }
    },
    status: ''
}
const productobj1 = {
    id: '',
    name: '',
    img: '',
    img1: '',
    img2: '',
    img3: '',
    annotate: '',
    categoryid: '',
    materialsid: '',
}


const nameRegExp = /[a-zA-Z0-9\s\.]+$/
const annotateRegExp = /^[a-z0-9_-]/

const productobjSchema = Yup.object().shape({
    name: Yup.string().required('Tên sản không được để trống').matches(nameRegExp, 'Tên không hợp lệ'),
    annotate: Yup.string().required('Ghi chú không được để trống').matches(annotateRegExp, 'Ghi chú không hợp lệ'),
});

function ProductManage() {
    const Products = useSelector((state) => state.product.products);
    const product = useSelector((state) => state.product.product);
    const [visibleUpdate, setVisibleUpdate] = useState(false);
    const Categorys = useSelector((state) => state.productCategory.productCategorys);
    const ColorDetails = useSelector((state) => state.colorDetail.colorDetails);
    const DimensionDetails = useSelector((state) => state.dimensionDetail.dimensionDetails);
    const [productUpdate, setProductUpdate] = useState(productObj);
    const Colors = useSelector((state) => state.color.colors);
    const Materials = useSelector((state) => state.material.materials);
    const Dimensions = useSelector((state) => state.dimension.dimensions);

    const [visibleColorDetailstemporary, setVisibleColorDetailstemporary] = useState([]);
    const [visibleDimensionsDetailstemporary, setVisibleDimensionsDetailstemporary] = useState([]);

    const [visibleAddColor, setVisibleAddColor] = useState(false);
    const [visibleAddColorTB, setVisibleAddColorTB] = useState(false);

    const [visibleAddDimension, setVisibleAddDimension] = useState(false);
    const [visibleAddDimensionTB, setVisibleAddDimensionTB] = useState(false);

    const [Err1, setErr1] = useState('');
    const [Err2, setErr2] = useState('');
    const [Err3, setErr3] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllMaterial());
        dispatch(getAllProductCategory());
        dispatch(getAllColor());
        dispatch(getAllDimension());
        dispatch(getAllProduct());
        setProductUpdate(product);
        setVisibleDimensionsDetailstemporary(DimensionDetails);
        setVisibleColorDetailstemporary(ColorDetails)

    }, [product, DimensionDetails, ColorDetails]);

    function getModalColor() {
        setVisibleAddColor(true);
    }

    function getModalDimension() {
        setVisibleAddDimension(true);
    }

    function addcolorDetailstemporarys(data) {
        let objCcolorDetail = {
            id: data.id,
            product: {},
            color: {
                id: data.id,
                colorName: data.colorName,
                img: data.img,
                status: data.status
            },
            status: 1
        };
        if (visibleColorDetailstemporary.find((x) => x.id === data.id)) {
            toast.error('Màu Đã Tồn Tại!', { autoClose: 2000 });
        } else {
            setVisibleColorDetailstemporary(() => [...visibleColorDetailstemporary, objCcolorDetail]);
        }
    }

    function deleteColorDetail(id) {
        setVisibleColorDetailstemporary(visibleColorDetailstemporary.filter((x) => x.id !== id))
    }

    function addcDimensionDetailstemporarys(data) {
        let objDimensionDetail = {
            id: data.id,
            price: 0,
            product: productUpdate,
            dimension: {
                id: data.id,
                size: data.size,
                status: data.status
            },
        };
        if (visibleDimensionsDetailstemporary.find((x) => x.id === data.id)) {
            toast.error('Kích Thước Đã Tồn Tại!', { autoClose: 2000 });
        } else {
            dispatch(CreateDimensionDetail(objDimensionDetail));
            console.log(objDimensionDetail);
            setVisibleDimensionsDetailstemporary(() => [...visibleDimensionsDetailstemporary, objDimensionDetail]);
        }
    }

    function updatePrice(obj, price) {
        let array = [...visibleDimensionsDetailstemporary];
        let index = array.indexOf(obj);
        array[index].price = price;
        setVisibleDimensionsDetailstemporary([...array]);
    }

    function deleteDimensionDetails(id) {
        setVisibleDimensionsDetailstemporary(visibleDimensionsDetailstemporary.filter((x) => x.id !== id))
    }

    function getIdUpdateProduct(id) {
        dispatch(getByIdProduct(id));
        dispatch(getColorDetailByproductId(id));
        dispatch(getDimensionDetailByproductId(id));
        setVisibleUpdate(true)
    }

    function UpdateImg(img, index) {
        let name = '';
        const data = new FormData();
        data.append('file', img);
        axios
            .post("http://localhost:8080/api/admin/upload", data, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    "content-type": "multipart/form-data",
                },
            })
            .then((response) => {
                name = response.data + img.name;
                if (index == 0) {
                    dispatch(UpdateProduct({ ...productUpdate, img: name }))
                    toast.success('Update ảnh mới thành công', { autoClose: 1500 });
                } else if (index == 1) {
                    dispatch(UpdateProduct({ ...productUpdate, img1: name }))
                    toast.success('Update ảnh mới thành công', { autoClose: 1500 });
                } else if (index == 2) {
                    dispatch(UpdateProduct({ ...productUpdate, img2: name }))
                    toast.success('Update ảnh mới thành công', { autoClose: 1500 });
                } else if (index == 3) {
                    dispatch(UpdateProduct({ ...productUpdate, img3: name }))
                    toast.success('Update ảnh mới thành công', { autoClose: 1500 });
                }
                setVisibleUpdate(false);
            })
    }



    return (
        <div>
            <div className="grid grid-cols-6">
                <div className="col-start-1 flex justify-center items-center">
                    <p>Tìm kiếm sản phẩm</p>
                </div>
                <div className="col-start-2 col-end-6">
                    <div className="relative">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </div>
                        <input
                            type="search"
                            // onChange={(e) => setTimeout(() => setValueSearch(e.target.value), 1000)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Tìm kiếm..."
                        />
                    </div>
                </div>
                <div className="col-start-6 gap-4 flex justify-center items-center">
                    <Link to={config.routes.createProductManage}>
                        <button
                            type="button"
                            className="py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >

                            <FontAwesomeIcon icon={faPlus} />
                            <span className="mx-2">Thêm</span>
                        </button>
                    </Link>
                </div>
            </div>
            <div className="mt-4 p-2">
                <div className="overflow-x-auto relative">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="py-3 px-6">
                                    Tên sản phẩm
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Thể loại
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Vật liệu
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Ảnh
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Chú thich
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
                            {Products
                                // .filter((x) => x.name.toLowerCase().includes(valueSearch))
                                // .filter((x) => (x.totalCategory.id + '').toLowerCase().includes(valueSearch1))
                                // .filter((x) => (x.status+'').toLowerCase().includes(valueSearch2))
                                .map((x) => (
                                    <tr className="bg-white dark:bg-gray-800" key={x.id}>
                                        <td className="py-4 px-6">{x.name}</td>
                                        <td className="py-4 px-6">{x.category.name}</td>
                                        <td className="py-4 px-6">{x.materials.name}</td>
                                        <td className="py-4 px-6">
                                            <img
                                                src={`http://localhost:8080/public/files/` + x.img}
                                                className="max-w-xl h-auto rounded-sm"
                                                alt="image description"
                                                width={100}
                                            />
                                        </td>
                                        <td className="py-4 px-6">{x.annotate}</td>
                                        <td className="py-4 px-6">{x.status === 1 ? 'Hoạt động' : 'Không tồn tại'}</td>
                                        <td className="py-4 px-6">
                                            <Link to={'/admin/update-product/'+x.id}>
                                                <button
                                                    type="button"
                                                    className="py-2 px-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                                >
                                                    <span className="mx-2">Sửa</span>
                                                </button>
                                            </Link>
                                        </td>
                                        <td className="py-4 px-2">
                                            {
                                                x.status === 1 ? <button
                                                    type="button"
                                                    onClick={() => {
                                                        // getIdDeleteCategory(x.id);
                                                    }}
                                                    className="py-2 px-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                                >
                                                    <span className="mx-2">Xóa</span>
                                                </button> : <button
                                                    type="button"
                                                    onClick={() => {
                                                        // getIdActivateCategory(x.id);
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
                    <Modal
                        show={visibleUpdate}
                        size="7xl"
                        position="top-center"
                        popup={true}
                        onClose={() => {
                            setVisibleUpdate(false);
                        }}
                    >
                        <Modal.Header>
                            <p className="mb-2 mr-3 text-gray-900 dark:text-gray-300 font-bold">Update Product</p>
                        </Modal.Header>
                        <Modal.Body>
                            <Formik
                                enableReinitialize
                                initialValues={{
                                    ...productUpdate,
                                    name: productUpdate.name || '',
                                    categoryid: productUpdate.category?.id || '',
                                    materialsid: productUpdate.materials?.id || '',
                                    annotate: productUpdate.annotate || ''
                                }
                                }
                                validationSchema={productobjSchema}
                                onSubmit={(values) => {

                                }}
                            >
                                {({ errors, touched, values }) => (
                                    <Form>
                                        <div className="grid grid-cols-2 gap-10">
                                            <div className='col-span-2'>
                                                <label
                                                    htmlFor="name"
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                                >
                                                    Tên sản phẩm:<span className='text-lg text-red-600'>*</span>
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
                                                <label
                                                    htmlFor="category"
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                                >
                                                    Thể loại:
                                                </label>
                                                <Field as="select" name="categoryid"
                                                    className={`
                                                    bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                                                    `}
                                                >
                                                    {Categorys.map((x, index) => (
                                                        <option className='' key={x.id} value={x.name} id={index}>
                                                            {x.name}
                                                        </option>
                                                    ))}
                                                </Field>

                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="materials"
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                                >
                                                    Vật liệu:
                                                </label>
                                                <Field as="select" name="materialsid"
                                                    className={`
                                                    bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                                                    `}
                                                >
                                                    {Materials.map((x, index) => (
                                                        <option className='' key={x.id} value={x.name} id={index}>
                                                            {x.name}
                                                        </option>
                                                    ))}
                                                </Field>
                                            </div>
                                            <div className='col-span-2'>
                                                <label
                                                    htmlFor="img"
                                                    className="block text-sm font-medium text-gray-900 dark:text-gray-300"
                                                >
                                                    Ảnh :<span className='text-lg text-red-600'>*</span>
                                                </label>
                                                <div className="mb-2 block">
                                                    {Err1 &&
                                                        <div style={{ color: "red", paddingBottom: 10 }}>{Err1}</div>
                                                    }
                                                </div>
                                            </div>
                                            <div>
                                                <img
                                                    src={productUpdate.img ? (`http://localhost:8080/public/files/` + productUpdate.img) : ('')}
                                                    className="w-96 h-full rounded-sm"
                                                    alt="image description"
                                                />
                                                <FileInput
                                                    id="file"
                                                    onChange={(e) => UpdateImg(e.target.files[0], 0)}
                                                />
                                            </div>
                                            <div>
                                                <img
                                                    src={productUpdate.img ? (`http://localhost:8080/public/files/` + productUpdate.img1) : ('')}
                                                    className="w-96 h-full rounded-sm"
                                                    alt="image description"
                                                />
                                                <FileInput
                                                    id="file"
                                                    onChange={(e) => UpdateImg(e.target.files[0], 1)}
                                                />
                                            </div>
                                            <div>
                                                <img
                                                    src={productUpdate.img ? (`http://localhost:8080/public/files/` + productUpdate.img2) : ('')}
                                                    className="w-96 h-full rounded-sm"
                                                    alt="image description"
                                                />
                                                <FileInput
                                                    id="file"
                                                    onChange={(e) => UpdateImg(e.target.files[0], 2)}
                                                />
                                            </div>
                                            <div>
                                                <img
                                                    src={productUpdate.img ? (`http://localhost:8080/public/files/` + productUpdate.img3) : ('')}
                                                    className="w-96 h-full rounded-sm"
                                                    alt="image description"
                                                />
                                                <FileInput
                                                    id="file"
                                                    onChange={(e) => UpdateImg(e.target.files[0], 3)}
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="annotate"
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                                >
                                                    Màu :<span className='text-lg text-red-600'>*</span>
                                                </label>
                                                <div className="mb-2 block">
                                                    {Err2 &&
                                                        <div style={{ color: "red", paddingBottom: 10 }}>{Err2}</div>
                                                    }
                                                </div>
                                                <div className="grid gap-x-8 gap-y-4 grid-cols-3 items-center pl-3">
                                                    {visibleColorDetailstemporary?.map((cd) => (
                                                        <div
                                                            key={cd.id}
                                                            id="toast-default"
                                                            className="flex items-center p-4 w-full max-w-xs text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
                                                            role="alert"
                                                        >
                                                            <div className="ml-3 text-sm font-normal">{cd.color.colorName}</div>
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    deleteColorDetail(cd.id);
                                                                }}
                                                                className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                                                                data-dismiss-target="#toast-default"
                                                                aria-label="Close"
                                                            >
                                                                <svg
                                                                    aria-hidden="true"
                                                                    className="w-5 h-5"
                                                                    fill="currentColor"
                                                                    viewBox="0 0 20 20"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                                        clipRule="evenodd"
                                                                    ></path>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                                <button
                                                    type="button"
                                                    className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                    onClick={() => {
                                                        getModalColor();
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faPlus} />
                                                    Add
                                                </button>
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="annotate"
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                                >
                                                    Kích thước :<span className='text-lg text-red-600'>*</span>
                                                </label>
                                                <div className="mb-2 block">
                                                    {Err3 &&
                                                        <div style={{ color: "red", paddingBottom: 10 }}>{Err3}</div>
                                                    }
                                                </div>
                                                <div className="grid gap-x-8 gap-y-4 grid-cols-2 items-center pl-3">
                                                    {visibleDimensionsDetailstemporary?.map((d) => (
                                                        <div
                                                            key={d.id}
                                                            id="toast-default"
                                                            className="flex items-center p-4 w-full max-w-xs text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
                                                            role="alert"
                                                        >
                                                            <input
                                                                id="vue-checkbox-list"
                                                                type="number"
                                                                value={d.price}
                                                                onChange={(e) => {
                                                                    updatePrice(d, e.target.value);
                                                                }}
                                                                className="w-full h-8 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                            />
                                                            <label
                                                                htmlFor="vue-checkbox-list"
                                                                className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                                                            >
                                                                {d.dimension.size}
                                                            </label>
                                                            <button
                                                                type="button"
                                                                onClick={() => deleteDimensionDetails(d.id)}
                                                                className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                                                                data-dismiss-target="#toast-default"
                                                                aria-label="Close"
                                                            >
                                                                <svg
                                                                    aria-hidden="true"
                                                                    className="w-5 h-5"
                                                                    fill="currentColor"
                                                                    viewBox="0 0 20 20"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                                        clipRule="evenodd"
                                                                    ></path>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                                <button
                                                    type="button"
                                                    className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                    onClick={() => {
                                                        getModalDimension();
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faPlus} />
                                                    Add
                                                </button>
                                            </div>
                                            <div className='col-span-2'>
                                                <label
                                                    htmlFor="annotate"
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                                >
                                                    Ghi chú:<span className='text-lg text-red-600'>*</span>
                                                </label>
                                                <Field
                                                    name="annotate"
                                                    as='textarea'
                                                    className={`
                                                    bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                                                    ${errors.annotate && touched.annotate ? 'border-2 border-rose-600' : ''} `}
                                                />
                                                {errors.annotate && touched.annotate ? (
                                                    <div className="text-sm text-red-600 mt-2">{errors.annotate}</div>
                                                ) : null}
                                            </div>
                                        </div>
                                        <div className="float-right w-40 mt-4">
                                            <Button
                                                type="submit"
                                            >
                                                Xác Nhận
                                            </Button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </Modal.Body>
                        <Modal.Footer>

                        </Modal.Footer>
                    </Modal>

                    <Modal show={visibleAddColor} size="xl" popup={true} onClose={() => setVisibleAddColor(false)}>
                        <Modal.Header />
                        <Modal.Body>
                            <div className="text-center">
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                    Chọn loại thêm
                                </h3>
                                <div className="flex justify-center gap-4">
                                    <Button
                                        color="gray"
                                        onClick={() => {
                                            setVisibleAddColorTB(true);
                                            setVisibleAddColor(false)

                                        }}
                                    >
                                        Thêm màu mới
                                    </Button>
                                    <Button color="gray" onClick={() => { }}>
                                        Copy màu có sẵn
                                    </Button>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>

                    <Modal show={visibleAddColorTB} size="xl" popup={true} onClose={() => setVisibleAddColorTB(false)}>
                        <Modal.Header>Bảng Màu</Modal.Header>
                        <Modal.Body>
                            <div className="text-center">
                                <div className="overflow-x-auto relative shadow-md md:rounded-lg">
                                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 md:h-auto">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                                                // .filter((x) => x.colorName.toLowerCase().includes(valueSearch))
                                                .map((x) => (
                                                    <tr className="bg-white dark:bg-gray-800" key={x.id}>
                                                        <td className="py-4 px-6">{x.colorName}</td>
                                                        <td className="py-4 px-6"><img
                                                            src={`http://localhost:8080/public/files/` + x.img}
                                                            className="max-w-xl h-auto rounded-sm"
                                                            alt="image description"
                                                            width={100}
                                                        /></td>
                                                        <td className="py-4 px-6">{x.status === 1 ? 'Hoạt động' : 'Không tồn tại'}</td>
                                                        <td className="py-4 px-6">
                                                            <button
                                                                type="button"
                                                                disabled=""
                                                                onClick={() => {
                                                                    addcolorDetailstemporarys(x);
                                                                }}
                                                                className="py-2 px-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                                            >
                                                                <span className="mx-2">thêm</span>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>

                    <Modal show={visibleAddDimension} size="xl" popup={true} onClose={() => setVisibleAddDimension(false)}>
                        <Modal.Header />
                        <Modal.Body>
                            <div className="text-center">
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                    Chọn loại thêm
                                </h3>
                                <div className="flex justify-center gap-4">
                                    <Button
                                        color="gray"
                                        onClick={() => {
                                            setVisibleAddDimensionTB(true);
                                            setVisibleAddDimension(false)

                                        }}
                                    >
                                        Thêm kích thước mới
                                    </Button>
                                    <Button color="gray" onClick={() => { }}>
                                        Copy kích thước có sẵn
                                    </Button>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>

                    <Modal show={visibleAddDimensionTB} size="xl" popup={true} onClose={() => setVisibleAddDimensionTB(false)}>
                        <Modal.Header>Bảng Kích Thước</Modal.Header>
                        <Modal.Body>
                            <div className="text-center">
                                <div className="overflow-x-auto relative shadow-md md:rounded-lg">
                                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 md:h-auto">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th scope="col" className="py-3 px-6">
                                                    Kích Thước
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
                                            {Dimensions
                                                // .filter((x) => x.colorName.toLowerCase().includes(valueSearch))
                                                .map((x) => (
                                                    <tr className="bg-white dark:bg-gray-800" key={x.id}>
                                                        <td className="py-4 px-6">{x.size}</td>
                                                        <td className="py-4 px-6">{x.status === 1 ? 'Hoạt động' : 'Không tồn tại'}</td>
                                                        <td className="py-4 px-6">
                                                            <button
                                                                type="button"
                                                                disabled=""
                                                                onClick={() => {
                                                                    addcDimensionDetailstemporarys(x);
                                                                }}
                                                                className="py-2 px-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                                            >
                                                                <span className="mx-2">thêm</span>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        </div>
    );
}
export default ProductManage;
