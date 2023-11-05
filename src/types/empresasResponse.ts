type Socio = {
    nome: string;
    CPF: string | number;
    participacao: string;
  };
  
  export type EmpresasResponse = {
    razao_social: string;
    nome_fantasia: string;
    CNPJ: string;
    IE: string;
    data_de_abertura: string;
    numero_de_funcionarios: number;
    telefone: string;
    celular: string;
    site: string;
    email: string;
    socios: Socio[];
    CEP: string;
    endereco: string;
    bairro: string;
    cidade: string;
    estado: string;
    ID: number;
  };