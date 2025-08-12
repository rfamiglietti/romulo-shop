import React from "react";
import "./CarrinhoModal.css";

function CarrinhoModal({ carrinho, onFechar, onRemoverItem }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Carrinho de Compras</h2>
        {carrinho.length === 0 ? (
          <p>Seu carrinho está vazio.</p>
        ) : (
          <ul>
            {carrinho.map((item, idx) => (
              <li key={idx}>
                {item.nome} - R$ {item.preco.toFixed(2)}
                <button onClick={() => onRemoverItem(idx)}>Remover</button>
              </li>
            ))}
          </ul>
        )}
        <button onClick={onFechar}>Fechar</button>
      </div>
    </div>
  );
}

export default CarrinhoModal;