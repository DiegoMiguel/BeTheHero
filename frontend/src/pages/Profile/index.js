import React, { useEffect, useState } from 'react';
import {Link, useHistory} from 'react-router-dom';

import './styles.css';
import logoImg from '../../assets/logo.svg';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import api from '../../services/api';

export default function Profile() { 
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    const [incidents, setIncidents] = useState([]);

    const history = useHistory();

    /** Fazer algo indepente da ação do usuário. Neste caso ao carregar a página
     * O useEffect (() => {}, []) recebe dois parametros: uma função e um array de dependências
     * Sempre que um item no array for alterado, a aplicação executará a função.
     * Ex:
     * useEffect ((var) => {recarregaPagina(var)}, [variável])
     *  Neste caso, quando a variável sofrer variação, a função será executada.
     * 
     * Neste momento, não será utilizada nenhuma dependência na lista, desse modo, a função é
     * executada uma vez apenas
     */
    useEffect(() => {
        api.get('incidents', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);

    async function handleDeleteIncident(id){
        try{
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id));
        }catch (err){
            alert('Erro ao deletar caso, tente novamente');
        }
    }

    function handleLogout(){
        localStorage.clear();

        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem vinda, {ongName }</span>
                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="E02041" />
                </button>


            </header>

            <h1>Casos cadastrados</h1>
            
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>  {/*para qualquer iteração no react, é necessário
                                            utilisar o atributo key para facilitar a manipulação (edição, deleção)
                                            posterior da inferface*/}
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR',
                            { style: 'currency', currency:'BRL' }).format(incident.value)}</p>
{/*Intl: objeto responsável por formatação de vários tipos
    currency: informa que a formatação é do tipo moeda*/}
    
                        <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
                            <FiTrash2 size={20} color="#a8a8b3"/>
                            {/**É necessária a utilização da função lambda
                             * Sem ela, o onclick iria executar a função handleDeleteIncident e receberia o retorno da execução
                             * todos os dados iriam ser apagados
                            */}
                        </button>
                    </li> 
                ))}               
            </ul>
        </div>
    );
}