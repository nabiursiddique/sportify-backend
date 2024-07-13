"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_route_1 = require("../modules/product/product.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/product',
        route: product_route_1.ProductRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
