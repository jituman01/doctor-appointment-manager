
import SearchBar from "./SearchBar";

const AppointmentHeader = () => {

    return (
         <header className="bg-white border-b border-slate-200 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">
                    Explore Our{' '}
                    <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-blue-800">Expert</span>{' '}
                    Doctors
                </h1>
                <p className="text-xl text-slate-500 max-w-2xl mx-auto">
                    Connect with certified medical experts dedicated to your well-being.
                </p>

                <div className="max-w-2xl mx-auto pt-4">
                    <SearchBar />
                </div>
            </div>
        </header>
    );
};

export default AppointmentHeader;