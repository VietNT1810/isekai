import FilterSidebar from '../components/FilterSidebar';
import Header from '../components/Header';

function ShopLayout({ children, banner }) {
    return (
        <>
            <Header />
            <div className="banner">
                <img src={banner} alt="Error image" />
            </div>
            <div className="container">
                <FilterSidebar />
                <div className="content">
                    {children}
                </div>
            </div>
        </>
    );
}

export default ShopLayout;