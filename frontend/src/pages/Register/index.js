import React, { useState } from 'react';
import api from '../../services/api';

import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';


import './styles.css';
import LogoImg from '../../assets/logo.svg';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory(); /*utilizado para encaminhar fluxo após uma ação
                                    quando não se tem a possibilidade de usar o "Link"*/

    async function handleRegister(e){
        e.preventDefault(); // Evita os eventos padrões da página. Após o encaminhamento, a página não é mais atualizada.

        const data = {name, email, whatsapp, city, uf}
        
        try{
            const response = await api.post('ongs', data);

            alert(`Seu ID de acesso: ${response.data.id}`);

            history.push('/');
        }
        catch (err){
            alert ('Erro no cadastro, tente novamente!')
        }
    };                      

    return (
    <div className="register-container">
        <div className="content">
            <section>
                <img src={LogoImg} alt="Be The Hero"/>

                <h1>Cadastro</h1>
                <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrar os casos da sua ONH</p>

                <Link className="back-link" to="/"><FiArrowLeft size={16} color="#E02041" /> Não tenho cadastro</Link>
            </section>
            <form onSubmit={handleRegister}>
                <input placeholder="Nome da ONG"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <input type="email" placeholder="E-mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input placeholder="Whatsapp"
                    value={whatsapp}
                    onChange={e => setWhatsapp(e.target.value)}
                />

                <div className="input-group">
                    <input type="text" placeholder="Cidade"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                    />
                    <input type="text" placeholder="UF" style={{width:80}}
                        value={uf}
                        onChange={e => setUf(e.target.value)}
                    />
                </div>
                <button className="button" type="submit">Cadastrar</button>
            </form>
        </div>
    </div>
    ); /**Style: é possível passar um objeto css com todas as propriedades editáveis */
}