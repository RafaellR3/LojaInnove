import React from 'react';
import Categorias from '../components/Categorias';
import MaisVendidos from '../components/MaisVendidos';
import Promocoes from '../components/Promocoes';

export default function Home() {
  return (
    <div>
      <Categorias />
      <MaisVendidos />
      <Promocoes />
    </div>
  );
}
