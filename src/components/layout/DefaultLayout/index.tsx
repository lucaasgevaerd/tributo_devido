import { useEffect, useState } from "react";
import { FiMenu, FiRotateCcw, FiSettings, FiShoppingBag, FiShoppingCart } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

type Props = {
    children: React.ReactNode
}

function DefaultLayout({children}: Props) {
    const location = useLocation();

    const [isOpen, setIsOpen] = useState(false);
  
    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
  
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };
  
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    return (
        <>
          {isMobile ? (
            <>
              <header className="fixed w-full h-20 bg-white flex justify-between items-center z-[1]">
                <img
                  src="assets/images/logo_tributo_devido.jpeg"
                  alt="Logo Tributo Devido"
                  className={`w-[50px] h-[50px] ${!isMobile && "my-[15px]"} ml-4`}
                />
                <FiMenu
                  onClick={toggleMenu}
                  className="w-[30px] h-[30px] text-blue-800 cursor-pointer mr-4"
                />
                  <div
                    className={`${
                      isOpen ? "w-full absolute top-20 bg-white z-[1]" : "hidden"
                    }`}
                  >
                    <ul>
                      <Link to={"/taxRecovery"} onClick={() => setIsOpen(false)}>
                        <li
                          className={`flex items-center my-3 p-3 hover:bg-blue-100 mx-3 rounded-md ${
                            location.pathname === "/taxRecovery" && "bg-blue-100"
                          }`}
                        >
                          <FiShoppingCart className="text-blue-600 mr-3" />
                          <p className="font-[500]">Recuperação tributária</p>
                        </li>
                      </Link>
                      <Link to={"/taxAssets"} onClick={() => setIsOpen(false)}>
                        <li
                          className={`flex items-center my-3 p-3 hover:bg-blue-100 mx-3 rounded-md ${
                            location.pathname === "/taxAssets" && "bg-blue-100"
                          }`}
                        >
                          <FiShoppingBag className="text-blue-600 mr-3" />
                          <p className="font-[500]">Ativos tributários</p>
                        </li>
                      </Link>
                      <Link to={"/refund"} onClick={() => setIsOpen(false)}>
                        <li
                          className={`flex items-center my-3 p-3 hover:bg-blue-100 mx-3 rounded-md ${
                            location.pathname === "/refund" && "bg-blue-100"
                          }`}
                        >
                          <FiRotateCcw className="text-blue-600 mr-3" />
                          <p className="font-[500]">Ressarcimento</p>
                        </li>
                      </Link>
                      <Link to={"/settings"} onClick={() => setIsOpen(false)}>
                        <li
                          className={`flex items-center my-3 p-3 hover:bg-blue-100 mx-3 rounded-md ${
                            location.pathname === "/settings" && "bg-blue-100"
                          }`}
                        >
                          <FiSettings className="text-blue-600 mr-3" />
                          <p className="font-[500]">Configurações</p>
                        </li>
                      </Link>
                    </ul>
                  </div>
              </header>
              <div className="w-full h-screen pt-20">
                {children}
              </div>
            </>
          ) : (
            <div className="flex w-full">
              <header className="w-full max-w-[300px] border-r-2 border-gray-100">
                <img
                  src="assets/images/logo_tributo_devido.jpeg"
                  alt="Logo Tributo Devido"
                  className={`w-[50px] h-[50px] ${!isMobile && "my-[15px]"} ml-4`}
                />
                <div className="h-[2px] bg-gray-100 mx-4"></div>
                <nav>
                  <ul>
                    <Link to={"/taxRecovery"}>
                      <li className="items-center">
                        <div
                          className={`flex h-14 ${
                            location.pathname === "/taxRecovery" && "&& bg-blue-100"
                          } hover:bg-blue-100 duration-200 items-center px-4 rounded-lg m-4`}
                        >
                          <FiShoppingCart className="text-blue-600 w-[20px] h-[20px] mr-4" />
                          <p className="font-[500]">Recuperação tributária</p>
                        </div>
                      </li>
                    </Link>
                    <Link to={"/taxAssets"}>
                      <li className="items-center rounded-xl">
                        <div
                          className={`flex h-14 ${
                            location.pathname === "/taxAssets" && "&& bg-blue-100"
                          } hover:bg-blue-100 duration-200 items-center px-4 rounded-xl m-4`}
                        >
                          <FiShoppingBag className="text-blue-600 w-[20px] h-[20px] mr-4" />
                          <p className="font-[500]">Ativos tributários</p>
                        </div>
                      </li>
                    </Link>
                    <Link to={"/refund"}>
                      <li className="items-center rounded-xl">
                        <div
                          className={`flex h-14 ${
                            location.pathname === "/refund" && "bg-blue-100"
                          } hover:bg-blue-100 duration-200 items-center px-4 rounded-xl m-4`}
                        >
                          <FiRotateCcw className="text-blue-600 w-[20px] h-[20px] mr-4" />
                          <p className="font-[500]">Ressarcimento</p>
                        </div>
                      </li>
                    </Link>
                  </ul>
                  <Link to={"/settings"}>
                    <div
                      className={`flex h-14 ${
                        location.pathname === "/settings" && "bg-blue-100"
                      } hover:bg-blue-100 duration-200 items-center px-4 rounded-xl m-4`}
                    >
                      <FiSettings className="text-blue-600 w-[20px] h-[20px] mr-4" />
                      <p className="font-[500]">Configurações</p>
                    </div>
                  </Link>
                </nav>
              </header>
              <div className="w-full h-screen">
                {children}
              </div>
            </div>
          )}
        </>
      );
}

export default DefaultLayout