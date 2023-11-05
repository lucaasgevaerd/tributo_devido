import { FiSearch, FiX } from "react-icons/fi";
import { ChangeEvent, useEffect, useState } from "react";
import { getBaseURL } from "../../utils/getBaseURL";
import axios, { AxiosResponse } from "axios";
import { EmpresasResponse } from "../../types/empresasResponse";

export function TaxRecovery() {
  const [showCustomers, setShowCustomers] = useState<boolean>(false);
  const [customers, setCustomers] = useState<EmpresasResponse[]>([]);

  const [searchResults, setSearchResults] = useState<EmpresasResponse[]>([]);

  const [selectedCustomer, setSelectedCustomer] =
    useState<EmpresasResponse | null>(null);

  const [inputValue, setInputValue] = useState<string>("");

  function handleSearchInput(event: ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
    const { value } = event.target;

    if (event.target.value === "") {
      setSelectedCustomer(null);
    }

    // Realizar a pesquisa aqui com base no valor atual do input
    const results = performSearch(value, customers);
    setSearchResults(results);
  }

  function clickedCustomer(customer: EmpresasResponse) {
    setSelectedCustomer(customer);
    setSearchResults([]);
  }

  function performSearch(
    value: string,
    customers: EmpresasResponse[]
  ): EmpresasResponse[] {
    if (!value) {
      return [];
    }

    if (/^\d+$/.test(value)) {
      // Pesquisa por CNPJ (somente números)
      return customers.filter((customer) => customer.CNPJ.startsWith(value));
    } else {
      // Pesquisa por nome_fantasia ou razao_social (ignorando maiúsculas/minúsculas)
      const searchValue = value.toLowerCase();
      return customers.filter(
        (customer) =>
          customer.nome_fantasia.toLowerCase().includes(searchValue) ||
          customer.razao_social.toLowerCase().includes(searchValue)
      );
    }
  }

  useEffect(() => {
    axios
      .get(`${getBaseURL() + "/empresas"}`)
      .then((response: AxiosResponse<EmpresasResponse[]>) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function formatCNPJ(cnpj: string): string {
    cnpj = cnpj.replace(/\D/g, "");
    cnpj = cnpj.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      "$1.$2.$3/$4-$5"
    );
    return cnpj;
  }

  return (
    <>
      <header className="flex items-center px-6 w-full h-20 bg-gray-100 rounded-[0_0_12px_12px] mb-4 sm:mb-6 xl:mb-8">
        <h1 className="font-[500] text-[1.25rem] sm:text-[1.5rem] lg:text-[1.75rem]">
          Recuperação de crédito
        </h1>
      </header>
      <main className="flex w-full flex-col items-center">
        <h2 className="font-[500] text-[1rem] sm:text-[1.25rem] lg:text-[1.5rem] mb-4 sm:mb-6 xl:mb-8">
          Comece uma recuperação de crédito
        </h2>
        <div className="relative flex w-full max-w-[800px] justify-center mb-4 sm:mb-6 xl:mb-8">
          <FiSearch className="absolute top-[12px] left-[14px] text-gray-400 w-[20px] h-[20px]" />
          <input
            type="text"
            className="w-full rounded-full px-[40px] py-[10px] border border-gray-300 focus:outline-none focus:ring focus:border-blue-300 placeholder-gray-400"
            placeholder="Buscar CNPJ ou nome da empresa"
            onChange={handleSearchInput}
            value={inputValue && inputValue}
          />
          {inputValue.length > 0 && (
            <FiX
              className="absolute top-[12px] right-[14px] text-gray-400 cursor-pointer w-[24px] h-[24px]"
              onClick={() => {
                setInputValue("");
                setSelectedCustomer(null);
                setSearchResults([]);
              }}
            />
          )}
          <div className="absolute top-14 w-full max-h-[400px] overflow-auto bg-white rounded-xl custom-scrollbar z-[1]">
            {searchResults.map((customer: EmpresasResponse) => (
              <div
                key={customer.ID}
                className="p-2 hover:bg-blue-100 cursor-pointer"
                onClick={() => clickedCustomer(customer)}
              >
                <p>
                  {customer.nome_fantasia} - {customer.razao_social}
                </p>
                <p>{customer.CNPJ}</p>
              </div>
            ))}
          </div>
        </div>
        <p
          className="text-blue-800 cursor-pointer font-[500] text-[1rem] lg:text-[1.25rem] mb-4 sm:mb-6 xl:mb-8"
          onClick={() => setShowCustomers(!showCustomers)}
        >
          Ver lista de clientes
        </p>
        <div className="flex w-full justify-center">
          {selectedCustomer ? (
            <div className="flex flex-col items-center bg-blue-50 border border-blue-700 rounded-xl p-4">
              <h2 className="text-[1.25rem] lg:text-[1.5rem] font-[500] text-center">
                {selectedCustomer?.razao_social}
              </h2>
              <p className="text-[1rem] lg:text-[1.25rem] font-[400] mb-[1rem] text-center">
                {selectedCustomer?.nome_fantasia}
              </p>
              <p className="my-1">CNPJ: {formatCNPJ(selectedCustomer?.CNPJ)}</p>
              <p className="my-1 text-center">
                Site: <span className="text-blue-700 font-[500] cursor-pointer">
                  {selectedCustomer?.site}
                </span>
              </p>
              <p className="my-1 text-center">
                Email: <span className="text-blue-700 font-[500] cursor-pointer">
                  {selectedCustomer?.email}
                </span>
              </p>
              <p className="my-1 text-center">
                Telefone: {selectedCustomer?.telefone}
              </p>
              <p className="my-1 text-center">
                Endereço: {selectedCustomer?.endereco} - {selectedCustomer?.bairro} - {selectedCustomer?.cidade} - {selectedCustomer?.estado}
              </p>
            </div>
          ) : (
            <img
              src="assets/images/illustration.png"
              alt="illustração"
              className="h-40 sm:h-60 md:h-40 lg:h-60 opacity-75"
            />
          )}
        </div>
      </main>
      <aside
        className={`fixed top-0 ${
          showCustomers ? "left-[calc(100%-400px)]" : "left-[100%]"
        } duration-200 bg-white text-gray-600 h-full w-[400px] p-4`}
      >
        <header className="flex items-center mb-[40px]">
          <FiX
            className="w-[35px] h-[35px] cursor-pointer mr-[10px]"
            onClick={() => setShowCustomers(false)}
          />
          <h2 className="text-[1.75rem]">Clientes</h2>
        </header>
        <ul className="overflow-auto h-full custom-scrollbar rounded-xl">
          {customers.map((customer: EmpresasResponse) => (
            <li
              key={customer.ID}
              className="py-[24px] px-[10px] hover:bg-blue-100 cursor-pointer"
              onClick={() => {
                setSelectedCustomer(customer);
                setShowCustomers(false);
              }}
            >
              <div className="flex items-center">
                <img
                  src="assets/images/client.jpeg"
                  alt="Imagem do cliente"
                  className="w-[40px] h-[40px] border border-2 mr-[10px]"
                />
                <div className="flex flex-col w-full">
                  <p className="font-[500] text-gray-600">
                    {customer.razao_social}
                  </p>
                  <p className="text-gray-600">{customer.CNPJ}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}
