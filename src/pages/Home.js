import Categorias from '../components/Categorias';
import MaisVendidos from '../components/MaisVendidos';
import Promocoes from '../components/Promocoes';
import '../styles/Home.css';

export default function Home() {
  return (
    <div className='home'>
      <Categorias />
      <Promocoes />
      <MaisVendidos />
    </div>
  );
}
