import { useState } from "react";
import "./Style.css";
import Input from "../../components/Input/Input";
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import CardStatus from "../../components/CardStatus/CardStatus";
import SecHeader from "../../components/SecHeader/SecHeader";

function SignupScreen() {
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNas] = useState("");
  const [genero, setGenero] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [statusShow, setStatusShow] = useState("");
  const [statusCadastro, setStatusCadastro] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost/CE-Camargo-Esportes/Back-end/post_data.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nome,
            email,
            senha,
            estado,
            cidade,
            genero,
            dataNascimento,
          }),
        }
      );
      setNome("");
      setDataNas("");
      setGenero("");
      setCidade("");
      setEstado("");
      setEmail("");
      setSenha("");
      const data = await response.json();
      console.log("Resposta do servidor:", data);
      if (data.status == "success"){
        console.log("você se cadastrou com sucesso!!!!")
        setStatusShow("")
        setStatusShow("flex")
        setStatusCadastro("sucess")
      } else {
        console.log("tá tudo errado")
        setStatusCadastro("error")
        setStatusShow("")
        setStatusShow("flex")
      }
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
    }
  };

  return (
    <>
    
      <SecHeader />

      
      <CardStatus show={statusShow} status={statusCadastro} />
      <div className="w-screen min-h-screen flex flex-col items-center justify-center mt-4 mb-8">
        <form
          onSubmit={handleSubmit}
          className={` gap-3 h-1/2 flex flex-col items-center  box-form`}
        >
          <h1 className="font-bold text-3xl text-gray-600">
            Crie sua conta Camargo Esporte
          </h1>
          <div className="flex flex-col gap-1 w-[100%]">
            <Input
              label={"Nome"}
              type={"text"}
              id={"nome"}
              placeholder={"Informe o seu nome completo"}
              func={setNome}
              value={nome}
            />
          </div>
          <div className="flex flex-col gap-1 w-[100%]">
            <Input
              label={"Email"}
              type={"email"}
              id={"email"}
              placeholder={"Informe o seu email"}
              func={setEmail}
              value={email}
            />
          </div>
          <div className="flex flex-col gap-1 w-[100%]">
            <Input
              label={"Senha"}
              type={"password"}
              id={"senha"}
              placeholder={"Digite uma senha forte"}
              func={setSenha}
              value={senha}
            />
          </div>

          <div className="flex flex-col gap-1 w-[100%]">
            <label htmlFor="genero" className=" text-gray-600 font-semibold">
              Qual o seu gênero?
            </label>
            <input
              type={"text"}
              id={"genero"}
              placeholder={"Qual o seu gênero?"}
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
              list="generoOpt"
            />
            <datalist id="generoOpt">
              <option value="masculino">Masculino</option>
              <option value="feminino">Feminino</option>
              <option value="outro">Outro</option>
            </datalist>
          </div>

          <div className="flex flex-col gap-1 w-[100%]">
            <Input
              label={"Data de Nascimento"}
              type={"date"}
              id={"data"}
              placeholder={"Informe a data do seu nascimento"}
              func={setDataNas}
              value={dataNascimento}
            />
          </div>
          <div className="flex flex-col gap-1 w-[100%]">
            <Input
              label={"Cidade"}
              type={"text"}
              id={"cidade"}
              placeholder={"Informe qual a sua cidade"}
              func={setCidade}
              value={cidade}
            />
          </div>
          <div className="flex flex-col gap-1 w-[100%]">
            <Input
              label={"Estado"}
              type={"text"}
              id={"estado"}
              placeholder={"Informe qual o seu estado"}
              func={setEstado}
              value={estado}
            />
          </div>
          <button
            type="submit"
            className="bg-[#06aa48] p-1 py-2 w-[100%] rounded-md text-white hover:shadow-xl transition-all hover:brightness-110"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </>
  );
}

export default SignupScreen;
