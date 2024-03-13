import styled from "styled-components";
import reactLogo from "../assets/react.svg";
import viteLogo from "../assets/vite.svg";
import supabaselogo from "../assets/supabaselogo.png";
import googlelogo from "../assets/logogoogle.png";
import { UserAuth } from "../context/AuthContext";

export function Login() {
  const { signInWithGoogle } = UserAuth();

  return (
    <Container>
      <div>
        <img src={viteLogo} className="logo" alt="Vite logo" />

        <img src={reactLogo} className="logo react" alt="React logo" />

        <img src={supabaselogo} className="logo supabase" alt="Vite logo" />
      </div>
      <h1>Vite + React + Supabase</h1>
      <img src={googlelogo} className="logo google" alt="React logo" />
      <div className="card">
        <button onClick={signInWithGoogle}>Iniciar con Google</button>
      </div>
      <p className="read-the-docs">
        Supabase implementa todo el poder de PostgreSQL
      </p>
    </Container>
  );
}

const Container = styled.div``;