import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import PrivateRoute from '../components/PrivateRoute';
import Logout from '../components/Logout';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const Dashboard = Loadable(lazy(() => import('../views/dashboard/Dashboard')));
const Fornecedores = Loadable(lazy(() => import('../views/paginas/Fornecedores')));
const ProdutoPage = Loadable(lazy(() => import('../views/paginas/ProdutoPage')));
const ProdutosAbaixoQuantidadeSeguraPage = Loadable(lazy(() => import('../views/paginas/ProdutosAbaixoQuantidadeSeguraPage')));
const ProdutosForaDeEstoque = Loadable(lazy(() => import('../views/paginas/ProdutosForaDeEstoque')));
const ProdutosAdequados = Loadable(lazy(() => import('../views/paginas/ProdutosAdequados')));
const VendaPage = Loadable(lazy(() => import('../views/paginas/VendaPage')));
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Register = Loadable(lazy(() => import('../views/authentication/Register')));
const Login = Loadable(lazy(() => import('../views/authentication/Login')));
const RelatorioPage = Loadable(lazy(() => import('../views/paginas/RelatorioPage')));
const ProdutosMaisVendidosPage = Loadable(lazy(() => import('../views/paginas/ProdutosMaisVendidosPage')));
const AboutUs = Loadable(lazy(() => import('../views/paginas/AboutUs')));
const ContactUs = Loadable(lazy(() => import('../views/paginas/ContactUs')));

const Router = [
  {
    path: '/',
    element: <PrivateRoute />, // Verifica autenticação para todas as rotas filhas
    children: [
      {
        path: '/',
        element: <FullLayout />,
        children: [
          { path: '/', element: <Navigate to="/dashboard" /> },
          { path: '/dashboard', exact: true, element: <Dashboard /> },
          { path: '/Fornecedor', exact: true, element: <Fornecedores /> },
          { path: '/produtos', exact: true, element: <ProdutoPage /> },
          { path: '/produtos/abaixo-da-quantidade-segura', exact: true, element: <ProdutosAbaixoQuantidadeSeguraPage /> },
          { path: '/produtos/fora-de-estoque', exact: true, element: <ProdutosForaDeEstoque /> },
          { path: '/produtos/mais-vendidos', exact: true, element: <ProdutosMaisVendidosPage /> },
          { path: '/produtos/adequados', exact: true, element: <ProdutosAdequados /> },
          { path: '/vendas', exact: true, element: <VendaPage /> },
          { path: '/about-us', exact: true, element: <AboutUs /> },
          { path: '/contact-us', exact: true, element: <ContactUs /> },
          { path: '/produtos/:id/edit', exact: true, element: <ProdutoPage /> },
          { path: '/relatorios', exact: true, element: <RelatorioPage /> },
          { path: '*', element: <Navigate to="/auth/404" /> },
        ],
      },
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: 'register', element: <Register /> },
      { path: 'login', element: <Login /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  { path: '/logout', element: <Logout /> },
  // Redirecionar para a página de login caso a rota não seja encontrada
  { path: '*', element: <Navigate to="/auth/login" /> },
];

export default Router;
