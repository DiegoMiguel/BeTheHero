import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident';


export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>    
                <Route path="/" exact component={Logon} />
                <Route path="/register" component={Register} />
                <Route path="/profile" component={Profile} />
                <Route path="/incidents/new" component={NewIncident} />
            </Switch>
        </BrowserRouter>
    )/*SWITCH - garante que apenas uma rota seja executada por momento.
    * Por padrão, verifica a rota que inicia com os caracteres específicos no path.
    Sem o 'exact' todas as rotas chamadas iriam executar o Logon
    */
}