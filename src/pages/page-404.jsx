import AppHeader from "../components/app-header/app-header";
import Error404 from "../components/error-404/error-404";

function Page404() {
  return (
    <>
      <AppHeader />
      <main className="main-page p-5 d-flex align-items-center align-items-center justify-content-center">
        <Error404 />
      </main>
    </>
  );
}

export { Page404 };
