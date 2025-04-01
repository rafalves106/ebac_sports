import { useDispatch, useSelector } from 'react-redux'
import { Produto as ProdutoType } from '../App'
import Produto from '../components/Produto'
import { useGetProdutosQuery } from '../services/api'
import { RootReducer } from '../store'
import { favoritar } from '../store/reducers/favorito'

import * as S from './styles'

const ProdutosComponent = () => {
  const dispatch = useDispatch()
  const favoritos = useSelector((state: RootReducer) => state.favorito.itens)

  const { data: produtos, isLoading } = useGetProdutosQuery()

  if (isLoading) return <h2>Carregando...</h2>

  const produtoEstaNosFavoritos = (produto: ProdutoType) => {
    return favoritos.some((f) => f.id === produto.id)
  }

  return (
    <>
      <S.Produtos>
        {produtos?.map((produto) => (
          <Produto
            key={produto.id}
            produto={produto}
            estaNosFavoritos={produtoEstaNosFavoritos(produto)}
            favoritar={() => dispatch(favoritar(produto))}
          />
        ))}
      </S.Produtos>
    </>
  )
}

export default ProdutosComponent
