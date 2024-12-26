import { Link } from 'react-router-dom';
import config from '~/config';
import { toast } from 'react-toastify';

import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Modal } from 'flowbite-react';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Label, FileInput } from 'flowbite-react';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAllMaterial } from '~/app/reducers/Materials';
import { getAllProductCategory } from '~/app/reducers/ProductCategory';

import { getAllColor } from '~/app/reducers/Color'
import { getAllDimension } from '~/app/reducers/Dimension'

import axios from 'axios';

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


function CreateProductManager() {

    const Categorys = useSelector((state) => state.productCategory.productCategorys);
    const Colors = useSelector((state) => state.color.colors);
    const Materials = useSelector((state) => state.material.materials);
    const Dimensions = useSelector((state) => state.dimension.dimensions);

    const [visibleColorDetailstemporary, setVisibleColorDetailstemporary] = useState([]);
    const [visibleDimensionsDetailstemporary, setVisibleDimensionsDetailstemporary] = useState([]);

    const [visibleAddColor, setVisibleAddColor] = useState(false);
    const [visibleAddColorTB, setVisibleAddColorTB] = useState(false);

    const [visibleAddDimension, setVisibleAddDimension] = useState(false);
    const [visibleAddDimensionTB, setVisibleAddDimensionTB] = useState(false);

    const [image, setImage] = useState('');
    const [image1, setImage1] = useState('');
    const [image2, setImage2] = useState('');
    const [image3, setImage3] = useState('');

    const [nameImage, setNameImage] = useState([]);

    const [Err1, setErr1] = useState('');
    const [Err2, setErr2] = useState('');
    const [Err3, setErr3] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllMaterial());
        dispatch(getAllProductCategory());
        dispatch(getAllColor());
        dispatch(getAllDimension());
        setVisibleColorDetailstemporary(visibleColorDetailstemporary);
        setNameImage(nameImage)
    }, [visibleColorDetailstemporary])

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
            product: {},
            dimension: {
                id: data.id,
                size: data.size,
                status: data.status
            },
        };
        if (visibleDimensionsDetailstemporary.find((x) => x.id === data.id)) {
            toast.error('Kích Thước Đã Tồn Tại!', { autoClose: 2000 });
        } else {
            setVisibleDimensionsDetailstemporary(() => [...visibleDimensionsDetailstemporary, objDimensionDetail]);
        }
    }

    function updatePrice(obj, price) {
        let array = [...visibleDimensionsDetailstemporary];
        let index = array.indexOf(obj);
        console.log(index);
        array[index].price = price;
        setVisibleDimensionsDetailstemporary([...array]);
    }

    function deleteDimensionDetails(id) {
        setVisibleDimensionsDetailstemporary(visibleDimensionsDetailstemporary.filter((x) => x.id !== id))
    }

    function checkPrice() {
        let formIsValid = true;
        visibleDimensionsDetailstemporary.map((x) => {
            if (x.price == 0) {
                formIsValid = false;
            }
        })
        return formIsValid;
    }

    function handleAddProduct(data) {
        if (!image && !image1 && !image2 && !image3) {
            setErr1("Ảnh không được để chống");
        } else {
            let idcategory = '';
            let idmaterials = '';
            if (!data.categoryid) {
                idcategory = Categorys[0].id;
            } else {
                idcategory = data.categoryid;
            }
            if (!data.materialsid) {
                idmaterials = Materials[0].id;
            } else {
                idmaterials = data.materialsid;
            }
            setErr1("")
            setErr2("")
            setErr3("")
            if (visibleColorDetailstemporary.length > 0) {
                if (visibleDimensionsDetailstemporary.length > 0) {
                    if (checkPrice() === true) {
                        let product = {
                            id: '',
                            name: data.name,
                            img: '',
                            img1: '',
                            img2: '',
                            img3: '',
                            annotate: data.annotate,
                            category: {
                                id: idcategory,
                                name: Categorys.find((x) => x.id == idcategory).name,
                                totalCategory: {
                                    id: Categorys.find((x) => x.id == idcategory).totalCategory.id,
                                    name: Categorys.find((x) => x.id == idcategory).totalCategory.name,
                                    status: Categorys.find((x) => x.id == idcategory).totalCategory.status
                                },
                                status: Categorys.find((x) => x.id == idcategory).status
                            },
                            materials: {
                                id: idmaterials,
                                name: Materials.find((x) => x.id == idmaterials).name,
                                price: Materials.find((x) => x.id == idmaterials).price,
                                materialCategory: {
                                    id: Materials.find((x) => x.id == idmaterials).materialCategory.id,
                                    name: Materials.find((x) => x.id == idmaterials).materialCategory.name,
                                    status: Materials.find((x) => x.id == idmaterials).materialCategory.status
                                }
                            },
                            status: 1
                        }
                        const data0 = new FormData();
                        data0.append('file', image);
                        const data1 = new FormData();
                        data1.append('file', image1);
                        const data2 = new FormData();
                        data2.append('file', image2);
                        const data3 = new FormData();
                        data3.append('file', image3);
                        axios
                            .post("http://localhost:8080/api/admin/upload", data0, {
                                headers: {
                                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                                    "content-type": "multipart/form-data",
                                },
                            })
                            .then((response) => {
                                product.img = response.data + image.name;

                                axios
                                    .post("http://localhost:8080/api/admin/upload", data1, {
                                        headers: {
                                            'Authorization': 'Bearer ' + localStorage.getItem('token'),
                                            "content-type": "multipart/form-data",
                                        },
                                    })
                                    .then((response) => {
                                        product.img1 = response.data + image1.name;

                                        axios
                                            .post("http://localhost:8080/api/admin/upload", data2, {
                                                headers: {
                                                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                                                    "content-type": "multipart/form-data",
                                                },
                                            })
                                            .then((response) => {
                                                product.img2 = response.data + image2.name;
                                                axios
                                                    .post("http://localhost:8080/api/admin/upload", data3, {
                                                        headers: {
                                                            'Authorization': 'Bearer ' + localStorage.getItem('token'),
                                                            "content-type": "multipart/form-data",
                                                        },
                                                    })
                                                    .then((response) => {
                                                        product.img3 = response.data + image3.name;
                                                        axios
                                                            .post("http://localhost:8080/api/admin/product", {
                                                                product: product,
                                                                colorDetailList: visibleColorDetailstemporary,
                                                                dimensionsDetailList:visibleDimensionsDetailstemporary
                                                            }, {
                                                                headers: {
                                                                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                                                                },
                                                            })
                                                            .then((response) => {
                                                                toast.success('Thêm Thành Công', { autoClose: 2000 });
                                                            })
                                                    })
                                            })
                                    })
                            })
                    } else {
                        setErr3("Mời bạn nhập giá tiền")
                    }

                } else {
                    setErr3("Kích thước không để trống!")
                }
            } else {
                setErr2("Màu không để trống!")
            }
        }
    }
    return (
        <div className="text-black p-3">
            <div>
                <Formik
                    initialValues={productobj1}
                    validationSchema={productobjSchema}
                    onSubmit={(values) => {
                        handleAddProduct(values);
                    }}
                >
                    {({ errors, touched }) => (
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
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                    >
                                        Ảnh :<span className='text-lg text-red-600'>*</span>
                                    </label>
                                    <div className="mb-2 block">
                                        {Err1 &&
                                            <div style={{ color: "red", paddingBottom: 10 }}>{Err1}</div>
                                        }
                                    </div>
                                    <FileInput
                                        id="file"
                                        onChange={(e) => setImage(e.target.files[0])}
                                    />
                                </div>
                                <div className='col-span-2'>
                                    <FileInput
                                        id="file"
                                        onChange={(e) => setImage1(e.target.files[0])}
                                    />
                                </div>
                                <div className='col-span-2'>
                                    <FileInput
                                        id="file"
                                        onChange={(e) => setImage2(e.target.files[0])}
                                    />
                                </div>
                                <div className='col-span-2'>
                                    <FileInput
                                        id="file"
                                        onChange={(e) => setImage3(e.target.files[0])}
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
                                        {visibleColorDetailstemporary.map((cd) => (
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
                                        {visibleDimensionsDetailstemporary.map((d) => (
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
                            <div className="float-right w-40 mt-7">
                                <Button
                                    type="submit"
                                >
                                    Thêm
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
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
    );
}
export default CreateProductManager;
