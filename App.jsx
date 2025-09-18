import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from ' ./components/Navbar';
import Home from './pages/Home';
import About from './pages/About';

const AdminList = lazy(() => import('./pages/Admin/ProductListAdmin'));
const AdminCreate = lazy(() => import('./pages/Admin/ProductCreate'));
const AdminEdit = lazy(() => import('./pages/Admin/ProductEdit'));


export default function App() {
return (
<Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

<BrowserRouter>
<Header />
<main className="container mx-auto p-4">
<Routes>
<Route path="/" element={<Home />} />
<Route path="/product/:id" element={<ProductDetails />} />


<Route
path="/admin"
element={
<ProtectedRoute>
<Suspense fallback={<div>Loading admin...</div>}>
<AdminList />
</Suspense>
</ProtectedRoute>
}
/>


<Route
path="/admin/create"
element={
<ProtectedRoute>
<Suspense fallback={<div>Loading create...</div>}>
<AdminCreate />
</Suspense>
</ProtectedRoute>
}
/>


<Route
path="/admin/edit/:id"
element={
<ProtectedRoute>
<Suspense fallback={<div>Loading edit...</div>}>
<AdminEdit />
</Suspense>
</ProtectedRoute>
}
/>


</Routes>
</main>
<Footer />
</BrowserRouter>
}
/>