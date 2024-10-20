import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

function App() {
  const { register, handleSubmit, reset, setFocus } = useForm()
  const [compras, setCompras] = useState([])
  const [total, setTotal] = useState(0)

  function adicionaProduto(data) {
    const compras2 = [...compras]
    compras2.push({ produto: data.produto, preco: Number(data.preco) })
    setCompras(compras2)
    setFocus("produto")
    reset({ produto: "", preco: "" })
    const total2 = total + Number(data.preco)
    setTotal(total2)

     
    localStorage.setItem("compras", JSON.stringify(compras2))
    localStorage.setItem("total", total2)
  }

  const listaCompras = compras.map(compra => (
    <h4 className="d-flex justify-content-between">
      <span>{compra.produto}</span>
      <span>R$: {compra.preco.toLocaleString("pt-br", { minimumFractionDigits: 2 })}</span>
    </h4>
  ))

  
  useEffect(() => {
    setFocus("produto")

    if (localStorage.getItem("compras")) {
      const total2 = Number(localStorage.getItem("total"))
      const compras2 = JSON.parse(localStorage.getItem("compras"))
      setTotal(total2)
      setCompras(compras2)
    }
  }, [])

  return (
    <div className="">
      <nav class="navbar bg-info">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            <img src="./logo.png" alt="Logo"
              width="50" height="40" class="d-inline-block me-3" />
            App Controle de Compras
          </a>
        </div>
      </nav>
      <div className="container">
        <div className="row">
          <div className="col-sm-4">
            <img src="./super.jpg" alt="Super" className="img-fluid mt-3" />
          </div>
          <div className="col-sm-8">
            <form className="row mt-3"
              onSubmit={handleSubmit(adicionaProduto)}>
              <div className="col-md-6">
                <input type="text" placeholder="Produto"
                  className="form-control form-control-lg"
                  {...register("produto")}
                  required />
              </div>
              <div className="col-md-3">
                <input type="number" placeholder="Preço R$"
                  step="0.01" min="0.0"
                  className="form-control form-control-lg"
                  {...register("preco")}
                  required />
              </div>
              <div className="col-md-3 d-grid">
                <input type="submit" value="Adicionar" className="btn btn-primary btn-lg" />
              </div>
            </form>
            <div class="card text-center mt-3 w-100 mx-auto">
              <div class="card-header">
                <h3 className="text-start">Lista dos Produtos Adicionados</h3>
              </div>
              <div class="card-body text-primary">
                {listaCompras}
              </div>
              <div class="card-footer">
                <h4 className="d-flex justify-content-between">
                  <span>Total Previsto</span>
                  <span>R$: {total.toLocaleString("pt-br", { minimumFractionDigits: 2 })}</span>
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
