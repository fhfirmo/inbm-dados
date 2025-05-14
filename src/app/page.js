import Image from "next/image";
import AccessButton from "../components/AccessButton";

export default function Home() {
  return (
    <div className="container">
      <div style={{ backgroundColor: '#00008B', padding: '10px', textAlign: 'center' }}>
        <Image
          src="https://firmoconsultoria.com.br/inbm/Inbm_02_logo.svg"
          alt="Application Logo"
          width={200} 
          height={100} 
 style={{ objectFit: 'contain', width: 'auto' }}
          priority
        />
      </div>

      <main className="main-content">
        <Image
          src="https://firmoconsultoria.com.br/inbm/img/bg-inbm.jpg" 
          alt="Illustrative Image"
          width={500} 
          height={300} 
        />
        <h1 className="title">Simplifique a Gestão dos seus Dados.</h1>
        <p className="subtitle">Cadastro, edição, pesquisa e controle em um só lugar.</p>
        <AccessButton />
      </main>

      <footer className="footer">
          <a
            href="#" 
          >
            Precisa de ajuda?
          </a>
          <span> | </span>
          <a
            href="#" 
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
