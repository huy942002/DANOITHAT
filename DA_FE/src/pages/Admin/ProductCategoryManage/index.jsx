import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import { faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Modal } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';

import { getAllTotalCategory } from '~/app/reducers/TotalCategory'
import { getAllProductCategory, CreateProductCategory, UpdateProductCategory, getByIdProductCategory } from '~/app/reducers/ProductCategory'

import authorServices from '~/services/authorServices';

import ReactPaginate from 'react-paginate';
import 'react-responsive-pagination/themes/classic.css';


const categorytt = {
    id: '',
    name: '',
    totalCategoryid: 0,
    status: 1
};

const categoryobj = {
    id: '',
    name: '',
    totalCategory: {
        id: '',
        name: '',
        status: ''
    },
    status: ''
};

const categoryttSchema = Yup.object().shape({
    name: Yup.string().required('Tên thể loại không được để trống'),
});

function ProductCategoryManage() {
    const [visibleDeleteType, setVisibleDeleteType] = useState(false);
    const [visibleUpdateType, setVisibleUpdateType] = useState(false);
    const [visibleAddCategory, setVisibleAddCategory] = useState(false);
    const [visibleActivateType, setVisibleActivateType] = useState(false);
    const [valueSearch, setValueSearch] = useState('');
    const [valueSearch1, setValueSearch1] = useState('');
    const [valueSearch2, setValueSearch2] = useState('1');
    const [category, setCategory] = useState(categoryobj);
    const Totalcategory = useSelector((state) => state.totalCategory.totalCategorys);
    const ProductCategorys = useSelector((state) => state.productCategory.productCategorys);
    const ProductCategory = useSelector((state) => state.productCategory.productCategory);
    const dispatch = useDispatch();
    const [currentUser, setCurrentUser] = useState();
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 7;
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = ProductCategorys.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(ProductCategorys.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % ProductCategorys.length;
        setItemOffset(newOffset);
    };
    useEffect(() => {
        dispatch(getAllTotalCategory());
        dispatch(getAllProductCategory());
        setCategory(ProductCategory);
        // eslint-disable-next-line
    }, [ProductCategory]);

    function openAddCategory() {
        setVisibleAddCategory(true);
    }

    function getIdDeleteCategory(id) {
        dispatch(getByIdProductCategory(id));
        setVisibleDeleteType(true);
    }

    function getIdUpdateCategory(id) {
        dispatch(getByIdProductCategory(id));
        setVisibleUpdateType(true);
    }

    function getIdActivateCategory(id) {
        dispatch(getByIdProductCategory(id));
        setVisibleActivateType(true);
    }

    function handleActivateByIdCategory() {
        setCategory(category);
        dispatch(UpdateProductCategory({ ...category, status: '1' }));
        toast.success('Kích thành công', { autoClose: 2000 });
        setVisibleActivateType(false);
    }

    function handleDeleteByIdCategory() {
        setCategory(category);
        dispatch(UpdateProductCategory({ ...category, status: '0' }));
        toast.success('Xóa thành công', { autoClose: 2000 });
        setVisibleDeleteType(false);
    }

    function handleUpdateCategory(dataType) {
        setCategory(category);
        let categoryupdate = {
            id: dataType.id,
            name: dataType.name,
            totalCategory: {
                id: dataType.totalCategoryid,
                name: Totalcategory.find((x) => x.id == dataType.totalCategoryid).name,
                status: Totalcategory.find((x) => x.id == dataType.totalCategoryid).status
            },
            status: category.status
        };
        dispatch(UpdateProductCategory(categoryupdate));
        toast.success('Cập nhật thành công', { autoClose: 2000 });
        setVisibleUpdateType(false);
    }

    function handleAddCategory(dataType) {
        if (dataType.totalCategoryid > 0) {
            let category = {
                id: '',
                name: dataType.name,
                totalCategory: {
                    id: dataType.totalCategoryid,
                    name: Totalcategory.find((x) => x.id == dataType.totalCategoryid).name,
                    status: Totalcategory.find((x) => x.id == dataType.totalCategoryid).status
                },
                status: 1
            };
            dispatch(CreateProductCategory(category));
        } else {
            let category = {
                id: '',
                name: dataType.name,
                totalCategory: {
                    id: Totalcategory[0].id,
                    name: Totalcategory[0].name,
                    status: Totalcategory[0].status
                },
                status: 1
            };
            dispatch(CreateProductCategory(category));
        }
        toast.success('Thêm mới thành công', { autoClose: 2400 });
        setVisibleAddCategory(false);
    }

    return (
        <div>
            <div className="grid grid-cols-6">
                <div className="col-start-1 flex justify-center items-center">
                    <p>Tìm kiếm thể loại</p>
                </div>
                <div className="col-start-2 col-end-6">
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
                <div className="col-start-6 flex justify-center items-center">
                    <button
                        type="button"
                        onClick={() => {
                            openAddCategory();
                        }}
                        className="py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        <FontAwesomeIcon icon={faPlus} />
                        <span className="mx-2">Thêm</span>
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-6 pt-5">
                <div className="col-start-1 flex justify-center items-center">
                    <p>Tổng thể loại</p>
                </div>
                <div className="col-start-2 col-end-4">
                    <select
                        name="totalcategory"
                        id="totalcategory"
                        className="mt-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(e) =>
                            setTimeout(
                                () => {
                                    if (e.target.options[e.target.selectedIndex].id == -1) {
                                        setValueSearch1(
                                            ''
                                        )
                                    } else {
                                        setValueSearch1(
                                            Totalcategory[e.target.options[e.target.selectedIndex].id].id,
                                        )
                                    }
                                },
                                1000,
                            )
                        }
                    >
                        <option className='text-center' key={0} value="" id={-1}>---All---</option>
                        {Totalcategory.map((x, index) => (
                            <option className='text-center' key={x.id} value={x.name} id={index}>
                                {x.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col-start-4 flex justify-center items-center">
                    <p>Trạng thái</p>
                </div>
                <div className="col-start-5 col-end-6">
                    <div className="flex items-center pt-3">
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
                    </div>
                </div>
            </div>
            <div className="mt-4 p-2">
                <div className="overflow-x-auto relative">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="py-3 px-6">
                                    Tên loại sản phẩm
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Tổng thể loại
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
                            {currentItems
                                .filter((x) => x.name.toLowerCase().includes(valueSearch))
                                .filter((x) => (x.totalCategory.id + '').toLowerCase().includes(valueSearch1))
                                .filter((x) => (x.status + '').toLowerCase().includes(valueSearch2))
                                .map((x) => (
                                    <tr className="bg-white dark:bg-gray-800" key={x.id}>
                                        <td className="py-4 px-6">{x.name}</td>
                                        <td className="py-4 px-6">{x.totalCategory.name}</td>
                                        <td className="py-4 px-6">{x.status === 1 ? 'Hoạt động' : 'Không tồn tại'}</td>
                                        <td className="py-4 px-6">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    getIdUpdateCategory(x.id);
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
                                                        getIdDeleteCategory(x.id);
                                                    }}
                                                    className="py-2 px-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                                >
                                                    <span className="mx-2">Xóa</span>
                                                </button> : <button
                                                    type="button"
                                                    onClick={() => {
                                                        getIdActivateCategory(x.id);
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
                    <nav aria-label="Pagination" className="mt-4">
                        <ReactPaginate
                            breakLabel="..."
                            previousLabel="Prev"
                            nextLabel="Next"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={7}
                            pageCount={pageCount}
                            renderOnZeroPageCount={null}
                            containerClassName="pagination justify-content-center gap-4 text-xl"
                            pageLinkClassName="page-num"
                            previousLinkClassName="page-num"
                            nextLinkClassName="page-num"
                            activeLinkClassName="active-num"
                            
                        />
                    </nav>
                    {/* Modal delete */}
                    <Modal show={visibleDeleteType} size="md" popup={true} onClose={() => setVisibleDeleteType(false)}>
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
                                            handleDeleteByIdCategory();
                                        }}
                                    >
                                        Đồng ý
                                    </Button>
                                    <Button color="gray" onClick={() => setVisibleDeleteType(false)}>
                                        Không, đóng
                                    </Button>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                    <Modal show={visibleActivateType} size="md" popup={true} onClose={() => setVisibleActivateType(false)}>
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
                                            handleActivateByIdCategory();
                                        }}
                                    >
                                        Đồng ý
                                    </Button>
                                    <Button color="gray" onClick={() => setVisibleDeleteType(false)}>
                                        Không, đóng
                                    </Button>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                    {/* Modal update */}
                    <Modal show={visibleUpdateType} size="4xl" popup={true} onClose={() => setVisibleUpdateType(false)}>
                        <Modal.Header />
                        <Modal.Body>
                            {(
                                <Formik
                                    enableReinitialize
                                    initialValues={{
                                        ...category,
                                        name: category.name || '',
                                        totalCategoryid: category.totalCategory?.id || '',
                                    }}
                                    validationSchema={categoryttSchema}
                                    onSubmit={(values) => {
                                        handleUpdateCategory(values);
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
                                                    <label
                                                        htmlFor="totalCategory"
                                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                                    >
                                                        Tổng thể loại
                                                    </label>
                                                    <Field as="select" name="totalCategoryid"
                                                        className={`
                                                    bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                                                    `}
                                                    >
                                                        {Totalcategory.map((x, index) => (
                                                            <option key={x.id} value={x.id} id={index}>
                                                                {x.name}
                                                            </option>
                                                        ))}
                                                    </Field>
                                                </div>
                                            </div>
                                            <div className="flex justify-center gap-4 mt-6">
                                                <Button type="submit">sửa</Button>
                                                <Button color="gray" onClick={() => setVisibleAddCategory(false)}>
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
                    <Modal show={visibleAddCategory} size="4xl" popup={true} onClose={() => setVisibleAddCategory(false)}>
                        <Modal.Header />
                        <Modal.Body>
                            <Formik
                                initialValues={categorytt}
                                validationSchema={categoryttSchema}
                                onSubmit={(values) => {
                                    handleAddCategory(values);
                                }}
                            >
                                {({ errors, touched }) => (
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
                                                <label
                                                    htmlFor="totalCategory"
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                                >
                                                    Tổng thể loại
                                                </label>
                                                <Field as="select" name="totalCategoryid"
                                                    className={`
                                                    bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                                                    ${errors.name && touched.name ? 'border-2 border-rose-600' : ''} `}
                                                >
                                                    {Totalcategory.map((x, index) => (
                                                        <option key={x.id} value={x.id} id={index}>
                                                            {x.name}
                                                        </option>
                                                    ))}
                                                </Field>
                                                {errors.priceByDay && touched.priceByDay ? (
                                                    <div className="text-sm text-red-600 mt-2">{errors.priceByDay}</div>
                                                ) : null}
                                            </div>
                                        </div>
                                        <div className="flex justify-center gap-4 mt-6">
                                            <Button type="submit">Thêm</Button>
                                            <Button color="gray" onClick={() => setVisibleAddCategory(false)}>
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

export default ProductCategoryManage;
