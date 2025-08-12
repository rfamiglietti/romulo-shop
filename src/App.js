import React, { useState, useEffect } from 'react';
import HeroSection from './components/HeroSection';
import LoginModal from './components/LoginModal';
import ProductList from './components/ProductList';
import CarrinhoModal from './components/CarrinhoModal';
import { supabase } from './supabaseClient';

function App() {
  const [mostrarModalLogin, setMostrarModalLogin] = useState(false);
  const [mostrarCarrinho, setMostrarCarrinho] = useState(false);
  const [carrinho, setCarrinho] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [usuario, setUsuario] = useState(null);

  // Observar autenticação
  useEffect(() => {
    const session = supabase.auth.getSession().then(({ data }) => {
      setUsuario(data?.session?.user ?? null);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUsuario(session?.user ?? null);
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  // Buscar produtos do banco
  useEffect(() => {
    async function fetchProdutos() {
      const { data, error } = await supabase.from('produtos').select('*');
      if (!error) setProdutos(data);
    }
    fetchProdutos();
  }, []);

  // Buscar carrinho do usuário logado
  useEffect(() => {
    async function fetchCarrinho() {
      if (usuario) {
        const { data, error } = await supabase
          .from('carrinhos')
          .select('itens')
          .eq('user_id', usuario.id)
          .single();
        if (data && data.itens) setCarrinho(data.itens);
        else setCarrinho([]);
      } else {
        setCarrinho([]);
      }
    }
    fetchCarrinho();
  }, [usuario]);

  // Salvar carrinho no banco
  async function salvarCarrinho(novoCarrinho) {
    if (!usuario) return;
    await supabase
      .from('carrinhos')
      .upsert({ user_id: usuario.id, itens: novoCarrinho }, { onConflict: ['user_id'] });
  }

  const abrirModalLogin = () => setMostrarModalLogin(true);
  const fecharModalLogin = () => setMostrarModalLogin(false);
  const abrirCarrinho = () => setMostrarCarrinho(true);
  const fecharCarrinho = () => setMostrarCarrinho(false);

  const adicionarAoCarrinho = (produto) => {
    const novoCarrinho = [...carrinho, produto];
    setCarrinho(novoCarrinho);
    salvarCarrinho(novoCarrinho);
  };

  const removerItemDoCarrinho = (index) => {
    const novoCarrinho = [...carrinho];
    novoCarrinho.splice(index, 1);
    setCarrinho(novoCarrinho);
    salvarCarrinho(novoCarrinho);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUsuario(null);
    setCarrinho([]);
  };

  return (
    <div>
      <header style={{ padding: "20px", textAlign: "right", backgroundColor: "#fff", borderBottom: "1px solid #eee" }}>
        {usuario ? (
          <>
            <span style={{ marginRight: 16 }}>Olá, {usuario.email}</span>
            <button onClick={handleLogout} style={{ marginRight: 16 }}>Logout</button>
          </>
        ) : (
          <button onClick={abrirModalLogin} style={{ marginRight: 16 }}>Login</button>
        )}
        <button onClick={abrirCarrinho} style={{background: 'none', border: '1px solid #ccc', padding: '8px 16px', borderRadius: '5px', cursor: 'pointer'}}>
          Ver Carrinho ({carrinho.length})
        </button>
      </header>

      <HeroSection />
      <ProductList produtos={produtos} onAdicionarAoCarrinho={adicionarAoCarrinho} />

      {mostrarModalLogin && <LoginModal onClose={fecharModalLogin} />}
      
      {mostrarCarrinho && (
        <CarrinhoModal
          carrinho={carrinho}
          onFechar={fecharCarrinho}
          onRemoverItem={removerItemDoCarrinho}
        />
      )}
    </div>
  );
}

export default App;