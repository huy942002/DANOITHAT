import config from '~/config';

// Pages
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import LoginAdmin from '~/pages/Admin/LoginAdmin';
import ProductCategoryManage from '~/pages/Admin/ProductCategoryManage';
import Signup from '~/pages/Signup';
import Notfound from '~/pages/Notfound';
import ProductManage from '~/pages/Admin/ProductManage';
import CreateProductManage from '~/pages/Admin/CreateProductManage';
import ColorManager from '~/pages/Admin/ColorManager';
import CustomerLayout from '~/layouts/CustomVer2/customer-layout'
import UpdateProductManage from '~/pages/Admin/UpdateProductManager';
import { comment } from 'postcss';

// Routes public

const publicRoutes = [
    { path: config.routes.home, component: Home, layout: CustomerLayout },
    { path: config.routes.login, component: Login, layout: null },
    { path: config.routes.signup, component: Signup, layout: null },
    { path: config.routes.notfound, component: Notfound, layout: null },
];

const privateRoutes = [
    { path: config.routes.loginAdmin, component: LoginAdmin, layout: null },
    { path: config.routes.productManage, component: ProductManage },
    { path: config.routes.colorManager, component: ColorManager },
    { path: config.routes.createProductManage, component: CreateProductManage },
    { path: config.routes.ProductCategoryManage, component: ProductCategoryManage },
    { path: config.routes.updateProductManager, component: UpdateProductManage },
    
];

const privateRoutesDirect = [
];

export { publicRoutes, privateRoutes, privateRoutesDirect };
