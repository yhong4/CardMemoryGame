import * as React from "react";
import Memorai from '../pages/Memorai';
import { Switch, Route } from 'react-router-dom';

interface IRouter {
    path: string;
    page: any;
}

const routers:IRouter[] = [
    {
        path:'/',
        page: Memorai
    }
]

export const AppRouter: React.FC = () => {
    return (
        <Switch>
            { routers.map((router:IRouter, index: number) => {
                return <Route key={`router-${index}`} path={router.path} component={router.page} />
            })
            }
        </Switch>
    )
}
         

