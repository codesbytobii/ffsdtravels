import { Suspense } from "react";
import Layout from "@/pages/admin/Layout";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "@/routes/Routes";
import Loading from "@/components/components/withStatus/loading/Loading";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ErrorBoundary from "@/components/components/withStatus/error/ErrorBoundary";
import PROTECTED_ROUTES from "@/routes/PROTECTED_ROUTES";
// import Layout from './pages/organization/Layout';

function App() {
  return (
    <>
      <Router>
        <Routes>
          {PUBLIC_ROUTES.map(({ link, element }, index) => (
            <Route
              path={link}
              element={
                <ErrorBoundary>
                  <Suspense fallback={<Loading />}>{element}</Suspense>
                </ErrorBoundary>
              }
              key={index}
            />
          ))}

          <Route element={<PROTECTED_ROUTES />}>
            <Route path="admin" element={<Layout />}>
            {/* <Route path="admin" element={<Layout />}> */}
              {PRIVATE_ROUTES.map(({ link, element }, index) => (
                <Route
                  path={link}
                  element={
                    <ErrorBoundary>
                      <Suspense fallback={<Loading />}>{element}</Suspense>
                    </ErrorBoundary>
                  }
                  key={index}
                />
              ))}
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
